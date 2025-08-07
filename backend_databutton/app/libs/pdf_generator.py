# pdf_generator.py
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image
from reportlab.graphics.barcode import qr
from reportlab.graphics.shapes import Drawing
from datetime import datetime
import databutton as db
from typing import Dict, List
import os

class PDFGenerator:
    def __init__(self):
        # The logo path can be a default one, or configured via secrets.
        # For this to work, you must upload 'logo.png' to the project's static assets.
        self.logo_path = db.secrets.get("COMPANY_LOGO_PATH", "assets/logo.png")
        self.company_info = {
            "name": db.secrets.get("COMPANY_NAME", "RentaBox Pro S.A. de C.V."),
            "rfc": db.secrets.get("RFC_EMISOR", "ABC123456789"),
            "address": db.secrets.get("COMPANY_ADDRESS", "Av. de los Insurgentes Sur 1, CDMX"),
            "phone": db.secrets.get("COMPANY_PHONE", "+52 55 0000 0000"),
            "email": db.secrets.get("COMPANY_EMAIL", "contacto@rentabox.pro"),
        }

    def generate_invoice_pdf(self, invoice: Dict, customer: Dict, order: Dict) -> str:
        """Generate a PDF for a given invoice dictionary."""
        # Note: In a real app, save to a persistent cloud storage (e.g., db.storage)
        # For now, we'll simulate the path.
        if not os.path.exists('invoices'):
            os.makedirs('invoices')
        filepath = f"invoices/invoice_{invoice['uuid']}.pdf"

        doc = SimpleDocTemplate(filepath, pagesize=letter, topMargin=inch, bottomMargin=inch)
        story = []
        styles = getSampleStyleSheet()

        story.append(self._create_header())
        story.append(Spacer(1, 0.25 * inch))

        story.append(Paragraph("FACTURA CFDI 4.0", styles['h1']))
        story.append(Spacer(1, 0.25 * inch))

        # Invoice Metadata Table
        invoice_details = [
            ['Folio Fiscal (UUID):', invoice['uuid']],
            ['Folio:', invoice.get('folio', 'N/A')],
            ['Fecha de Timbrado:', invoice.get('fecha_timbrado', 'N/A')],
            ['Sello SAT:', Paragraph(invoice.get('sello_sat', 'N/A'), styles['small'])],
        ]
        story.append(Table(invoice_details, colWidths=[2 * inch, 4.5 * inch], style=TableStyle([
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ])))
        story.append(Spacer(1, 0.25 * inch))

        # Items Table
        items_header = ['Clave', 'Descripción', 'Cant.', 'P. Unitario', 'Importe']
        items_data = [items_header] + [
            [
                item.get('sat_code', '01010101'),
                Paragraph(item['description'], styles['Normal']),
                item['quantity'],
                f"${item['price']:,.2f}",
                f"${item['quantity'] * item['price']:,.2f}"
            ]
            for item in order['items']
        ]
        items_table = Table(items_data, colWidths=[1*inch, 3*inch, 0.5*inch, 1*inch, 1*inch])
        items_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.lightgrey),
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
            ('ALIGN', (2, 1), (-1, -1), 'RIGHT'),
        ]))
        story.append(items_table)
        story.append(Spacer(1, 0.1 * inch))

        # Totals
        subtotal = order['total_amount'] / 1.16
        tax = order['total_amount'] - subtotal
        totals_data = [
            ['Subtotal:', f"${subtotal:,.2f}"],
            ['IVA (16%):', f"${tax:,.2f}"],
            ['TOTAL:', f"${order['total_amount']:,.2f}"],
        ]
        totals_table = Table(totals_data, colWidths=[1*inch, 1*inch])
        totals_table.setStyle(TableStyle([
            ('ALIGN', (0, 0), (-1, -1), 'RIGHT'),
            ('FONTNAME', (0, 2), (1, 2), 'Helvetica-Bold'),
        ]))
        story.append(totals_table)

        doc.build(story)
        return filepath

    def _create_header(self) -> Table:
        """Creates the PDF header with logo and company info."""
        # A placeholder for the logo if not found
        try:
            logo = Image(self.logo_path, width=1.5*inch, height=0.5*inch)
        except Exception:
            logo = Paragraph("Logo", getSampleStyleSheet()['h3'])
            
        info_style = ParagraphStyle(name='Info', fontSize=9, alignment=2) # Right aligned
        company_info_p = Paragraph(
            f"<b>{self.company_info['name']}</b><br/>"
            f"{self.company_info['address']}<br/>"
            f"RFC: {self.company_info['rfc']}",
            info_style
        )
        
        header_table = Table([[logo, company_info_p]], colWidths=[2 * inch, 4.5 * inch])
        header_table.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP')]))
        return header_table

    def _get_payment_method_desc(self, code: str) -> str:
        """Converts a payment method code to its description."""
        methods = {
            '01': 'Efectivo',
            '03': 'Transferencia electrónica',
            '04': 'Tarjeta de crédito',
            '28': 'Tarjeta de débito',
            '99': 'Por definir'
        }
        return methods.get(code, 'Otro')
