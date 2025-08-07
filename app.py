from flask import Flask, jsonify
from flask_cors import CORS
import os  # ← ¡AGREGA ESTA LÍNEA!

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return jsonify({"message": "RentaBox Backend is running!"})

@app.route('/api/boxes')
def get_boxes():
    boxes = [
        {"id": 1, "size": "small", "available": True},
        {"id": 2, "size": "medium", "available": True},
        {"id": 3, "size": "large", "available": False}
    ]
    return jsonify(boxes)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 10000))  # Render usa puerto 10000 por defecto
    app.run(host='0.0.0.0', port=port, debug=False)