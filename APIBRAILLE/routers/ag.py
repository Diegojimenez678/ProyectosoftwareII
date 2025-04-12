from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from typing import List
from config.database import Session
from middlewares.jwt_bearer import JWTBearer
from models.ag import Ag
from fastapi.encoders import jsonable_encoder
from service.ag_service import AgService
from schemas.ag import Ag


ag_router = APIRouter()


@ag_router.get('/ag', tags=['Ag'], response_model=List[Ag], dependencies=[Depends(JWTBearer())])
def get_ag() -> List[Ag]:
    db = Session()
    try:
        result = AgService(db).get_ag()
        return JSONResponse(content=jsonable_encoder(result))
    except Exception as e:
        return JSONResponse(content={"error": f"Error al obtener los Ags: {str(e)}"}, status_code=500)
    finally:
        db.close()


@ag_router.get('/ag/{id}', tags=['Ag'], response_model=Ag, dependencies=[Depends(JWTBearer())])
def get_ag(id: int) -> Ag:
    db = Session()
    try:
        result = AgService(db).get_ag_by_id(id)
        return JSONResponse(content=jsonable_encoder(result))
    except Exception as e:
        return JSONResponse(content={"error": f"Error al obtener el Ag: {str(e)}"}, status_code=500)
    finally:
        db.close()


@ag_router.post('/ag', tags=['Ag'], response_model=dict)
def create_ag(ag: Ag) -> dict:
    db = Session()
    try:
        AgService(db).create_ag(ag)
        return JSONResponse(content={"message": "Se han insertado los datos correctamente"}, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error": f"Error al insertar los datos: {str(e)}"}, status_code=500)
    finally:
        db.close()


@ag_router.put('/ag/{id}', tags=['Ag'], response_model=dict, dependencies=[Depends(JWTBearer())])
def update_ag(id: int, ag: Ag) -> dict:
    db = Session()
    try:
        AgService(db).update_ag(id, ag)
        return JSONResponse(content={"message": "Ag actualizado"})
    except Exception as e:
        return JSONResponse(content={"error": f"Error al actualizar el Ag: {str(e)}"}, status_code=500)
    finally:
        db.close()
