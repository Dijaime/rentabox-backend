from typing import Union

try:
    from fastapi import FastAPI
    print("✅ FastAPI instalado correctamente")
except ImportError:
    print("❌ FastAPI NO está instalado")
    print("Instalando FastAPI...")
    import subprocess
    import sys
    subprocess.check_call([sys.executable, "-m", "pip", "install", "fastapi"])
    from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)