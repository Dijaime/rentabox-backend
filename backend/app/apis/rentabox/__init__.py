
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.libs.database import get_db  # Corrected import path
from typing import List, Optional, Dict
from pydantic import BaseModel, EmailStr
from datetime import datetime, timedelta
import secrets
import re

router = APIRouter(prefix="/api/rentabox", tags=["RentaBox"])

# --- Models reflecting the real business ---
class Direccion(BaseModel):
    calle: str
    interior: Optional[str] = ""
    colonia: str
    alcaldia: str
    estado: str = "CDMX"
    cp: str

class NuevaRentaRequest(BaseModel):
    # Customer data
    nombre: str
    apellidos: str
    email: EmailStr
    telefono: str
    
    # Addresses
    direccion_entrega: Direccion
    direccion_recoleccion: Direccion
    
    # Service details
    tipo_servicio: str  # "hogar", "oficina"
    paquete: str  # "estudio", "1_recamara", etc.
    semanas: int
    
    # Additional products
    cajas_xl: int = 0
    carritos: int = 0
    film: int = 0
    esquineros: int = 0
    papel_kraft: int = 0

class NuevaRentaResponse(BaseModel):
    success: bool
    renta_id: int
    token_seguridad: str
    precio_total: float
    mensaje: str
    fecha_entrega_estimada: str
    fecha_recoleccion_estimada: str

# --- Pricing and Package Configuration (Business Logic) ---
PAQUETES_CONFIG = {
    "estudio": {"nombre": "Estudio", "cajas_incluidas": 10, "precio_base": 990, "precio_semanal": 250},
    "1_recamara": {"nombre": "1 Recámara", "cajas_incluidas": 20, "precio_base": 1490, "precio_semanal": 350},
    "2_recamaras": {"nombre": "2 Recámaras", "cajas_incluidas": 30, "precio_base": 1990, "precio_semanal": 450},
    "3_recamaras": {"nombre": "3 Recámaras", "cajas_incluidas": 40, "precio_base": 2490, "precio_semanal": 550}
}

PRODUCTOS_ADICIONALES = {
    "cajas_xl": {"nombre": "Caja XL", "precio": 45},
    "carritos": {"nombre": "Carrito", "precio": 150},
    "film": {"nombre": "Film Plástico", "precio": 89},
    "esquineros": {"nombre": "Esquineros", "precio": 25},
    "papel_kraft": {"nombre": "Papel Kraft", "precio": 35}
}

def generar_token_seguridad():
    """Generates a secure, human-readable token."""
    return f"RB2024-{secrets.token_hex(3).upper()}"

# --- API Endpoints ---

