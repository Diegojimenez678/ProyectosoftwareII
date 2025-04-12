from config.database import Base
from sqlalchemy import Column,Integer,ForeignKey,Boolean,Date,Time
from sqlalchemy.orm import relationship

class Hn(Base):
    __tablename__="hn"

    hn_id = Column(Integer, primary_key = True)
    hn_idestado= Column(Integer, ForeignKey("estado.est_id"), nullable=False)
    hn_fecha_inicio=Column(Date)
    hn_hora_inicio=Column(Time)
    hn_unol=Column(Boolean)
    hn_dosl=Column(Boolean)
    hn_tresl=Column(Boolean)
    hn_cuatrol=Column(Boolean)
    hn_cincol=Column(Boolean)
    hn_seisl=Column(Boolean)
    hn_sietel=Column(Boolean)
    hn_unos=Column(Boolean)
    hn_doss=Column(Boolean)
    hn_tress=Column(Boolean)
    hn_cuatros=Column(Boolean)
    hn_cincos=Column(Boolean)
    hn_seiss=Column(Boolean)
    hn_sietes=Column(Boolean)
    hn_fecha_fin=Column(Date)
    hn_hora_fin=Column(Time)
    

    
    estado = relationship("Estado", back_populates="hn")
    
    