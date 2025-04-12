from sqlalchemy import Column, Integer, Boolean, DECIMAL, DATETIME, String, ForeignKey
from sqlalchemy.orm import relationship
from config.database import Base

class User(Base):
    __tablename__ = "user"

    usu_id = Column(Integer, primary_key=True, autoincrement=True)
    usu_idestado = Column(Integer, ForeignKey("estado.est_id"), nullable=False)       
    usu_documento = Column(String(20))
    usu_nombre = Column(String(50))
    usu_apellido = Column(String(50))
    usu_correo = Column(String(50))
    usu_nickname = Column(String(50),unique=True, index=True)
    usu_clave = Column(String(255))        
    
    estado = relationship("Estado", back_populates="user")
    usersession = relationship("UserSession", back_populates="user")

    