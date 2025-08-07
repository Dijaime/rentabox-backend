

import os
from sqlalchemy import create_engine, Column, String, Integer, Float, DateTime, Boolean, ForeignKey, Text, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime
import uuid
import databutton as db
from app.env import mode, Mode

# Database configuration
if mode == Mode.PROD:
    DATABASE_URL = db.secrets.get("DATABASE_URL_PROD")
else:
    DATABASE_URL = db.secrets.get("DATABASE_URL_DEV")


engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Models
class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    full_name = Column(String)
    phone = Column(String)
    role = Column(String, default="user")
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    last_login = Column(DateTime)
    
    # Relationships
    orders = relationship("Order", back_populates="user")
    messages = relationship("Message", back_populates="user")

class Customer(Base):
    __tablename__ = "customers"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    email = Column(String, unique=True)
    phone = Column(String)
    company = Column(String)
    rfc = Column(String)  # For Mexican tax ID
    address = Column(JSON)
    credit_limit = Column(Float, default=0)
    balance = Column(Float, default=0)
    status = Column(String, default="active")
    score = Column(Integer, default=50)
    tags = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, onupdate=datetime.utcnow)
    
    # Relationships
    orders = relationship("Order", back_populates="customer")
    invoices = relationship("Invoice", back_populates="customer")
    quotes = relationship("Quote", back_populates="customer")

class Order(Base):
    __tablename__ = "orders"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    order_number = Column(String, unique=True)
    customer_id = Column(String, ForeignKey("customers.id"))
    user_id = Column(String, ForeignKey("users.id"))
    status = Column(String, default="pending")
    total_amount = Column(Float)
    payment_status = Column(String, default="pending")
    payment_method = Column(String)
    items = Column(JSON)
    shipping_address = Column(JSON)
    delivery_date = Column(DateTime)
    tracking_id = Column(String)
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, onupdate=datetime.utcnow)
    
    # GPS Tracking
    driver_id = Column(String)
    current_location = Column(JSON)  # {lat, lng, timestamp}
    route = Column(JSON)  # Array of coordinates
    estimated_arrival = Column(DateTime)
    delivery_status = Column(String, default="pending")
    delivery_proof = Column(String)  # URL to photo/signature
    
    # Relationships
    customer = relationship("Customer", back_populates="orders")
    user = relationship("User", back_populates="orders")
    tracking_updates = relationship("TrackingUpdate", back_populates="order")

class TrackingUpdate(Base):
    __tablename__ = "tracking_updates"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    order_id = Column(String, ForeignKey("orders.id"))
    location = Column(JSON)  # {lat, lng}
    status = Column(String)
    message = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    # Relationship
    order = relationship("Order", back_populates="tracking_updates")

class Product(Base):
    __tablename__ = "products"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    sku = Column(String, unique=True)
    name = Column(String, nullable=False)
    description = Column(Text)
    category = Column(String)
    price = Column(Float)
    cost = Column(Float)
    stock = Column(Integer, default=0)
    min_stock = Column(Integer, default=10)
    unit = Column(String, default="pza")
    tax_rate = Column(Float, default=16.0)  # IVA in Mexico
    images = Column(JSON, default=list)
    attributes = Column(JSON)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, onupdate=datetime.utcnow)

class Invoice(Base):
    __tablename__ = "invoices"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    folio = Column(String, unique=True)
    customer_id = Column(String, ForeignKey("customers.id"))
    order_id = Column(String, ForeignKey("orders.id"))
    
    # SAT Fields for Mexican invoicing
    uuid_sat = Column(String)  # UUID from SAT
    cfdi_version = Column(String, default="4.0")
    tipo_comprobante = Column(String, default="I")  # I=Ingreso
    forma_pago = Column(String)  # 01=Efectivo, 03=Transferencia, etc
    metodo_pago = Column(String)  # PUE=Pago en una exhibición
    uso_cfdi = Column(String)  # G03=Gastos generales
    
    subtotal = Column(Float)
    tax = Column(Float)
    total = Column(Float)
    currency = Column(String, default="MXN")
    exchange_rate = Column(Float, default=1.0)
    
    xml_file = Column(String)  # Path to XML file
    pdf_file = Column(String)  # Path to PDF file
    status = Column(String, default="draft")
    
    issued_at = Column(DateTime)
    cancelled_at = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    customer = relationship("Customer", back_populates="invoices")

class Quote(Base):
    __tablename__ = "quotes"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    quote_number = Column(String, unique=True)
    customer_id = Column(String, ForeignKey("customers.id"))
    valid_until = Column(DateTime)
    status = Column(String, default="draft")
    items = Column(JSON)
    subtotal = Column(Float)
    tax = Column(Float)
    total = Column(Float)
    notes = Column(Text)
    terms = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, onupdate=datetime.utcnow)
    
    # Relationships
    customer = relationship("Customer", back_populates="quotes")

class Message(Base):
    __tablename__ = "messages"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"))
    customer_id = Column(String, ForeignKey("customers.id"))
    channel = Column(String)  # whatsapp, sms, email
    direction = Column(String)  # inbound, outbound
    content = Column(Text)
    media_url = Column(String)
    status = Column(String, default="sent")
    message_metadata = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="messages")

class Warehouse(Base):
    __tablename__ = "warehouses"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    code = Column(String, unique=True)
    name = Column(String)
    address = Column(JSON)
    capacity = Column(Integer)
    used_space = Column(Integer, default=0)
    manager = Column(String)
    phone = Column(String)
    operating_hours = Column(JSON)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Driver(Base):
    __tablename__ = "drivers"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    phone = Column(String)
    license_number = Column(String)
    vehicle_plate = Column(String)
    vehicle_model = Column(String)
    current_location = Column(JSON)
    status = Column(String, default="available")  # available, busy, offline
    rating = Column(Float, default=5.0)
    total_deliveries = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

# Create tables
# Base.metadata.create_all(bind=engine)
