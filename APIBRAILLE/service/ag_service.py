from fastapi import HTTPException
from models.ag import Ag as AgModule
from sqlalchemy.orm import Session
from schemas.ag import Ag
import pytz
from datetime import datetime

local_timezone = pytz.timezone('America/Bogota')

class AgService():

    def __init__(self, db: Session) -> None:
        self.db = db
        
    def get_ag(self):
        try:
            result = self.db.query(AgModule).all()
            ag_list = [
                {
                    "ag_id": ag.ag_id,
                    "ag_idestado": ag.ag_idestado,
                    "ag_fecha_inicio": ag.ag_fecha_inicio,
                    "ag_hora_inicio": ag.ag_hora_inicio,
                    "ag_unol": ag.ag_unol,
                    "ag_dosl": ag.ag_dosl,
                    "ag_tresl": ag.ag_tresl,
                    "ag_cuatrol": ag.ag_cuatrol,
                    "ag_cincol": ag.ag_cincol,
                    "ag_seisl": ag.ag_seisl,
                    "ag_sietel": ag.ag_sietel,
                    "ag_unos": ag.ag_unos,
                    "ag_doss": ag.ag_doss,
                    "ag_tress": ag.ag_tress,
                    "ag_cuatros": ag.ag_cuatros,
                    "ag_cincos": ag.ag_cincos,
                    "ag_seiss": ag.ag_seiss,
                    "ag_sietes": ag.ag_sietes,
                    "ag_fecha_fin": ag.ag_fecha_fin,
                    "ag_hora_fin": ag.ag_hora_fin,
                    "nombre_estado": ag.estado.est_nombre,
                }
                for ag in result
            ]
            return ag_list
        except Exception as e:
            self.db.rollback()
            raise HTTPException(status_code=500, detail=str(e))

    def get_ag_by_id(self, id: int):
        try:
            result = self.db.query(AgModule).filter(AgModule.ag_id == id).all()
            ag_list = [
                {
                    "ag_id": ag.ag_id,
                    "ag_idestado": ag.ag_idestado,
                    "ag_fecha_inicio": ag.ag_fecha_inicio,
                    "ag_hora_inicio": ag.ag_hora_inicio,
                    "ag_unol": ag.ag_unol,
                    "ag_dosl": ag.ag_dosl,
                    "ag_tresl": ag.ag_tresl,
                    "ag_cuatrol": ag.ag_cuatrol,
                    "ag_cincol": ag.ag_cincol,
                    "ag_seisl": ag.ag_seisl,
                    "ag_sietel": ag.ag_sietel,
                    "ag_unos": ag.ag_unos,
                    "ag_doss": ag.ag_doss,
                    "ag_tress": ag.ag_tress,
                    "ag_cuatros": ag.ag_cuatros,
                    "ag_cincos": ag.ag_cincos,
                    "ag_seiss": ag.ag_seiss,
                    "ag_sietes": ag.ag_sietes,
                    "ag_fecha_fin": ag.ag_fecha_fin,
                    "ag_hora_fin": ag.ag_hora_fin,
                    "nombre_estado": ag.estado.est_nombre,
                }
                for ag in result
            ]
            return ag_list
        except Exception as e:
            self.db.rollback()
            raise HTTPException(status_code=500, detail=str(e))

    def create_ag(self, ag: Ag):
        try:
            current_datetime = datetime.now(local_timezone)
            current_date = current_datetime.date()
            current_time = current_datetime.time()
            new_ag = AgModule(
                ag_idestado=ag.ag_idestado,
                ag_fecha_inicio=ag.ag_fecha_inicio,
                ag_hora_inicio=ag.ag_hora_inicio,
                ag_unol=ag.ag_unol,
                ag_dosl=ag.ag_dosl,
                ag_tresl=ag.ag_tresl,
                ag_cuatrol=ag.ag_cuatrol,
                ag_cincol=ag.ag_cincol,
                ag_seisl=ag.ag_seisl,
                ag_sietel=ag.ag_sietel,
                ag_unos=ag.ag_unos,
                ag_doss=ag.ag_doss,
                ag_tress=ag.ag_tress,
                ag_cuatros=ag.ag_cuatros,
                ag_cincos=ag.ag_cincos,
                ag_seiss=ag.ag_seiss,
                ag_sietes=ag.ag_sietes,
                ag_fecha_fin=current_date,
                ag_hora_fin=current_time
            )
            self.db.add(new_ag)
            self.db.commit()
            self.db.refresh(new_ag)
            return new_ag
        except Exception as e:
            self.db.rollback()
            raise HTTPException(status_code=500, detail=str(e))

    def update_ag(self, id: int, ag: Ag):
        try:
            ag_record = self.db.query(AgModule).filter(AgModule.ag_id == id).first()
            if not ag_record:
                raise HTTPException(status_code=404, detail="Ag not found")
            
            ag_record.ag_idestado = ag.ag_idestado
            ag_record.ag_fecha_inicio = ag.ag_fecha_inicio
            ag_record.ag_hora_inicio = ag.ag_hora_inicio
            ag_record.ag_unol = ag.ag_unol
            ag_record.ag_dosl = ag.ag_dosl
            ag_record.ag_tresl = ag.ag_tresl
            ag_record.ag_cuatrol = ag.ag_cuatrol
            ag_record.ag_cincol = ag.ag_cincol
            ag_record.ag_seisl = ag.ag_seisl
            ag_record.ag_sietel = ag.ag_sietel
            ag_record.ag_unos = ag.ag_unos
            ag_record.ag_doss = ag.ag_doss
            ag_record.ag_tress = ag.ag_tress
            ag_record.ag_cuatros = ag.ag_cuatros
            ag_record.ag_cincos = ag.ag_cincos
            ag_record.ag_seiss = ag.ag_seiss
            ag_record.ag_sietes = ag.ag_sietes
            ag_record.ag_fecha_fin = ag.ag_fecha_fin
            ag_record.ag_hora_fin = ag.ag_hora_fin

            self.db.commit()
            return ag_record
        except Exception as e:
            self.db.rollback()
            raise HTTPException(status_code=500, detail=str(e))
