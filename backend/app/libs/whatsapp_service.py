# whatsapp_service.py
import databutton as db
import qrcode
import io
import base64
from twilio.rest import Client
from typing import Optional, List, Dict

class WhatsAppService:
    def __init__(self):
        # Load credentials from Databutton secrets
        self.account_sid = db.secrets.get("TWILIO_ACCOUNT_SID")
        self.auth_token = db.secrets.get("TWILIO_AUTH_TOKEN")
        self.whatsapp_number = db.secrets.get("TWILIO_WHATSAPP_NUMBER")
        
        if not all([self.account_sid, self.auth_token, self.whatsapp_number]):
            raise ValueError("Twilio credentials are not fully configured in Databutton secrets.")
            
        self.client = Client(self.account_sid, self.auth_token)

    async def send_message(
        self,
        phone: str,
        message: str,
        media_url: Optional[str] = None
    ) -> Dict:
        """Send a WhatsApp message via Twilio."""
        try:
            # Basic phone number formatting
            if not phone.startswith('+'):
                phone = f"+52{phone}"  # Assuming Mexico country code

            message_data = {
                'from_': f"whatsapp:{self.whatsapp_number}",
                'to': f"whatsapp:{phone}",
                'body': message,
            }

            if media_url:
                message_data['media_url'] = [media_url]

            msg = self.client.messages.create(**message_data)
            
            return {
                "message_id": msg.sid,
                "status": msg.status,
            }
        except Exception as e:
            print(f"Error sending WhatsApp message: {e}")
            return {"error": str(e)}

    async def send_order_confirmation(self, phone: str, order_number: str, order_id: str):
        """Send an order confirmation message."""
        tracking_url = f"/track/{order_id}" # Using relative URL for frontend
        message = (
            f"✅ *Confirmación de Pedido*\n\n"
            f"¡Hola! Tu pedido *{order_number}* ha sido confirmado.\n\n"
            f"📦 *Estado:* En preparación\n"
            f"🚚 *Entrega estimada:* Hoy entre 2-4 PM\n\n"
            f"📍 *Rastrea tu pedido en tiempo real:*\n{tracking_url}\n\n"
            f"Recibirás actualizaciones cuando el repartidor esté en camino."
        )
        return await self.send_message(phone, message)

    async def send_tracking_update(self, phone: str, tracking_id: str, lat: float, lng: float):
        """Send a real-time tracking update."""
        map_url = f"https://maps.google.com/?q={lat},{lng}"
        tracking_url = f"/track/{tracking_id}"
        message = (
            f"🚚 *Tu pedido está en camino*\n\n"
            f"El repartidor está a aproximadamente *10 minutos*.\n\n"
            f"📍 *Ver ubicación actual:*\n{map_url}\n\n"
            f"🔗 *Seguimiento en vivo:*\n{tracking_url}"
        )
        return await self.send_message(phone, message)
        
    def generate_whatsapp_qr(self, phone_number: str, message: str) -> str:
        """Generate a QR code that opens a WhatsApp chat."""
        whatsapp_url = f"https://wa.me/{phone_number}?text={message.replace(' ', '%20')}"
        
        qr = qrcode.QRCode(version=1, box_size=10, border=5)
        qr.add_data(whatsapp_url)
        qr.make(fit=True)
        
        img = qr.make_image(fill_color="black", back_color="white")
        
        buffered = io.BytesIO()
        img.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
        
        return f"data:image/png;base64,{img_str}"

    async def handle_incoming_message(self, from_number: str, body: str):
        """Handle incoming WhatsApp messages for chatbot functionality."""
        response = self._process_message(body)
        if response:
            await self.send_message(from_number, response)

    def _process_message(self, message: str) -> Optional[str]:
        """Simple NLP to process incoming messages."""
        message_lower = message.lower().strip()
        
        if "confirmar" in message_lower:
            return "✅ Pedido confirmado. Recibirás actualizaciones por este medio."
        elif "factura" in message_lower or "rfc" in message_lower:
            return "Para generar tu factura, por favor proporciona tu RFC y Razón Social."
        elif "ayuda" in message_lower:
            return (
                "*Comandos disponibles:*\n"
                "• RASTREAR - Ver estado de tu pedido\n"
                "• FACTURA - Solicitar factura\n"
                "• AYUDA - Ver este menú"
            )
        return "Gracias por tu mensaje. Un agente te atenderá en breve."
