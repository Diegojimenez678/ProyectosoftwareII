from pydantic import BaseModel
from datetime import date, time
from typing import Optional

class Ag(BaseModel):
    ag_id: Optional[int] = None
    ag_idestado: int
    ag_fecha_inicio: Optional[date]
    ag_hora_inicio: Optional[time]
    ag_unol: Optional[bool]
    ag_dosl: Optional[bool]
    ag_tresl: Optional[bool]
    ag_cuatrol: Optional[bool]
    ag_cincol: Optional[bool]
    ag_seisl: Optional[bool]
    ag_sietel: Optional[bool]
    ag_unos: Optional[bool]
    ag_doss: Optional[bool]
    ag_tress: Optional[bool]
    ag_cuatros: Optional[bool]
    ag_cincos: Optional[bool]
    ag_seiss: Optional[bool]
    ag_sietes: Optional[bool]
    ag_fecha_fin: Optional[date]
    ag_hora_fin: Optional[time]

    class Config:
        orm_mode = True
