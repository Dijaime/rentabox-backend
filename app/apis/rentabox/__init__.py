from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timedelta
from pydantic import BaseModel, EmailStr
from app.database import get_db, Usuario, Caja, Renta, Pago

router = APIRouter()

# Schemas Pydantic
class UsuarioCreate(BaseModel):
    nombre: str
    email: EmailStr
    telefono: Optional[str] = None
    password: str

class UsuarioResponse(BaseModel):
    id: int
    nombre: str
    email: str
    telefono: Optional[str]
    tipo_usuario: str
    activo: bool
    fecha_registro: datetime
    
    class Config:
        from_attributes = True

class CajaCreate(BaseModel):
    codigo: str
    tamano: str
    descripcion: Optional[str] = None
    precio_por_mes: float
    ubicacion: Optional[str] = None

class CajaResponse(BaseModel):
    id: int
    codigo: str
    tamano: str
    descripcion: Optional[str]
    precio_por_mes: float
    estado: str
    ubicacion: Optional[str]
    fecha_creacion: datetime
    
    class Config:
        from_attributes = True

class RentaCreate(BaseModel):
    usuario_id: int
    caja_id: int
    fecha_inicio: datetime
    meses_contratados: int
    notas: Optional[str] = None

class RentaResponse(BaseModel):
    id: int
    usuario_id: int
    caja_id: int
    fecha_inicio: datetime
    fecha_fin: Optional[datetime]
    meses_contratados: int
    precio_mensual: float
    precio_total: float
    estado: str
    notas: Optional[str]
    fecha_creacion: datetime
    
    class Config:
        from_attributes = True

class PagoCreate(BaseModel):
    renta_id: int
    monto: float
    metodo_pago: str
    referencia: Optional[str] = None
    notas: Optional[str] = None

class PagoResponse(BaseModel):
    id: int
    renta_id: int
    monto: float
    fecha_pago: datetime
    metodo_pago: str
    referencia: Optional[str]
    estado: str
    notas: Optional[str]
    
    class Config:
        from_attributes = True

# ENDPOINTS DE USUARIOS
@router.post("/usuarios/", response_model=UsuarioResponse)
def crear_usuario(usuario: UsuarioCreate, db: Session = Depends(get_db)):
    db_usuario = db.query(Usuario).filter(Usuario.email == usuario.email).first()
    if db_usuario:
        raise HTTPException(status_code=400, detail="Email ya registrado")
    
    nuevo_usuario = Usuario(
        nombre=usuario.nombre,
        email=usuario.email,
        telefono=usuario.telefono,
        password_hash=usuario.password  # En producción, hashear la contraseña
    )
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)
    return nuevo_usuario