@router.post("/crear-renta", response_model=NuevaRentaResponse)
async def crear_renta(
    renta: NuevaRentaRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """
    Creates a new box rental for RentaBox.
    """
    if not re.match(r"^\d{10}$", renta.telefono):
        raise HTTPException(status_code=400, detail="El formato del teléfono debe ser de 10 dígitos.")
    if not re.match(r"^\d{5}$", renta.direccion_entrega.cp):
        raise HTTPException(status_code=400, detail="El código postal de entrega debe tener 5 dígitos.")

    try:
        token_seguridad = generar_token_seguridad()
        
        paquete_info = PAQUETES_CONFIG.get(renta.paquete)
        if not paquete_info:
            raise HTTPException(status_code=400, detail="Paquete no válido")
        
        precio_total = paquete_info["precio_base"]
        if renta.semanas > 1:
            precio_total += (renta.semanas - 1) * paquete_info["precio_semanal"]
        
        precio_total += renta.cajas_xl * PRODUCTOS_ADICIONALES["cajas_xl"]["precio"]
        precio_total += renta.carritos * PRODUCTOS_ADICIONALES["carritos"]["precio"]
        precio_total += renta.film * PRODUCTOS_ADICIONALES["film"]["precio"]
        precio_total += renta.esquineros * PRODUCTOS_ADICIONALES["esquineros"]["precio"]
        precio_total += renta.papel_kraft * PRODUCTOS_ADICIONALES["papel_kraft"]["precio"]

        # Date calculations
        hoy = datetime.now()
        fecha_entrega = hoy + timedelta(days=2) # 2 business days
        fecha_recoleccion = fecha_entrega + timedelta(weeks=renta.semanas)

        query = """
            INSERT INTO public.mudanzas (
                fecha, nombre, apellidos, email, telefono,
                calle_entrega, interior_entrega, colonia_entrega, alcaldia_entrega, estado_entrega, cp_entrega,
                calle_recoleccion, interior_recoleccion, colonia_recoleccion, alcaldia_recoleccion, estado_recoleccion, cp_recoleccion,
                tipo_servicio, paquete, semanas, precio_total,
                cajas_xl, carritos, film, esquineros, papel_kraft,
                token_seguridad, status
            ) VALUES (
                :fecha, :nombre, :apellidos, :email, :telefono,
                :calle_entrega, :interior_entrega, :colonia_entrega, :alcaldia_entrega, :estado_entrega, :cp_entrega,
                :calle_recoleccion, :interior_recoleccion, :colonia_recoleccion, :alcaldia_recoleccion, :estado_recoleccion, :cp_recoleccion,
                :tipo_servicio, :paquete, :semanas, :precio_total,
                :cajas_xl, :carritos, :film, :esquineros, :papel_kraft,
                :token_seguridad, :status
            ) RETURNING id
        """
        
        result = db.execute(text(query), {
            'fecha': datetime.now(), 'nombre': renta.nombre, 'apellidos': renta.apellidos, 'email': renta.email, 'telefono': renta.telefono,
            'calle_entrega': renta.direccion_entrega.calle, 'interior_entrega': renta.direccion_entrega.interior, 'colonia_entrega': renta.direccion_entrega.colonia,
            'alcaldia_entrega': renta.direccion_entrega.alcaldia, 'estado_entrega': renta.direccion_entrega.estado, 'cp_entrega': renta.direccion_entrega.cp,
            'calle_recoleccion': renta.direccion_recoleccion.calle, 'interior_recoleccion': renta.direccion_recoleccion.interior, 'colonia_recoleccion': renta.direccion_recoleccion.colonia,
            'alcaldia_recoleccion': renta.direccion_recoleccion.alcaldia, 'estado_recoleccion': renta.direccion_recoleccion.estado, 'cp_recoleccion': renta.direccion_recoleccion.cp,
            'tipo_servicio': renta.tipo_servicio, 'paquete': paquete_info["nombre"], 'semanas': renta.semanas, 'precio_total': precio_total,
            'cajas_xl': renta.cajas_xl, 'carritos': renta.carritos, 'film': renta.film, 'esquineros': renta.esquineros, 'papel_kraft': renta.papel_kraft,
            'token_seguridad': token_seguridad, 'status': 'pendiente'
        })
        
        renta_id = result.fetchone()[0]
        db.commit()
        
        return NuevaRentaResponse(
            success=True,
            renta_id=renta_id,
            token_seguridad=token_seguridad,
            precio_total=precio_total,
            mensaje="Renta creada exitosamente",
            fecha_entrega_estimada=fecha_entrega.strftime('%Y-%m-%d'),
            fecha_recoleccion_estimada=fecha_recoleccion.strftime('%Y-%m-%d')
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

@router.get("/rentas")
async def listar_rentas(status: Optional[str] = None, limit: int = 50, db: Session = Depends(get_db)):
    """Lists all box rentals."""
    try:
        query = "SELECT * FROM public.mudanzas WHERE 1=1"
        params = {}
        if status:
            query += " AND status = :status"
            params['status'] = status
        query += " ORDER BY fecha DESC LIMIT :limit"
        params['limit'] = limit
        
        result = db.execute(text(query), params)
        rentas = result.fetchall()
        
        rentas_list = [
            {
                'id': r.id, 'fecha': r.fecha.strftime('%d/%m/%Y %H:%M'), 'cliente': f"{r.nombre} {r.apellidos}",
                'email': r.email, 'telefono': r.telefono, 'paquete': r.paquete, 'semanas': r.semanas,
                'precio_total': f"${r.precio_total:,.2f}", 'status': r.status, 'token': r.token_seguridad,
                'direccion_entrega': f"{r.calle_entrega}, {r.colonia_entrega}",
                'direccion_recoleccion': f"{r.calle_recoleccion}, {r.colonia_recoleccion}"
            } for r in rentas
        ]
        return {"rentas": rentas_list, "total": len(rentas_list)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

@router.get("/rentas/{renta_id}")
async def obtener_renta(renta_id: int, db: Session = Depends(get_db)):
    """Gets details for a specific box rental."""
    try:
        query = "SELECT * FROM public.mudanzas WHERE id = :id"
        result = db.execute(text(query), {'id': renta_id})
        r = result.fetchone()
        
        if not r:
            raise HTTPException(status_code=404, detail="Renta no encontrada")
        
        return {
            'id': r.id, 'fecha': r.fecha.strftime('%d/%m/%Y %H:%M'),
            'cliente': {'nombre': r.nombre, 'apellidos': r.apellidos, 'email': r.email, 'telefono': r.telefono},
            'direccion_entrega': {'calle': r.calle_entrega, 'interior': r.interior_entrega, 'colonia': r.colonia_entrega, 'alcaldia': r.alcaldia_entrega, 'estado': r.estado_entrega, 'cp': r.cp_entrega},
            'direccion_recoleccion': {'calle': r.calle_recoleccion, 'interior': r.interior_recoleccion, 'colonia': r.colonia_recoleccion, 'alcaldia': r.alcaldia_recoleccion, 'estado': r.estado_recoleccion, 'cp': r.cp_recoleccion},
            'servicio': {'tipo': r.tipo_servicio, 'paquete': r.paquete, 'semanas': r.semanas, 'precio_total': f"${r.precio_total:,.2f}"},
            'productos_adicionales': {'cajas_xl': r.cajas_xl, 'carritos': r.carritos, 'film': r.film, 'esquineros': r.esquineros, 'papel_kraft': r.papel_kraft},
            'token_seguridad': r.token_seguridad, 'status': r.status
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

@router.put("/rentas/{renta_id}/status")
async def actualizar_status_renta(renta_id: int, nuevo_status: str, db: Session = Depends(get_db)):
    """Updates the status of a box rental."""
    try:
        status_validos = ['pendiente', 'confirmada', 'entregada', 'en_uso', 'recolectada', 'completada', 'cancelada']
        if nuevo_status not in status_validos:
            raise HTTPException(status_code=400, detail=f"Status inválido. Debe ser uno de: {status_validos}")
        
        query = "UPDATE public.mudanzas SET status = :status WHERE id = :id"
        db.execute(text(query), {'status': nuevo_status, 'id': renta_id})
        db.commit()
        
        return {"success": True, "renta_id": renta_id, "nuevo_status": nuevo_status}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

@router.get("/calculadora-precio")
async def calcular_precio(paquete: str, semanas: int = 1, cajas_xl: int = 0, carritos: int = 0, film: int = 0, esquineros: int = 0, papel_kraft: int = 0):
    """Price calculator for RentaBox."""
    try:
        paquete_info = PAQUETES_CONFIG.get(paquete)
        if not paquete_info:
            raise HTTPException(status_code=400, detail="Paquete no válido")
            
        precio_base = paquete_info["precio_base"]
        precio_semanas = (semanas - 1) * paquete_info["precio_semanal"] if semanas > 1 else 0
        precio_adicionales = (
            cajas_xl * PRODUCTOS_ADICIONALES["cajas_xl"]["precio"] + carritos * PRODUCTOS_ADICIONALES["carritos"]["precio"] +
            film * PRODUCTOS_ADICIONALES["film"]["precio"] + esquineros * PRODUCTOS_ADICIONALES["esquineros"]["precio"] +
            papel_kraft * PRODUCTOS_ADICIONALES["papel_kraft"]["precio"]
        )
        precio_total = precio_base + precio_semanas + precio_adicionales
        
        return {
            "desglose": {
                "paquete": paquete_info["nombre"], "precio_base": f"${precio_base:,.2f}",
                "precio_semanas_adicionales": f"${precio_semanas:,.2f}",
                "precio_productos_adicionales": f"${precio_adicionales:,.2f}"
            },
            "precio_total": f"${precio_total:,.2f}", "precio_total_numerico": precio_total,
            "cajas_incluidas": paquete_info["cajas_incluidas"], "semanas": semanas
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
