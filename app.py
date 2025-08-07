from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os

app = FastAPI(title="RentaBox API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "RentaBox API Running!", "version": "1.0"}

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.get("/api/boxes")
def get_boxes():
    return [
        {"id": 1, "name": "Box A1", "size": "small", "price": 50},
        {"id": 2, "name": "Box B2", "size": "medium", "price": 80},
        {"id": 3, "name": "Box C3", "size": "large", "price": 120}
    ]

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)