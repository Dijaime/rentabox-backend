# sat_invoice.py
import xml.etree.ElementTree as ET
from datetime import datetime
import requests
import databutton as db
from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.primitives.asymmetric import padding as rsa_padding
from cryptography.hazmat.backends import default_backend
import base64
import uuid as uuid_lib
import re
from typing import Dict, List

class SATInvoiceService:
    def __init__(self):
        # Configuration from Databutton Secrets
        self.pac_url = db.secrets.get("PAC_URL")
        self.pac_user = db.secrets.get("PAC_USER")
        self.pac_password = db.secrets.get("PAC_PASSWORD")
        self.cer_path = db.secrets.get("SAT_CER_PATH")
        self.key_path = db.secrets.get("SAT_KEY_PATH")
        self.key_password = db.secrets.get("SAT_KEY_PASSWORD")
        self.rfc_emisor = db.secrets.get("RFC_EMISOR")
        self.nombre_emisor = db.secrets.get("NOMBRE_EMISOR")
        self.regimen_fiscal = db.secrets.get("REGIMEN_FISCAL", "612")
        self.lugar_expedicion = db.secrets.get("LUGAR_EXPEDICION_CP")

    def generate_cfdi(self, customer: Dict, order: Dict) -> Dict:
        """Generates a CFDI 4.0 XML, signs it, and sends it for stamping."""
        if not all([self.pac_url, self.cer_path, self.key_path, self.rfc_emisor]):
            raise ValueError("SAT configuration secrets are missing.")

        root = self._create_cfdi_root(order)
        self._add_emisor(root)
        self._add_receptor(root, customer)
        self._add_conceptos(root, order['items'])
        self._add_impuestos_summary(root, order['total_amount'])
        
        xml_string_unsigned = ET.tostring(root, encoding='unicode')
        
        # The signing process will add the final attributes to the root
        signed_xml_string = self._sign_xml(root)

        # Timbrado (stamping) with PAC
        # timbrado_response = self._timbrar_cfdi(signed_xml_string)
        # For development, we can simulate this
        timbrado_response = self._simulate_timbrado(root)
        
        # Save and return
        self._save_xml_to_storage(ET.tostring(root, encoding='unicode'), timbrado_response['uuid'])

        return timbrado_response

    def _create_cfdi_root(self, order: Dict) -> ET.Element:
        ns = {
            'cfdi': 'http://www.sat.gob.mx/cfd/4',
            'xsi': 'http://www.w3.org/2001/XMLSchema-instance'
        }
        ET.register_namespace('cfdi', ns['cfdi'])
        ET.register_namespace('xsi', ns['xsi'])
        
        total = order['total_amount']
        subtotal = total / 1.16

        root = ET.Element(f"{{{ns['cfdi']}}}Comprobante", {
            f"{{{ns['xsi']}}}schemaLocation": "http://www.sat.gob.mx/cfd/4 http://www.sat.gob.mx/sitio_internet/cfd/4/cfdv40.xsd",
            'Version': '4.0', 'Serie': 'A', 'Folio': self._generate_folio(),
            'Fecha': datetime.now().strftime('%Y-%m-%dT%H:%M:%S'),
            'FormaPago': order.get('forma_pago', '03'), # 03: Transferencia
            'MetodoPago': order.get('metodo_pago', 'PUE'), # PUE: Pago en una sola exhibición
            'TipoDeComprobante': 'I', 'LugarExpedicion': self.lugar_expedicion,
            'Moneda': 'MXN', 'SubTotal': f"{subtotal:.2f}", 'Total': f"{total:.2f}",
            'Exportacion': '01' # No aplica
        })
        return root

    def _add_emisor(self, root: ET.Element):
        emisor = ET.SubElement(root, '{http://www.sat.gob.mx/cfd/4}Emisor', {
            'Rfc': self.rfc_emisor,
            'Nombre': self.nombre_emisor,
            'RegimenFiscal': self.regimen_fiscal
        })

    def _add_receptor(self, root: ET.Element, customer: Dict):
        receptor = ET.SubElement(root, '{http://www.sat.gob.mx/cfd/4}Receptor', {
            'Rfc': customer['rfc'],
            'Nombre': customer['name'],
            'UsoCFDI': customer.get('uso_cfdi', 'G03'),
            'DomicilioFiscalReceptor': customer['zip_code'],
            'RegimenFiscalReceptor': customer.get('regimen_fiscal_receptor', '616')
        })

    def _add_conceptos(self, root: ET.Element, items: List[Dict]):
        conceptos_node = ET.SubElement(root, '{http://www.sat.gob.mx/cfd/4}Conceptos')
        for item in items:
            importe = item['quantity'] * item['price']
            tax = importe * 0.16
            concepto = ET.SubElement(conceptos_node, '{http://www.sat.gob.mx/cfd/4}Concepto', {
                'ClaveProdServ': item.get('sat_code', '80131500'),
                'NoIdentificacion': item['sku'],
                'Cantidad': str(item['quantity']),
                'ClaveUnidad': 'E48', 'Unidad': 'Servicio',
                'Descripcion': item['description'],
                'ValorUnitario': f"{item['price']:.2f}",
                'Importe': f"{importe:.2f}",
                'ObjetoImp': '02'
            })
            impuestos = ET.SubElement(concepto, '{http://www.sat.gob.mx/cfd/4}Impuestos')
            traslados = ET.SubElement(impuestos, '{http://www.sat.gob.mx/cfd/4}Traslados')
            ET.SubElement(traslados, '{http://www.sat.gob.mx/cfd/4}Traslado', {
                'Base': f"{importe:.2f}", 'Impuesto': '002', 'TipoFactor': 'Tasa',
                'TasaOCuota': '0.160000', 'Importe': f"{tax:.2f}"
            })

    def _add_impuestos_summary(self, root: ET.Element, total_amount: float):
        subtotal = total_amount / 1.16
        tax = total_amount - subtotal
        impuestos = ET.SubElement(root, '{http://www.sat.gob.mx/cfd/4}Impuestos', {
            'TotalImpuestosTrasladados': f"{tax:.2f}"
        })
        traslados = ET.SubElement(impuestos, '{http://www.sat.gob.mx/cfd/4}Traslados')
        ET.SubElement(traslados, '{http://www.sat.gob.mx/cfd/4}Traslado', {
            'Base': f"{subtotal:.2f}", 'Impuesto': '002', 'TipoFactor': 'Tasa',
            'TasaOCuota': '0.160000', 'Importe': f"{tax:.2f}"
        })

    def _sign_xml(self, root: ET.Element) -> str:
        # Cadena Original generation would be complex, skipping for dev
        # This part requires a specific XSLT transformation from SAT
        cadena_original = "||...cadena original simulada...||"
        
        # Simulate signing
        sello = base64.b64encode(b"dummy_signature_for_development").decode('utf-8')
        
        root.set('Sello', sello)
        # In a real scenario, the certificate and number would be from the .cer file
        root.set('Certificado', base64.b64encode(b"dummy_certificate_data").decode('utf-8'))
        root.set('NoCertificado', "30001000000400002495") # Placeholder
        
        return ET.tostring(root, encoding='unicode')
        
    def _simulate_timbrado(self, root: ET.Element) -> Dict:
        """Simulates a successful response from a PAC."""
        uuid = str(uuid_lib.uuid4())
        fecha_timbrado = datetime.now().strftime('%Y-%m-%dT%H:%M:%S')
        sello_sat = "selloSATDummy==" + base64.b64encode(uuid.encode()).decode()

        tfd_ns = "http://www.sat.gob.mx/TimbreFiscalDigital"
        ET.register_namespace('tfd', tfd_ns)
        
        complemento = ET.SubElement(root, '{http://www.sat.gob.mx/cfd/4}Complemento')
        timbre = ET.SubElement(complemento, f"{{{tfd_ns}}}TimbreFiscalDigital", {
            'Version': '1.1', 'UUID': uuid, 'FechaTimbrado': fecha_timbrado,
            'SelloCFD': root.get('Sello')[:100], # Truncated for example
            'NoCertificadoSAT': '30001000000500001385', # PAC's certificate
            'SelloSAT': sello_sat,
            'RfcProvCertif': 'PAC010101000'
        })
        
        return {
            'uuid': uuid,
            'folio': root.get('Folio'),
            'sello_sat': sello_sat,
            'fecha_timbrado': fecha_timbrado,
        }

    def _save_xml_to_storage(self, xml_content: str, uuid: str):
        # In a real scenario, this would save to a persistent storage like S3 or db.storage
        print(f"--- XML for UUID: {uuid} ---")
        print(xml_content)
        print(f"--- End XML ---")
        
    def _generate_folio(self) -> str:
        """Generates a sequential folio number (dev version)."""
        return datetime.now().strftime('%Y%m%d-%H%M%S')

    def validate_rfc(self, rfc: str) -> bool:
        """Validates a Mexican RFC format."""
        pattern = r'^[A-ZÑ&]{3,4}\d{6}([A-Z0-9]{3})?$'
        return bool(re.match(pattern, rfc.upper()))
