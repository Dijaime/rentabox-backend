from fastapi import FastAPI
import uvicorn

# Crear app sin modelos complejos
app = FastAPI(docs_url="/docs")

@app.get("/")
def home():
    return {"message": "RentaBox API Running"}

@app.get("/test")
def test():
    return {"status": "OK"}

if __name__ == "__main__":
    print("Starting server at http://localhost:8000")
    uvicorn.run(app, host="0.0.0.0", port=8000)