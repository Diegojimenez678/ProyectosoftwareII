from config.database import Base
from sqlalchemy import Column,Integer,ForeignKey,Boolean,Date,Time
from sqlalchemy.orm import relationship

class Uz(Base):
    __tablename__="uz"

    uz_id = Column(Integer, primary_key = True)
    uz_idestado= Column(Integer, ForeignKey("estado.est_id"), nullable=False)
    uz_fecha_inicio=Column(Date)
    uz_hora_inicio=Column(Time)
    uz_unol=Column(Boolean)
    uz_dosl=Column(Boolean)
    uz_tresl=Column(Boolean)
    uz_cuatrol=Column(Boolean)
    uz_cincol=Column(Boolean) 
    uz_seisl=Column(Boolean)     
    uz_unos=Column(Boolean)
    uz_doss=Column(Boolean)
    uz_tress=Column(Boolean)
    uz_cuatros=Column(Boolean)
    uz_cincos=Column(Boolean)
    uz_seiss=Column(Boolean)     
    uz_fecha_fin=Column(Date)
    uz_hora_fin=Column(Time)

    
    estado = relationship("Estado", back_populates="uz")
    
    