from pydantic import BaseModel
from datetime import date, time
from typing import Optional

class Nt(BaseModel):
    nt_id: Optional[int] = None
    nt_idestado: int
    nt_fecha_inicio: Optional[date]
    nt_hora_inicio: Optional[time]
    nt_unol: Optional[bool]
    nt_dosl: Optional[bool]
    nt_tresl: Optional[bool]
    nt_cuatrol: Optional[bool]
    nt_cincol: Optional[bool]
    nt_seisl: Optional[bool]
    nt_sietel: Optional[bool]
    nt_unos: Optional[bool]
    nt_doss: Optional[bool]
    nt_tress: Optional[bool]
    nt_cuatros: Optional[bool]
    nt_cincos: Optional[bool]
    nt_seiss: Optional[bool]
    nt_sietes: Optional[bool]
    nt_fecha_fin: Optional[date]
    nt_hora_fin: Optional[time]

    class Config:
        orm_mode = True
