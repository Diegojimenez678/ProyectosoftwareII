from datetime import datetime
from pydantic import BaseModel
from typing import Optional
from schemas.user import User


class Usersession(BaseModel):
    uses_id: Optional[int]
    uses_iduser: int
    uses_token: str
    uses_expiration_timestamp: datetime
    uses_created_at: datetime
    uses_active: bool
    usuario: User

    class Config:
        orm_mode = True