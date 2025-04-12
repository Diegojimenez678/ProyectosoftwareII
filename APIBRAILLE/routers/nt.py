from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from typing import List
from config.database import Session
from middlewares.jwt_bearer import JWTBearer
from models.nt import Nt as NtModel
from fastapi.encoders import jsonable_encoder
from service.nt_service import NtService
from schemas.nt import Nt


nt_router = APIRouter()


@nt_router.get('/nt', tags=['Nt'], response_model=List[Nt], dependencies=[Depends(JWTBearer())])
def get_nt() -> List[Nt]:
    db = Session()
    try:
        result = NtService(db).get_nt()
        return JSONResponse(content=jsonable_encoder(result))
    except Exception as e:
        return JSONResponse(content={"error": f"Error al obtener los Nts: {str(e)}"}, status_code=500)
    finally:
        db.close()


@nt_router.get('/nt/{id}', tags=['Nt'], response_model=Nt, dependencies=[Depends(JWTBearer())])
def get_nt(id: int) -> Nt:
    db = Session()
    try:
        result = NtService(db).get_nt_by_id(id)
        return JSONResponse(content=jsonable_encoder(result))
    except Exception as e:
        return JSONResponse(content={"error": f"Error al obtener el Nt: {str(e)}"}, status_code=500)
    finally:
        db.close()


@nt_router.post('/nt', tags=['Nt'], response_model=dict)
def create_nt(nt: Nt) -> dict:
    db = Session()
    try:
        NtService(db).create_nt(nt)
        return JSONResponse(content={"message": "Se han insertado los datos correctamente"}, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error": f"Error al insertar los datos: {str(e)}"}, status_code=500)
    finally:
        db.close()


@nt_router.put('/nt/{id}', tags=['Nt'], response_model=dict, dependencies=[Depends(JWTBearer())])
def update_nt(id: int, nt: Nt) -> dict:
    db = Session()
    try:
        NtService(db).update_nt(id, nt)
        return JSONResponse(content={"message": "Nt actualizado"})
    except Exception as e:
        return JSONResponse(content={"error": f"Error al actualizar el Nt: {str(e)}"}, status_code=500)
    finally:
        db.close()
