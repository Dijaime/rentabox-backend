from fastapi import FastAPI
import uvicorn

app = FastAPI(title="RentaBox API")

@app.get("/")
def home():
    return {"message": "API RentaBox funcionando!", "status": "OK"}

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.get("/api/boxes")
def get_boxes():
    return {
        "boxes": [
            {"id": 1, "name": "Box Small", "price": 50},
            {"id": 2, "name": "Box Medium", "price": 100},
            {"id": 3, "name": "Box Large", "price": 150}
        ]
    }

if __name__ == "__main__":
    print("\n" + "="*60)
    print("🚀 SERVIDOR RENTABOX INICIADO")
    print("📍 Abre en tu navegador: http://localhost:8000")
    print("📊 Documentación: http://localhost:8000/docs")
    print("🛑 Ctrl+C para detener")
    print("="*60 + "\n")
    
    uvicorn.run(app, host="0.0.0.0", port=8000)