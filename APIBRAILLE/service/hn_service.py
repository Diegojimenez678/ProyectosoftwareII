from fastapi import HTTPException
from models.hn import Hn as HnModule
from sqlalchemy.orm import Session
from schemas.hn import Hn
import pytz
from datetime import datetime

local_timezone = pytz.timezone('America/Bogota')

class HnService():

    def __init__(self, db: Session) -> None:
        self.db = db
        
    def get_hn(self):
        try:
            result = self.db.query(HnModule).all()
            hn_list = [
                {
                    "hn_id": hn.hn_id,
                    "hn_idestado": hn.hn_idestado,
                    "hn_fecha_inicio": hn.hn_fecha_inicio,
                    "hn_hora_inicio": hn.hn_hora_inicio,
                    "hn_unol": hn.hn_unol,
                    "hn_dosl": hn.hn_dosl,
                    "hn_tresl": hn.hn_tresl,
                    "hn_cuatrol": hn.hn_cuatrol,
                    "hn_cincol": hn.hn_cincol,
                    "hn_seisl": hn.hn_seisl,
                    "hn_sietel": hn.hn_sietel,
                    "hn_unos": hn.hn_unos,
                    "hn_doss": hn.hn_doss,
                    "hn_tress": hn.hn_tress,
                    "hn_cuatros": hn.hn_cuatros,
                    "hn_cincos": hn.hn_cincos,
                    "hn_seiss": hn.hn_seiss,
                    "hn_sietes": hn.hn_sietes,
                    "hn_fecha_fin": hn.hn_fecha_fin,
                    "hn_hora_fin": hn.hn_hora_fin,
                    "nombre_estado": hn.estado.est_nombre,
                }
                for hn in result
            ]
            return hn_list
        except Exception as e:
            self.db.rollback()
            raise HTTPException(status_code=500, detail=str(e))

    def get_hn_by_id(self, id: int):
        try:
            result = self.db.query(HnModule).filter(HnModule.hn_id == id).all()
            hn_list = [
                {
                    "hn_id": hn.hn_id,
                    "hn_idestado": hn.hn_idestado,
                    "hn_fecha_inicio": hn.hn_fecha_inicio,
                    "hn_hora_inicio": hn.hn_hora_inicio,
                    "hn_unol": hn.hn_unol,
                    "hn_dosl": hn.hn_dosl,
                    "hn_tresl": hn.hn_tresl,
                    "hn_cuatrol": hn.hn_cuatrol,
                    "hn_cincol": hn.hn_cincol,
                    "hn_seisl": hn.hn_seisl,
                    "hn_sietel": hn.hn_sietel,
                    "hn_unos": hn.hn_unos,
                    "hn_doss": hn.hn_doss,
                    "hn_tress": hn.hn_tress,
                    "hn_cuatros": hn.hn_cuatros,
                    "hn_cincos": hn.hn_cincos,
                    "hn_seiss": hn.hn_seiss,
                    "hn_sietes": hn.hn_sietes,
                    "hn_fecha_fin": hn.hn_fecha_fin,
                    "hn_hora_fin": hn.hn_hora_fin,
                    "nombre_estado": hn.estado.est_nombre,
                }
                for hn in result
            ]
            return hn_list
        except Exception as e:
            self.db.rollback()
            raise HTTPException(status_code=500, detail=str(e))

    def create_hn(self, hn: Hn):
        try:
            current_datetime = datetime.now(local_timezone)
            current_date = current_datetime.date()
            current_time = current_datetime.time()
            new_hn = HnModule(
                hn_idestado=2,
                hn_fecha_inicio=hn.hn_fecha_inicio,
                hn_hora_inicio=hn.hn_hora_inicio,
                hn_unol=hn.hn_unol,
                hn_dosl=hn.hn_dosl,
                hn_tresl=hn.hn_tresl,
                hn_cuatrol=hn.hn_cuatrol,
                hn_cincol=hn.hn_cincol,
                hn_seisl=hn.hn_seisl,
                hn_sietel=hn.hn_sietel,
                hn_unos=hn.hn_unos,
                hn_doss=hn.hn_doss,
                hn_tress=hn.hn_tress,
                hn_cuatros=hn.hn_cuatros,
                hn_cincos=hn.hn_cincos,
                hn_seiss=hn.hn_seiss,
                hn_sietes=hn.hn_sietes,
                hn_fecha_fin=current_date,
                hn_hora_fin=current_time
            )
            self.db.add(new_hn)
            self.db.commit()
            self.db.refresh(new_hn)
            return new_hn
        except Exception as e:
            self.db.rollback()
            raise HTTPException(status_code=500, detail=str(e))

    def update_hn(self, id: int, hn: Hn):
        try:
            hn_record = self.db.query(HnModule).filter(HnModule.hn_id == id).first()
            if not hn_record:
                raise HTTPException(status_code=404, detail="Hn not found")
            
            hn_record.hn_idestado = hn.hn_idestado
            hn_record.hn_fecha_inicio = hn.hn_fecha_inicio
            hn_record.hn_hora_inicio = hn.hn_hora_inicio
            hn_record.hn_unol = hn.hn_unol
            hn_record.hn_dosl = hn.hn_dosl
            hn_record.hn_tresl = hn.hn_tresl
            hn_record.hn_cuatrol = hn.hn_cuatrol
            hn_record.hn_cincol = hn.hn_cincol
            hn_record.hn_seisl = hn.hn_seisl
            hn_record.hn_sietel = hn.hn_sietel
            hn_record.hn_unos = hn.hn_unos
            hn_record.hn_doss = hn.hn_doss
            hn_record.hn_tress = hn.hn_tress
            hn_record.hn_cuatros = hn.hn_cuatros
            hn_record.hn_cincos = hn.hn_cincos
            hn_record.hn_seiss = hn.hn_seiss
            hn_record.hn_sietes = hn.hn_sietes
            hn_record.hn_fecha_fin = hn.hn_fecha_fin
            hn_record.hn_hora_fin = hn.hn_hora_fin

            self.db.commit()
            return hn_record
        except Exception as e:
            self.db.rollback()
            raise HTTPException(status_code=500, detail=str(e))
