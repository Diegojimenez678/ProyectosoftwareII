from pydantic import BaseModel
from datetime import date, time
from typing import Optional

class Hn(BaseModel):
    hn_id: Optional[int] = None
    hn_idestado: int
    hn_fecha_inicio: Optional[date]
    hn_hora_inicio: Optional[time]
    hn_unol: Optional[bool]
    hn_dosl: Optional[bool]
    hn_tresl: Optional[bool]
    hn_cuatrol: Optional[bool]
    hn_cincol: Optional[bool]
    hn_seisl: Optional[bool]
    hn_sietel: Optional[bool]
    hn_unos: Optional[bool]
    hn_doss: Optional[bool]
    hn_tress: Optional[bool]
    hn_cuatros: Optional[bool]
    hn_cincos: Optional[bool]
    hn_seiss: Optional[bool]
    hn_sietes: Optional[bool]
    hn_fecha_fin: Optional[date]
    hn_hora_fin: Optional[time]

    class Config:
        orm_mode = True
