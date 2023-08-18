from contextlib import contextmanager
from datetime import datetime

from config import DATABASE_URI
from models import Base, Patient
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

# CRUD : Create, Read, Update and Delete

engine = create_engine(DATABASE_URI)

# Creates individual sessions off of the global Session:
Session = sessionmaker(bind=engine)

@contextmanager
def session_scope():
    session = Session()
    try:
        yield session
        session.commit()
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()


def recreate_database():
    # To destroy all tables 
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)


if __name__ == '__main__':
    recreate_database()
    # add_data()

    patient = Patient(
        noadmsip = 3563,
        firstname = 'M', 
        lastname = 'B', 
        dateofbirth = '2002-12-05',
        gender = 'F', 
        lifetimenumber = 2107336,
        weight = 40.0, 
        idealweight = 0.0, 
        height = 0.0, 
        primarydiagnosis = 'NA', 
        intime = '2016-03-12 00:58:00', 
        outtime = '2016-03-18 12:00:00', 
        lastloadingtime = datetime.now()
    )   
    with session_scope() as s:
        s.add(patient)