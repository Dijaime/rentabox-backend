from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.apis.rentabox import router as rentabox_router
from app.database import engine, Base
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Crear tablas
Base.metadata.create_all(bind=engine)

# Crear aplicación
app = FastAPI(
    title="RentaBox API",
    description="API para el sistema de renta de cajas RentaBox Pro",
    version="1.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, especifica los dominios permitidos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir routers
app.include_router(rentabox_router, prefix="/api/v1", tags=["rentabox"])

@app.get("/")
def read_root():
    return {
        "message": "Bienvenido a RentaBox API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}