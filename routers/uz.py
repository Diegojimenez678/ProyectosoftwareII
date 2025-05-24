from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from typing import List
from config.database import Session
from middlewares.jwt_bearer import JWTBearer
from models.uz import Uz as UzModel
from fastapi.encoders import jsonable_encoder
from service.uz_service import UzService
from schemas.uz import Uz


uz_router = APIRouter()


@uz_router.get('/uz', tags=['Uz'], response_model=List[Uz], dependencies=[Depends(JWTBearer())])
def get_uz() -> List[Uz]:
    db = Session()
    try:
        result = UzService(db).get_uz()
        return JSONResponse(content=jsonable_encoder(result))
    except Exception as e:
        return JSONResponse(content={"error": f"Error al obtener los Uzs: {str(e)}"}, status_code=500)
    finally:
        db.close()


@uz_router.get('/uz/{id}', tags=['Uz'], response_model=Uz, dependencies=[Depends(JWTBearer())])
def get_uz(id: int) -> Uz:
    db = Session()
    try:
        result = UzService(db).get_uz_by_id(id)
        return JSONResponse(content=jsonable_encoder(result))
    except Exception as e:
        return JSONResponse(content={"error": f"Error al obtener el Uz: {str(e)}"}, status_code=500)
    finally:
        db.close()


@uz_router.post('/uz', tags=['Uz'], response_model=dict)
def create_uz(uz: Uz) -> dict:
    db = Session()
    try:
        UzService(db).create_uz(uz)
        return JSONResponse(content={"message": "Se han insertado los datos correctamente"}, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error": f"Error al insertar los datos: {str(e)}"}, status_code=500)
    finally:
        db.close()


@uz_router.put('/uz/{id}', tags=['Uz'], response_model=dict, dependencies=[Depends(JWTBearer())])
def update_uz(id: int, uz: Uz) -> dict:
    db = Session()
    try:
        UzService(db).update_uz(id, uz)
        return JSONResponse(content={"message": "Uz actualizado"})
    except Exception as e:
        return JSONResponse(content={"error": f"Error al actualizar el Uz: {str(e)}"}, status_code=500)
    finally:
        db.close()