@router.get("/usuarios/", response_model=List[UsuarioResponse])
def listar_usuarios(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    usuarios = db.query(Usuario).offset(skip).limit(limit).all()
    return usuarios

@router.get("/usuarios/{usuario_id}", response_model=UsuarioResponse)
def obtener_usuario(usuario_id: int, db: Session = Depends(get_db)):
    usuario = db.query(Usuario).filter(Usuario.id == usuario_id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return usuario

# ENDPOINTS DE CAJAS
@router.post("/cajas/", response_model=CajaResponse)
def crear_caja(caja: CajaCreate, db: Session = Depends(get_db)):
    db_caja = db.query(Caja).filter(Caja.codigo == caja.codigo).first()
    if db_caja:
        raise HTTPException(status_code=400, detail="Código de caja ya existe")
    
    nueva_caja = Caja(**caja.dict())
    db.add(nueva_caja)
    db.commit()
    db.refresh(nueva_caja)
    return nueva_caja

@router.get("/cajas/", response_model=List[CajaResponse])
def listar_cajas(
    estado: Optional[str] = None,
    tamano: Optional[str] = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    query = db.query(Caja)
    if estado:
        query = query.filter(Caja.estado == estado)
    if tamano:
        query = query.filter(Caja.tamano == tamano)
    
    cajas = query.offset(skip).limit(limit).all()
    return cajas

@router.get("/cajas/{caja_id}", response_model=CajaResponse)
def obtener_caja(caja_id: int, db: Session = Depends(get_db)):
    caja = db.query(Caja).filter(Caja.id == caja_id).first()
    if not caja:
        raise HTTPException(status_code=404, detail="Caja no encontrada")
    return caja

@router.get("/cajas/disponibles/", response_model=List[CajaResponse])
def listar_cajas_disponibles(db: Session = Depends(get_db)):
    cajas = db.query(Caja).filter(Caja.estado == "disponible").all()
    return cajas

# ENDPOINTS DE RENTAS
@router.post("/rentas/", response_model=RentaResponse)
def crear_renta(renta: RentaCreate, db: Session = Depends(get_db)):
    # Verificar que la caja esté disponible
    caja = db.query(Caja).filter(Caja.id == renta.caja_id).first()
    if not caja:
        raise HTTPException(status_code=404, detail="Caja no encontrada")
    if caja.estado != "disponible":
        raise HTTPException(status_code=400, detail="Caja no disponible")
    
    # Verificar que el usuario existe
    usuario = db.query(Usuario).filter(Usuario.id == renta.usuario_id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    # Calcular fecha fin y precio total
    fecha_fin = renta.fecha_inicio + timedelta(days=30 * renta.meses_contratados)
    precio_total = caja.precio_por_mes * renta.meses_contratados
    
    # Crear la renta
    nueva_renta = Renta(
        usuario_id=renta.usuario_id,
        caja_id=renta.caja_id,
        fecha_inicio=renta.fecha_inicio,
        fecha_fin=fecha_fin,
        meses_contratados=renta.meses_contratados,
        precio_mensual=caja.precio_por_mes,
        precio_total=precio_total,
        notas=renta.notas
    )
    
    # Actualizar estado de la caja
    caja.estado = "rentada"
    
    db.add(nueva_renta)
    db.commit()
    db.refresh(nueva_renta)
    return nueva_renta

@router.get("/rentas/", response_model=List[RentaResponse])
def listar_rentas(
    estado: Optional[str] = None,
    usuario_id: Optional[int] = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    query = db.query(Renta)
    if estado:
        query = query.filter(Renta.estado == estado)
    if usuario_id:
        query = query.filter(Renta.usuario_id == usuario_id)
    
    rentas = query.offset(skip).limit(limit).all()
    return rentas

@router.get("/rentas/{renta_id}", response_model=RentaResponse)
def obtener_renta(renta_id: int, db: Session = Depends(get_db)):
    renta = db.query(Renta).filter(Renta.id == renta_id).first()
    if not renta:
        raise HTTPException(status_code=404, detail="Renta no encontrada")
    return renta

@router.put("/rentas/{renta_id}/finalizar")
def finalizar_renta(renta_id: int, db: Session = Depends(get_db)):
    renta = db.query(Renta).filter(Renta.id == renta_id).first()
    if not renta:
        raise HTTPException(status_code=404, detail="Renta no encontrada")
    
    # Actualizar estado de la renta
    renta.estado = "finalizada"
    renta.fecha_fin = datetime.utcnow()
    
    # Liberar la caja
    caja = db.query(Caja).filter(Caja.id == renta.caja_id).first()
    if caja:
        caja.estado = "disponible"
    
    db.commit()
    return {"message": "Renta finalizada exitosamente"}

# ENDPOINTS DE PAGOS
@router.post("/pagos/", response_model=PagoResponse)
def crear_pago(pago: PagoCreate, db: Session = Depends(get_db)):
    # Verificar que la renta existe
    renta = db.query(Renta).filter(Renta.id == pago.renta_id).first()
    if not renta:
        raise HTTPException(status_code=404, detail="Renta no encontrada")
    
    nuevo_pago = Pago(**pago.dict())
    db.add(nuevo_pago)
    db.commit()
    db.refresh(nuevo_pago)
    return nuevo_pago

@router.get("/pagos/", response_model=List[PagoResponse])
def listar_pagos(
    renta_id: Optional[int] = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    query = db.query(Pago)
    if renta_id:
        query = query.filter(Pago.renta_id == renta_id)
    
    pagos = query.offset(skip).limit(limit).all()
    return pagos

# ENDPOINT DE ESTADÍSTICAS
@router.get("/estadisticas/dashboard")
def obtener_estadisticas(db: Session = Depends(get_db)):
    total_cajas = db.query(Caja).count()
    cajas_disponibles = db.query(Caja).filter(Caja.estado == "disponible").count()
    cajas_rentadas = db.query(Caja).filter(Caja.estado == "rentada").count()
    total_usuarios = db.query(Usuario).count()
    rentas_activas = db.query(Renta).filter(Renta.estado == "activa").count()
    
    # Calcular ingresos del mes actual
    from sqlalchemy import func, extract
    mes_actual = datetime.utcnow().month
    año_actual = datetime.utcnow().year
    
    ingresos_mes = db.query(func.sum(Pago.monto)).filter(
        extract('month', Pago.fecha_pago) == mes_actual,
        extract('year', Pago.fecha_pago) == año_actual
    ).scalar() or 0
    
    return {
        "total_cajas": total_cajas,
        "cajas_disponibles": cajas_disponibles,
        "cajas_rentadas": cajas_rentadas,
        "total_usuarios": total_usuarios,
        "rentas_activas": rentas_activas,
        "ingresos_mes_actual": ingresos_mes,
        "porcentaje_ocupacion": (cajas_rentadas / total_cajas * 100) if total_cajas > 0 else 0
    }