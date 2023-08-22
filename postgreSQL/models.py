from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, INTEGER, TEXT, DATE, FLOAT, TIMESTAMP
import datetime

Base = declarative_base()

class Patient(Base):
    __tablename__ = 'books'
    noadmsip = Column(INTEGER, primary_key=True)
    firstname = Column(TEXT)
    lastname = Column(TEXT)
    dateofbirth = Column(DATE)
    gender = Column(TEXT)
    lifetimenumber = Column(INTEGER)
    weight = Column(FLOAT)
    idealweight = Column(FLOAT)
    height = Column(FLOAT)
    primarydiagnosis = Column(TEXT)
    intime = Column(TIMESTAMP)
    outtime = Column(TIMESTAMP)
    lastloadingtime = Column(TIMESTAMP, onupdate=datetime.datetime.now)
    
    def __repr__(self):
        return "<Patient(noadmsip='{}', firstname='{}', lastname={}, dateofbirth={}, gender={}, lifetimenumber={}, weight={}, idealweight={}, height={}, primarydiagnosis={}, intime={}, outtime={}, lastloadingtime={})>"\
                .format(self.noadmsip, self.firstname, self.lastname, self.dateofbirth, self.gender, self.lifetimenumber, self.weight, self.idealweight, self.height, self.primarydiagnosis, self.intime, self.outtime, self.lastloadingtime)