from config.database import Base
from sqlalchemy import Column,Integer,ForeignKey,Boolean,Date,Time
from sqlalchemy.orm import relationship

class Ag(Base):
    __tablename__="ag"

    ag_id = Column(Integer, primary_key = True)
    ag_idestado= Column(Integer, ForeignKey("estado.est_id"), nullable=False)
    ag_fecha_inicio=Column(Date)
    ag_hora_inicio=Column(Time)
    ag_unol=Column(Boolean)
    ag_dosl=Column(Boolean)
    ag_tresl=Column(Boolean)
    ag_cuatrol=Column(Boolean)
    ag_cincol=Column(Boolean)
    ag_seisl=Column(Boolean)
    ag_sietel=Column(Boolean)
    ag_unos=Column(Boolean)
    ag_doss=Column(Boolean)
    ag_tress=Column(Boolean)
    ag_cuatros=Column(Boolean)
    ag_cincos=Column(Boolean)
    ag_seiss=Column(Boolean)
    ag_sietes=Column(Boolean)
    ag_fecha_fin=Column(Date)
    ag_hora_fin=Column(Time)
    

    
    estado = relationship("Estado", back_populates="ag")
    
    