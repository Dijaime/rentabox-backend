from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return jsonify({"message": "RentaBox Backend is running!"})

@app.route('/health')
def health():
    return jsonify({"status": "healthy"})

@app.route('/api/boxes')
def get_boxes():
    boxes = [
        {"id": 1, "size": "small", "price": 50},
        {"id": 2, "size": "medium", "price": 75},
        {"id": 3, "size": "large", "price": 100}
    ]
    return jsonify(boxes)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)