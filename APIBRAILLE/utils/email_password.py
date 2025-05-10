import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from dotenv import load_dotenv
import os
import re

# Cargar las variables del archivo .env
load_dotenv()

def send_reset_password_email(email: str, verification_code: str):
    # Validar email simple
    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        raise ValueError("Correo electrónico inválido")

    smtp_server = 'smtp.gmail.com'
    smtp_port = 587

    sender_email = os.getenv('EMAIL_ADDRESS')
    sender_password = os.getenv('EMAIL_PASSWORD')

    if not sender_email or not sender_password:
        raise EnvironmentError("Faltan EMAIL_ADDRESS o EMAIL_PASSWORD en el archivo .env")

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = email
    msg['Subject'] = 'Código de verificación para restablecimiento de contraseña'

    message = f"""Hola,

Hemos recibido una solicitud para restablecer la contraseña de tu cuenta.

Utiliza el siguiente código de verificación para proceder con el cambio de contraseña:
Código de verificación: {verification_code}

Este código es válido por 15 minutos. Si no solicitaste este cambio, puedes ignorar este mensaje.

Atentamente,
Tu aplicación
"""
    msg.attach(MIMEText(message, 'plain'))

    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, email, msg.as_string())

        print(f"Correo enviado a {email} con el código de verificación.")
    except Exception as e:
        print(f"Error al enviar el correo: {e}")
        raise
