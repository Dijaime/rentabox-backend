# gps_tracker.py - Versión de desarrollo
import random
from datetime import datetime, timedelta
from typing import List, Dict

class GPSTracker:
    """GPS Tracker para desarrollo sin API key real"""
    
    def __init__(self):
        self.api_key = "DEVELOPMENT_MODE"
        self.tracking_sessions = {}
        
        # Coordenadas de ejemplo para CDMX
        self.cdmx_bounds = {
            'north': 19.5927,
            'south': 19.2445,
            'east': -98.9603,
            'west': -99.3651
        }
    
    def calculate_route(self, origin: Dict, destination: Dict, waypoints: List[Dict] = None):
        """Simula cálculo de ruta para desarrollo"""
        
        # Generar ruta simulada
        distance = random.randint(3000, 15000)  # metros
        duration = random.randint(600, 3600)  # segundos
        
        # Generar puntos de ruta simulados
        route_points = self._generate_fake_route(origin, destination, 10)
        
        return {
            "distance": distance,
            "duration": duration,
            "polyline": "fake_polyline_string_for_dev_mode",
            "route_points": route_points,
            "steps": [
                {"instruction": "Dirígete al norte", "distance": 500},
                {"instruction": "Gira a la derecha", "distance": 1200},
                {"instruction": "Continúa recto", "distance": 800},
                {"instruction": "Has llegado a tu destino", "distance": 0}
            ],
            "bounds": {
                "northeast": {"lat": 19.4400, "lng": -99.1200},
                "southwest": {"lat": 19.4200, "lng": -99.1400}
            }
        }
    
    def track_driver(self, driver_id: str, lat: float, lng: float):
        """Simula tracking de conductor"""
        if driver_id not in self.tracking_sessions:
            self.tracking_sessions[driver_id] = {
                "locations": [],
                "started_at": datetime.now(),
                "total_distance": 0
            }
        
        session = self.tracking_sessions[driver_id]
        
        # Simular movimiento
        if not session["locations"]:
            # Primera ubicación
            lat = 19.4326 + random.uniform(-0.01, 0.01)
            lng = -99.1332 + random.uniform(-0.01, 0.01)
        else:
            # Mover ligeramente desde última posición
            last = session["locations"][-1]
            lat = last["lat"] + random.uniform(-0.002, 0.002)
            lng = last["lng"] + random.uniform(-0.002, 0.002)
        
        session["locations"].append({
            "lat": lat,
            "lng": lng,
            "timestamp": datetime.now().isoformat(),
            "speed": random.uniform(10, 60)  # km/h
        })
        
        # Simular distancia recorrida
        session["total_distance"] += random.uniform(50, 200)
        
        return session
    
    def get_estimated_arrival(self, current_location: Dict, destination: Dict) -> Dict:
        """Simula cálculo de ETA"""
        
        time_remaining = random.randint(300, 1800) # 5-30 minutos
        distance_remaining = random.randint(1000, 10000)
        
        return {
            "distance_remaining": distance_remaining,
            "time_remaining": time_remaining,
            "eta": (datetime.now() + timedelta(seconds=time_remaining)).isoformat(),
            "traffic_condition": random.choice(["light", "moderate", "heavy"])
        }
    
    def generate_tracking_link(self, order_id: str) -> str:
        """Genera link de tracking"""
        import hashlib
        tracking_id = hashlib.md5(f"{order_id}{datetime.now()}".encode()).hexdigest()[:12]
        return f"/track/{tracking_id}" # Using relative path for frontend routing
    
    def _generate_fake_route(self, origin: Dict, destination: Dict, num_points: int) -> List[Dict]:
        """Genera puntos de ruta simulados"""
        route = []
        
        lat_diff = (destination['lat'] - origin['lat']) / num_points
        lng_diff = (destination['lng'] - origin['lng']) / num_points
        
        for i in range(num_points + 1):
            route.append({
                'lat': origin['lat'] + (lat_diff * i) + random.uniform(-0.001, 0.001),
                'lng': origin['lng'] + (lng_diff * i) + random.uniform(-0.001, 0.001)
            })
        
        return route
    
    def geocode_address(self, address: str) -> Dict:
        """Simula geocodificación"""
        return {
            'lat': 19.4326 + random.uniform(-0.1, 0.1),
            'lng': -99.1332 + random.uniform(-0.1, 0.1),
            'formatted_address': address,
            'place_id': f"fake_place_{random.randint(1000, 9999)}"
        }
    
    def reverse_geocode(self, lat: float, lng: float) -> str:
        """Simula geocodificación inversa"""
        streets = ["Av. Reforma", "Av. Insurgentes", "Calle Madero", "Av. Juárez"]
        return f"{random.choice(streets)} #{random.randint(1, 500)}, CDMX"
