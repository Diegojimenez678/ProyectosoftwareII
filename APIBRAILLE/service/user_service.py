import secrets
from fastapi import HTTPException
from sqlalchemy import func
from models.user import User  as UserModule
from sqlalchemy.orm import Session
from utils.email_password import send_reset_password_email
from utils.hash import hash_sha256_then_md5_then_sha1_and_sha512
from schemas.user import User
from utils.email import send_registration_email
from models.user_session import UserSession as UserSessionModule
from models.resetpassword import Resetpassword as ResetpasswordModule
from datetime import datetime, timedelta
import pytz

from utils.jwt_manager import create_token, validate_token

local_timezone = pytz.timezone('America/Bogota')

class UserService():

    def __init__(self, db: Session) -> None:
        self.db = db
        
    def get_user(self):      
        result = self.db.query(UserModule).all()
        user_list = [
            {
                "usu_id": user.usu_id,
                "usu_idestado": user.usu_idestado,                
                "usu_documento": user.usu_documento ,
                "usu_nombre": user.usu_nombre ,
                "usu_apellido": user.usu_apellido ,
                "usu_correo": user.usu_correo ,
                "usu_nickname": user.usu_nickname ,
                "usu_clave": user.usu_clave ,
                "nombre_estado": user.estado.est_nombre,   

            }
            for user in result
        ]
        return user_list
        
    
    def create_user(self, user: User):
        existing_user = self.db.query(UserModule).filter_by(usu_nickname=user.usu_nickname).first()
        existing_user_by_correo = self.db.query(UserModule).filter_by(usu_correo=user.usu_correo).first()

        if existing_user:
            raise ValueError("El nickname ya está en uso. Por favor, elige otro.")
        if existing_user_by_correo:
            raise ValueError("El correo electrónico ya está registrado. Por favor, usa otro correo.")
        
        new_user = UserModule(
            usu_idestado = user.usu_idestado,                        
            usu_documento = user.usu_documento,
            usu_nombre = user.usu_nombre,
            usu_apellido = user.usu_apellido,
            usu_correo = user.usu_correo,
            usu_nickname = user.usu_nickname,
            usu_clave = hash_sha256_then_md5_then_sha1_and_sha512(user.usu_clave),            
        )
        self.db.add(new_user)
        self.db.commit()
        send_registration_email(email = user.usu_correo,nickname = user.usu_nickname, clave = user.usu_clave)
        return "Usuario creado exitosamente"
    
    def update_user(self, id: int, user: User):
        result = self.db.query(UserModule).filter(UserModule.usu_id == id).first()
        result.usu_idestado = user.usu_idestado
        result.usu_documento = user.usu_documento
        result.usu_nombre = user.usu_nombre        
        result.usu_apellido = user.usu_apellido        
        result.usu_correo = user.usu_correo
        result.usu_nickname = user.usu_nickname
        result.usu_clave = user.usu_clave        
        self.db.commit()
        return

    def authenticate_user(self, nickname: str, clave: str):   
        password = hash_sha256_then_md5_then_sha1_and_sha512(clave)
        user = self.db.query(UserModule).filter(UserModule.usu_nickname == nickname, UserModule.usu_clave == password, UserModule.usu_idestado == 1).first()                   
        return user
   
    def create_user_session(self, user_id: int, token: str) -> UserSessionModule:
        try:
            existing_session = self.db.query(UserSessionModule).filter_by(uses_iduser=user_id).first()
            current_time = datetime.now(local_timezone)
            
            if existing_session:
                if existing_session.uses_active:
                    if current_time > existing_session.uses_expiration_timestamp.astimezone(local_timezone):
                        self.deactivate_user_session(user_id)
                        # Existing session is deactivated, create a new one
                        new_session = UserSessionModule(
                            uses_iduser=user_id,
                            uses_token=token,
                            uses_expiration_timestamp=current_time + timedelta(minutes=480),
                            uses_created_at=current_time,
                            uses_active=True
                        )
                        self.db.add(new_session)
                        self.db.commit()
                        self.db.refresh(new_session)
                        return new_session
                    else:
                        raise HTTPException(status_code=400, detail="Ya hay una sesión activa para este usuario.")
                else:
                    existing_session.uses_token = token
                    existing_session.uses_expiration_timestamp = current_time + timedelta(minutes=480)
                    existing_session.uses_created_at = current_time
                    existing_session.uses_active = True
                    self.db.commit()
                    self.db.refresh(existing_session)
                    return existing_session
            else:
                new_session = UserSessionModule(
                    uses_iduser=user_id,
                    uses_token=token,
                    uses_expiration_timestamp=current_time + timedelta(minutes=480),
                    uses_created_at=current_time,
                    uses_active=True
                )
                self.db.add(new_session)
                self.db.commit()
                self.db.refresh(new_session)
                return new_session
        except HTTPException as http_error:
            raise http_error
        except Exception as e:
            self.db.rollback()
            raise HTTPException(status_code=500, detail="Error al crear o actualizar la sesión de usuario")


    def deactivate_user_session(self, user_id: int) -> UserSessionModule:
        try:            
            existing_session = self.db.query(UserSessionModule).filter_by(uses_iduser=user_id).first()            
            if existing_session:   
                existing_session.uses_token = "null_session"         
                existing_session.uses_active = False
                self.db.commit()
                self.db.refresh(existing_session)
                return existing_session
            else:
                raise HTTPException(status_code=404, detail="Sesión no encontrada")
        except Exception as e:
            self.db.rollback()
            raise HTTPException(status_code=500, detail="Error al actualizar la sesión del usuario")
        
    
    
    
    def generate_verification_code(self, length=6):
        return ''.join(secrets.choice('0123456789') for i in range(length))

    def code_password(self, correo: str):
        try:
            user = self.db.query(UserModule).filter(UserModule.usu_correo == correo).first()
            if not user:
                raise ValueError("No se encontró ningún usuario con ese correo electrónico")

            verification_code = self.generate_verification_code()
            current_time = datetime.now(local_timezone)
            expiration_time = current_time + timedelta(minutes=15)
            reset_password_entry = self.db.query(ResetpasswordModule).filter(ResetpasswordModule.res_correo == correo).first()
            
            if reset_password_entry:
                reset_password_entry.res_code = verification_code
                reset_password_entry.res_expiration = expiration_time
            else:
                new_reset_password = ResetpasswordModule(
                    res_correo=correo,
                    res_code=verification_code,
                    res_expiration=expiration_time

                )
                self.db.add(new_reset_password)
            
            self.db.commit()
                    
            
            send_reset_password_email(email=correo, verification_code=verification_code)
            return expiration_time,correo
        finally:
            self.db.close()



    def valid_code(self, code: str):
        try:
            reset_entry = self.db.query(ResetpasswordModule).filter(ResetpasswordModule.res_code == code).first()
            if not reset_entry:
                raise ValueError("Código de verificación no encontrado")
            
            current_time = datetime.utcnow()
            if reset_entry.res_expiration > current_time:
                raise ValueError("El código de verificación ha expirado")

            token_data = {"sub": reset_entry.res_correo}
            token = create_token(token_data)
            return token
        except Exception as e:
            self.db.rollback()
            raise HTTPException(status_code=500, detail=str(e))
        finally:
            self.db.close()

    def reset_password_with_token(self, token: str, new_password: str):
        try:
            payload = validate_token(token)
            if not payload:
                raise ValueError("Token inválido o expirado")

            correo = payload.get("sub")
            if not correo:
                raise ValueError("No se pudo obtener el correo del token")

            user = self.db.query(UserModule).filter(UserModule.usu_correo == correo).first()
            if not user:
                raise ValueError("No se encontró ningún usuario con ese correo electrónico")

            user.usu_clave = hash_sha256_then_md5_then_sha1_and_sha512(new_password)

            reset_entry = self.db.query(ResetpasswordModule).filter(ResetpasswordModule.res_correo == correo).first()
            if reset_entry:
                self.db.delete(reset_entry)
                self.db.commit()
        except Exception as e:
            self.db.rollback()
            raise HTTPException(status_code=500, detail=str(e))
        finally:
            self.db.close()

    def delete_code(self, correo:str):
        try:
            reset_entry = self.db.query(ResetpasswordModule).filter(ResetpasswordModule.res_correo == correo).first()
            if reset_entry:
                self.db.delete(reset_entry)
                self.db.commit()
        except Exception as e:
            self.db.rollback()
            raise HTTPException(status_code=500, detail=str(e))
        finally:
            self.db.close()     