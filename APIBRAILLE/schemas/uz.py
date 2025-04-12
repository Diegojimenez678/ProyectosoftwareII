from pydantic import BaseModel
from datetime import date, time
from typing import Optional

class Uz(BaseModel):
    uz_id: Optional[int] = None
    uz_idestado: int
    uz_fecha_inicio: Optional[date]
    uz_hora_inicio: Optional[time]
    uz_unol: Optional[bool]
    uz_dosl: Optional[bool]
    uz_tresl: Optional[bool]
    uz_cuatrol: Optional[bool]
    uz_cincol: Optional[bool]
    uz_seisl: Optional[bool]
    uz_unos: Optional[bool]
    uz_doss: Optional[bool]
    uz_tress: Optional[bool]
    uz_cuatros: Optional[bool]
    uz_cincos: Optional[bool]
    uz_seiss: Optional[bool]
    uz_fecha_fin: Optional[date]
    uz_hora_fin: Optional[time]

    class Config:
        orm_mode = True
