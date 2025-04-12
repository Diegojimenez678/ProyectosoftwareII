from fastapi import HTTPException
from models.nt import Nt as NtModule
from sqlalchemy.orm import Session
from schemas.nt import Nt
import pytz
from datetime import datetime

local_timezone = pytz.timezone('America/Bogota')

class NtService():

    def __init__(self, db: Session) -> None:
        self.db = db
        
    def get_nt(self):
        try:
            result = self.db.query(NtModule).all()
            nt_list = [
                {
                    "nt_id": nt.nt_id,
                    "nt_idestado": nt.nt_idestado,
                    "nt_fecha_inicio": nt.nt_fecha_inicio,
                    "nt_hora_inicio": nt.nt_hora_inicio,
                    "nt_unol": nt.nt_unol,
                    "nt_dosl": nt.nt_dosl,
                    "nt_tresl": nt.nt_tresl,
                    "nt_cuatrol": nt.nt_cuatrol,
                    "nt_cincol": nt.nt_cincol,
                    "nt_seisl": nt.nt_seisl,
                    "nt_sietel": nt.nt_sietel,
                    "nt_unos": nt.nt_unos,
                    "nt_doss": nt.nt_doss,
                    "nt_tress": nt.nt_tress,
                    "nt_cuatros": nt.nt_cuatros,
                    "nt_cincos": nt.nt_cincos,
                    "nt_seiss": nt.nt_seiss,
                    "nt_sietes": nt.nt_sietes,
                    "nt_fecha_fin": nt.nt_fecha_fin,
                    "nt_hora_fin": nt.nt_hora_fin,
                    "nombre_estado": nt.estado.est_nombre,
                }
                for nt in result
            ]
            return nt_list
        except Exception as e:
            self.db.rollback()
            raise HTTPException(status_code=500, detail=str(e))
        
    def get_nt_by_id(self, id: int):
        try:
            result = self.db.query(NtModule).filter(NtModule.nt_id == id).all()
            nt_list = [
                {
                    "nt_id": nt.nt_id,
                    "nt_idestado": nt.nt_idestado,
                    "nt_fecha_inicio": nt.nt_fecha_inicio,
                    "nt_hora_inicio": nt.nt_hora_inicio,
                    "nt_unol": nt.nt_unol,
                    "nt_dosl": nt.nt_dosl,
                    "nt_tresl": nt.nt_tresl,
                    "nt_cuatrol": nt.nt_cuatrol,
                    "nt_cincol": nt.nt_cincol,
                    "nt_seisl": nt.nt_seisl,
                    "nt_sietel": nt.nt_sietel,
                    "nt_unos": nt.nt_unos,
                    "nt_doss": nt.nt_doss,
                    "nt_tress": nt.nt_tress,
                    "nt_cuatros": nt.nt_cuatros,
                    "nt_cincos": nt.nt_cincos,
                    "nt_seiss": nt.nt_seiss,
                    "nt_sietes": nt.nt_sietes,
                    "nt_fecha_fin": nt.nt_fecha_fin,
                    "nt_hora_fin": nt.nt_hora_fin,
                    "nombre_estado": nt.estado.est_nombre,
                }
                for nt in result
            ]
            return nt_list
        except Exception as e:
            self.db.rollback()
            raise HTTPException(status_code=500, detail=str(e))

    def create_nt(self, nt: Nt):
        try:
            current_datetime = datetime.now(local_timezone)
            current_date = current_datetime.date()
            current_time = current_datetime.time()
            new_nt = NtModule(
                nt_idestado=2,
                nt_fecha_inicio=nt.nt_fecha_inicio,
                nt_hora_inicio=nt.nt_hora_inicio,
                nt_unol=nt.nt_unol,
                nt_dosl=nt.nt_dosl,
                nt_tresl=nt.nt_tresl,
                nt_cuatrol=nt.nt_cuatrol,
                nt_cincol=nt.nt_cincol,
                nt_seisl=nt.nt_seisl,
                nt_sietel=nt.nt_sietel,
                nt_unos=nt.nt_unos,
                nt_doss=nt.nt_doss,
                nt_tress=nt.nt_tress,
                nt_cuatros=nt.nt_cuatros,
                nt_cincos=nt.nt_cincos,
                nt_seiss=nt.nt_seiss,
                nt_sietes=nt.nt_sietes,
                nt_fecha_fin=current_date,
                nt_hora_fin=current_time
            )
            self.db.add(new_nt)
            self.db.commit()
            self.db.refresh(new_nt)
            return new_nt
        except Exception as e:
            self.db.rollback()
            raise HTTPException(status_code=500, detail=str(e))

    def update_nt(self, id: int, nt: Nt):
        try:
            nt_record = self.db.query(NtModule).filter(NtModule.nt_id == id).first()
            if not nt_record:
                raise HTTPException(status_code=404, detail="Nt not found")
            
            nt_record.nt_idestado = nt.nt_idestado
            nt_record.nt_fecha_inicio = nt.nt_fecha_inicio
            nt_record.nt_hora_inicio = nt.nt_hora_inicio
            nt_record.nt_unol = nt.nt_unol
            nt_record.nt_dosl = nt.nt_dosl
            nt_record.nt_tresl = nt.nt_tresl
            nt_record.nt_cuatrol = nt.nt_cuatrol
            nt_record.nt_cincol = nt.nt_cincol
            nt_record.nt_seisl = nt.nt_seisl
            nt_record.nt_sietel = nt.nt_sietel
            nt_record.nt_unos = nt.nt_unos
            nt_record.nt_doss = nt.nt_doss
            nt_record.nt_tress = nt.nt_tress
            nt_record.nt_cuatros = nt.nt_cuatros
            nt_record.nt_cincos = nt.nt_cincos
            nt_record.nt_seiss = nt.nt_seiss
            nt_record.nt_sietes = nt.nt_sietes
            nt_record.nt_fecha_fin = nt.nt_fecha_fin
            nt_record.nt_hora_fin = nt.nt_hora_fin

            self.db.commit()
            return nt_record
        except Exception as e:
            self.db.rollback()
            raise HTTPException(status_code=500, detail=str(e))
