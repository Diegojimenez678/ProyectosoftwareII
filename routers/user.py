from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from typing import List
from config.database import Session
from middlewares.jwt_bearer import JWTBearer
from models.user import User
from fastapi.encoders import jsonable_encoder
from service.user_service import UserService
from schemas.user import User
from utils.jwt_manager import create_token
from schemas.correo_cli import CorreoCli,PasswordReset,CodeCli
from schemas.user_usu import User_usu


user_router = APIRouter()


@user_router.get('/user',tags=['Usuario'], response_model=list[User],dependencies=[Depends(JWTBearer())])
def get_user()-> List [User]:
        db = Session()
        try:
                result = UserService(db).get_user()
                return JSONResponse(content= jsonable_encoder(result))
        except Exception as e:        
                return JSONResponse(content={"error": f"Error al obtener los usuarios: {str(e)}"}, status_code=500)
        finally:
                db.close()

@user_router.post('/user',tags=['Usuario'],response_model=dict)
def create_usuario(usuario:User)-> dict:
        db = Session()
        try:
                UserService(db).create_user(usuario)
                return JSONResponse(content={"message":"Se han insertado los datos correctamente"}, status_code=200)
        except Exception as e:
                return JSONResponse(content={"error": f"Error al insertar los datos: {str(e)}"}, status_code=500)


@user_router.put('/user/{id}', tags=['Usuario'], response_model=dict,dependencies=[Depends(JWTBearer())])
def update_user(id: int, user: User) -> dict:
        db = Session()
        try:               
                UserService(db).update_user(id, user)
                return JSONResponse(content={"message": "usuario actualizado"})
        except Exception as e:                
                return JSONResponse(content={"error": f"Error al actualizar el usuario: {str(e)}"}, status_code=500)
        finally:
                db.close()



@user_router.post('/login', tags=['Auth'])
def login(user: User_usu):    
        db = Session()
        try:
                print("Intentando autenticar al usuario")
                result = UserService(db).authenticate_user(user.usu_nickname, user.usu_clave)
                print("Resultado de la autenticación:", result)
                    
                if result:
                        print("Usuario autenticado, creando token")
                        token = create_token(user.dict())
                        print("Token creado:", token)
                        
                        print("Intentando crear la sesión del usuario")
                        session = UserService(db).create_user_session(result.usu_id, token)
                        print("Sesión creada:", session)                                   
                        return {"token": token, "usu_idestado": result.usu_idestado,"usu_id":result.usu_id, "session": session}
                else:
                        raise HTTPException(status_code=401, detail="Credenciales inválidas")
        except Exception as e:
                raise HTTPException(status_code=500, detail=str(e))
        finally:
                db.close()



@user_router.put('/deactivate-session/{user_id}', tags=['Auth'])
def deactivate_session(user_id: int):  
    db = Session()  
    try:
        service = UserService(db)
        updated_session = service.deactivate_user_session(user_id)
        return {"message": "Sesión desactivada con éxito", "session": updated_session}
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)
    finally:
        db.close()


@user_router.post('/send-emailUsu', tags=['ResetUsu'])
def request_password_reset(correo: CorreoCli):
    db=Session()
    service = UserService(db)
    try:
        expiration,correousu =service.code_password(correo.correo)
        return {"message": "Código de recuperación de contraseña enviado con éxito", 
                "expiration": expiration,
                "correo": correousu}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()

@user_router.post('/valid-codeUsu', tags=['ResetUsu'])
def valid_code_endpoint(code: CodeCli):
    db = Session()
    service = UserService(db)
    try:
        token = service.valid_code(code.code)
        return {"message": "Código de verificación válido", "token": token}
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()
       

@user_router.post('/reset-passwordUsu', tags=['ResetUsu'])
def reset_password(data: PasswordReset):
    db=Session()
    service = UserService(db)
    try:
        service.reset_password_with_token(data.token, data.new_password)
        return {"message": "Contraseña restablecida con éxito"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()

@user_router.delete('/delete-codeUsu', tags=['ResetUsu'])
def deactivate_session(correo: CorreoCli):  
    db = Session()  
    try:
        service = UserService(db)
        service.delete_code(correo.correo)
        return {"message": "No fue posible cambiar la contraseña"}
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)
    finally:
        db.close()



