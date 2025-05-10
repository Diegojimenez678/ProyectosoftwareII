import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
import os
import re

# Cargar variables del entorno
load_dotenv()

def send_registration_email(email, nickname, clave):
    # Validación simple del correo
    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        raise ValueError("Correo electrónico inválido")
    
    smtp_server = "smtp.gmail.com"
    smtp_port = 587
    smtp_username = os.getenv("EMAIL_ADDRESS")
    smtp_password = os.getenv("EMAIL_PASSWORD")

    if not smtp_username or not smtp_password:
        raise EnvironmentError("EMAIL_ADDRESS o EMAIL_PASSWORD no definidos en .env")

    subject = "Registro exitoso"
    body = f"""
    <html>
    <head>
        <style>
            body {{
                text-align: center;
                font-family: 'Arial', sans-serif;
                background-color: #f0f0f0;
            }}
            .container {{
                width: 50%;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Bienvenido a *****</h1>
            <p>Haz un mundo mejor y recicla con nosotros. Este es tu nickname:</p>
            <p><strong>Nickname:</strong> {nickname}</p>      
            <p><strong>Contraseña:</strong> {clave}</p>           
        </div>
    </body>
    </html>
    """

    message = MIMEMultipart()
    message["From"] = smtp_username
    message["To"] = email
    message["Subject"] = subject
    message.attach(MIMEText(body, "html"))

    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(smtp_username, smtp_password)
            server.sendmail(smtp_username, email, message.as_string())
        print(f"Correo enviado a {email} con éxito.")
    except Exception as e:
        print(f"Error al enviar el correo: {e}")
        raise
