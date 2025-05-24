from config.database import Base
from sqlalchemy import Column,Integer,ForeignKey,Boolean,Date,Time
from sqlalchemy.orm import relationship

class Nt(Base):
    __tablename__="nt"

    nt_id = Column(Integer, primary_key = True)
    nt_idestado= Column(Integer, ForeignKey("estado.est_id"), nullable=False)
    nt_fecha_inicio=Column(Date)
    nt_hora_inicio=Column(Time)
    nt_unol=Column(Boolean)
    nt_dosl=Column(Boolean)
    nt_tresl=Column(Boolean)
    nt_cuatrol=Column(Boolean)
    nt_cincol=Column(Boolean)
    nt_seisl=Column(Boolean)
    nt_sietel=Column(Boolean)    
    nt_unos=Column(Boolean)
    nt_doss=Column(Boolean)
    nt_tress=Column(Boolean)
    nt_cuatros=Column(Boolean)
    nt_cincos=Column(Boolean)
    nt_seiss=Column(Boolean)  
    nt_sietes=Column(Boolean)  
    nt_fecha_fin=Column(Date)
    nt_hora_fin=Column(Time)  
    

    
    estado = relationship("Estado", back_populates="nt")
    
    