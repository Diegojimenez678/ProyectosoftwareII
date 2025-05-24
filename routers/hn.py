from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from typing import List
from config.database import Session
from middlewares.jwt_bearer import JWTBearer
from models.hn import Hn
from fastapi.encoders import jsonable_encoder
from service.hn_service import HnService
from schemas.hn import Hn


hn_router = APIRouter()


@hn_router.get('/hn', tags=['Hn'], response_model=List[Hn], dependencies=[Depends(JWTBearer())])
def get_hn() -> List[Hn]:
    db = Session()
    try:
        result = HnService(db).get_hn()
        return JSONResponse(content=jsonable_encoder(result))
    except Exception as e:
        return JSONResponse(content={"error": f"Error al obtener los Hns: {str(e)}"}, status_code=500)
    finally:
        db.close()


@hn_router.get('/hn/{id}', tags=['Hn'], response_model=Hn, dependencies=[Depends(JWTBearer())])
def get_hn(id: int) -> Hn:
    db = Session()
    try:
        result = HnService(db).get_hn_by_id(id)
        return JSONResponse(content=jsonable_encoder(result))
    except Exception as e:
        return JSONResponse(content={"error": f"Error al obtener el Hn: {str(e)}"}, status_code=500)
    finally:
        db.close()


@hn_router.post('/hn', tags=['Hn'], response_model=dict)
def create_hn(hn: Hn) -> dict:
    db = Session()
    try:
        HnService(db).create_hn(hn)
        return JSONResponse(content={"message": "Se han insertado los datos correctamente"}, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error": f"Error al insertar los datos: {str(e)}"}, status_code=500)
    finally:
        db.close()


@hn_router.put('/hn/{id}', tags=['Hn'], response_model=dict, dependencies=[Depends(JWTBearer())])
def update_hn(id: int, hn: Hn) -> dict:
    db = Session()
    try:
        HnService(db).update_hn(id, hn)
        return JSONResponse(content={"message": "Hn actualizado"})
    except Exception as e:
        return JSONResponse(content={"error": f"Error al actualizar el Hn: {str(e)}"}, status_code=500)
    finally:
        db.close()
