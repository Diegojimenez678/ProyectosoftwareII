from pydantic import BaseModel
from typing import Optional
from schemas.estado import Estado

class User(BaseModel):
        usu_id: Optional[int]=None
        usu_idestado: int                
        usu_documento:str
        usu_nombre:str   
        usu_apellido:str
        usu_correo:str
        usu_nickname:str
        usu_clave:str        
        estado:Estado
        