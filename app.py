from flask import Flask, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return jsonify({
        "message": "RentaBox API",
        "status": "running",
        "version": "1.0"
    })

@app.route('/health')
def health():
    return jsonify({"status": "healthy"})

@app.route('/api/boxes')
def get_boxes():
    boxes = [
        {"id": 1, "name": "Box A1", "size": "small", "price": 50, "status": "available"},
        {"id": 2, "name": "Box B2", "size": "medium", "price": 80, "status": "rented"},
        {"id": 3, "name": "Box C3", "size": "large", "price": 120, "status": "available"}
    ]
    return jsonify(boxes)

@app.route('/api/users')
def get_users():
    users = [
        {"id": 1, "name": "John Doe", "email": "john@example.com"},
        {"id": 2, "name": "Jane Smith", "email": "jane@example.com"}
    ]
    return jsonify(users)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0', port=port, debug=False)