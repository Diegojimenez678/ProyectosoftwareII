from fastapi import HTTPException
from models.uz import Uz as UzModule
from sqlalchemy.orm import Session
from schemas.uz import Uz
import pytz
from datetime import datetime

local_timezone = pytz.timezone('America/Bogota')

class UzService():

    def __init__(self, db: Session) -> None:
        self.db = db
        
    def get_uz(self):
        try:
            result = self.db.query(UzModule).all()
            uz_list = [
                {
                    "uz_id": uz.uz_id,
                    "uz_idestado": uz.uz_idestado,
                    "uz_fecha_inicio": uz.uz_fecha_inicio,
                    "uz_hora_inicio": uz.uz_hora_inicio,
                    "uz_unol": uz.uz_unol,
                    "uz_dosl": uz.uz_dosl,
                    "uz_tresl": uz.uz_tresl,
                    "uz_cuatrol": uz.uz_cuatrol,
                    "uz_cincol": uz.uz_cincol,
                    "uz_seisl": uz.uz_seisl,
                    "uz_unos": uz.uz_unos,
                    "uz_doss": uz.uz_doss,
                    "uz_tress": uz.uz_tress,
                    "uz_cuatros": uz.uz_cuatros,
                    "uz_cincos": uz.uz_cincos,
                    "uz_seiss": uz.uz_seiss,
                    "uz_fecha_fin": uz.uz_fecha_fin,
                    "uz_hora_fin": uz.uz_hora_fin,
                    "nombre_estado": uz.estado.est_nombre,
                }
                for uz in result
            ]
            return uz_list
        except Exception as e:
            self.db.rollback()
            raise HTTPException(status_code=500, detail=str(e))

    def get_uz_by_id(self, id: int):
        try:
            result = self.db.query(UzModule).filter(UzModule.uz_id == id).all()
            uz_list = [
                {
                    "uz_id": uz.uz_id,
                    "uz_idestado": uz.uz_idestado,
                    "uz_fecha_inicio": uz.uz_fecha_inicio,
                    "uz_hora_inicio": uz.uz_hora_inicio,
                    "uz_unol": uz.uz_unol,
                    "uz_dosl": uz.uz_dosl,
                    "uz_tresl": uz.uz_tresl,
                    "uz_cuatrol": uz.uz_cuatrol,
                    "uz_cincol": uz.uz_cincol,
                    "uz_seisl": uz.uz_seisl,
                    "uz_unos": uz.uz_unos,
                    "uz_doss": uz.uz_doss,
                    "uz_tress": uz.uz_tress,
                    "uz_cuatros": uz.uz_cuatros,
                    "uz_cincos": uz.uz_cincos,
                    "uz_seiss": uz.uz_seiss,
                    "uz_fecha_fin": uz.uz_fecha_fin,
                    "uz_hora_fin": uz.uz_hora_fin,
                    "nombre_estado": uz.estado.est_nombre,
                }
                for uz in result
            ]
            return uz_list
        except Exception as e:
            self.db.rollback()
            raise HTTPException(status_code=500, detail=str(e))
        
    def create_uz(self, uz: Uz):
        try:
            current_datetime = datetime.now(local_timezone)
            current_date = current_datetime.date()
            current_time = current_datetime.time()
            new_uz = UzModule(
                uz_idestado=2,
                uz_fecha_inicio=uz.uz_fecha_inicio,
                uz_hora_inicio=uz.uz_hora_inicio,
                uz_unol=uz.uz_unol,
                uz_dosl=uz.uz_dosl,
                uz_tresl=uz.uz_tresl,
                uz_cuatrol=uz.uz_cuatrol,
                uz_cincol=uz.uz_cincol,
                uz_seisl=uz.uz_seisl,
                uz_unos=uz.uz_unos,
                uz_doss=uz.uz_doss,
                uz_tress=uz.uz_tress,
                uz_cuatros=uz.uz_cuatros,
                uz_cincos=uz.uz_cincos,
                uz_seiss=uz.uz_seiss,
                uz_fecha_fin=current_date,
                uz_hora_fin=current_time
            )
            self.db.add(new_uz)
            self.db.commit()
            self.db.refresh(new_uz)
            return new_uz
        except Exception as e:
            self.db.rollback()
            raise HTTPException(status_code=500, detail=str(e))

    def update_uz(self, id: int, uz: Uz):
        try:
            uz_record = self.db.query(UzModule).filter(UzModule.uz_id == id).first()
            if not uz_record:
                raise HTTPException(status_code=404, detail="Uz not found")
            
            uz_record.uz_idestado = uz.uz_idestado
            uz_record.uz_fecha_inicio = uz.uz_fecha_inicio
            uz_record.uz_hora_inicio = uz.uz_hora_inicio
            uz_record.uz_unol = uz.uz_unol
            uz_record.uz_dosl = uz.uz_dosl
            uz_record.uz_tresl = uz.uz_tresl
            uz_record.uz_cuatrol = uz.uz_cuatrol
            uz_record.uz_cincol = uz.uz_cincol
            uz_record.uz_seisl = uz.uz_seisl
            uz_record.uz_unos = uz.uz_unos
            uz_record.uz_doss = uz.uz_doss
            uz_record.uz_tress = uz.uz_tress
            uz_record.uz_cuatros = uz.uz_cuatros
            uz_record.uz_cincos = uz.uz_cincos
            uz_record.uz_seiss = uz.uz_seiss
            uz_record.uz_fecha_fin = uz.uz_fecha_fin
            uz_record.uz_hora_fin = uz.uz_hora_fin

            self.db.commit()
            return uz_record
        except Exception as e:
            self.db.rollback()
            raise HTTPException(status_code=500, detail=str(e))
