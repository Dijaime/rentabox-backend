from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, Boolean, ForeignKey, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./rentabox.db")

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Modelos de la base de datos
class Usuario(Base):
    __tablename__ = "usuarios"
    
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    telefono = Column(String(20))
    password_hash = Column(String(255))
    tipo_usuario = Column(String(20), default="cliente")  # cliente, admin
    activo = Column(Boolean, default=True)
    fecha_registro = Column(DateTime, default=datetime.utcnow)
    
    # Relaciones
    rentas = relationship("Renta", back_populates="usuario")

class Caja(Base):
    __tablename__ = "cajas"
    
    id = Column(Integer, primary_key=True, index=True)
    codigo = Column(String(50), unique=True, nullable=False)
    tamano = Column(String(20))  # chica, mediana, grande
    descripcion = Column(Text)
    precio_por_mes = Column(Float)
    estado = Column(String(20), default="disponible")  # disponible, rentada, mantenimiento
    ubicacion = Column(String(100))
    fecha_creacion = Column(DateTime, default=datetime.utcnow)
    
    # Relaciones
    rentas = relationship("Renta", back_populates="caja")

class Renta(Base):
    __tablename__ = "rentas"
    
    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))
    caja_id = Column(Integer, ForeignKey("cajas.id"))
    fecha_inicio = Column(DateTime, nullable=False)
    fecha_fin = Column(DateTime)
    meses_contratados = Column(Integer)
    precio_mensual = Column(Float)
    precio_total = Column(Float)
    estado = Column(String(20), default="activa")  # activa, finalizada, cancelada
    notas = Column(Text)
    fecha_creacion = Column(DateTime, default=datetime.utcnow)
    
    # Relaciones
    usuario = relationship("Usuario", back_populates="rentas")
    caja = relationship("Caja", back_populates="rentas")
    pagos = relationship("Pago", back_populates="renta")

class Pago(Base):
    __tablename__ = "pagos"
    
    id = Column(Integer, primary_key=True, index=True)
    renta_id = Column(Integer, ForeignKey("rentas.id"))
    monto = Column(Float, nullable=False)
    fecha_pago = Column(DateTime, default=datetime.utcnow)
    metodo_pago = Column(String(50))  # efectivo, tarjeta, transferencia
    referencia = Column(String(100))
    estado = Column(String(20), default="completado")  # pendiente, completado, rechazado
    notas = Column(Text)
    
    # Relaciones
    renta = relationship("Renta", back_populates="pagos")

# Función para obtener la sesión de DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()