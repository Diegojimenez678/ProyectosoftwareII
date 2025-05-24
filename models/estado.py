from config.database import Base
from sqlalchemy import Column,Integer,String,Float
from sqlalchemy.orm import relationship

class Estado(Base):
    __tablename__="estado"

    est_id = Column(Integer, primary_key = True)
    est_nombre=Column(String(30))

    
    user = relationship("User", back_populates="estado")
    ag = relationship("Ag", back_populates="estado")
    hn = relationship("Hn", back_populates="estado")
    nt = relationship("Nt", back_populates="estado")    
    uz = relationship("Uz", back_populates="estado")
    
    
