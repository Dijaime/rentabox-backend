from fastapi import APIRouter, Depends
from pydantic import BaseModel
import asyncpg
import databutton as db
from typing import List, Optional

router = APIRouter()

class Product(BaseModel):
    id: int
    name: str
    sku: Optional[str] = None
    type: str
    base_price: Optional[float] = None
    price_per_week: Optional[float] = None
    stock: int
    image_url: Optional[str] = None

async def get_db_connection():
    conn = await asyncpg.connect(db.secrets.get("DATABASE_URL_DEV"))
    try:
        yield conn
    finally:
        await conn.close()

@router.get("/products", response_model=List[Product])
async def list_products(conn: asyncpg.Connection = Depends(get_db_connection)):
    """
    Retrieve all products from the database.
    """
    rows = await conn.fetch("SELECT id, name, sku, type, base_price, price_per_week, stock, image_url FROM products ORDER BY name")
    return [Product(**row) for row in rows]
