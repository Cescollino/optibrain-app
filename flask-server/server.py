import psycopg2
from flask import Flask
from flask_cors import CORS
import string
import datetime
from datetime import timedelta
import json
from json import JSONEncoder
from dateutil.relativedelta import relativedelta
import re
import sqlite3
import os
import pandas as pd
import DB
from flask import jsonify, make_response

# 1. Execute the virtual environment : source .venv/bin/activate
# 2. Install the requiered packages : pip install -r requirements.txt
class PatientEncoder(JSONEncoder):
        def default(self, o):
        
            if isinstance(o, datetime.datetime):
                return o.isoformat()
        
            return o.__dict__

app = Flask(__name__)

dateNow = datetime.datetime.now()

@app.route('/time')
def get_current_time():
    print('TIME')
    return make_response(jsonify({"time": "3.000000"}))

try:
    connection = psycopg2.connect(
        host = DB.HOST,
        dbname = DB.NAME,
        user = DB.USERNAME,
        password = DB.PASSWORD,
        port = DB.PORT
    )
    cursor = connection.cursor()

    if cursor is not None:
        print(' successfully connected to the pgAdmin database ! ')
    else:
        print(' not connected with database :( ')
    
    @app.route('/patients')
    def hello_world():
        return 'Hello World'
        
    @app.route("/patients/<noadmsip>")
    def searchPatient(noadmsip):   
        try:
            cursor.execute(f"SELECT * FROM Patient WHERE noadmsip={noadmsip};")
            result = cursor.fetchall()
            # Process the result as needed
            print(result)
            patient = json.dumps(result, indent=4, cls=PatientEncoder)
            return result
        except Exception as e:
            # Log the error message for debugging
            print("Error executing SQL query:", str(e))
            # Optionally, raise the exception to propagate it further
            raise e
    
    @app.route("/patients/<noadmsip>/kpis", methods=["GET"])
    def getPatientKpis(noadmsip):
        cursor.execute("SELECT * FROM PPC WHERE noadmsip="+ noadmsip +" ORDER BY horodate DESC;")
        PPC = cursor.fetchall()
        cursor.execute("SELECT * FROM PICm WHERE noadmsip="+ noadmsip +" ORDER BY horodate DESC")
        PICm = cursor.fetchall()
        cursor.execute("SELECT * FROM LICOX WHERE noadmsip="+ noadmsip +" ORDER BY horodate DESC")
        LICOX = cursor.fetchall()
        cursor.execute("SELECT * FROM Pupilles WHERE noadmsip="+ noadmsip +" ORDER BY horodate DESC")
        Pupilles = cursor.fetchall()
        cursor.execute("SELECT * FROM PVCm WHERE noadmsip="+ noadmsip +" ORDER BY horodate DESC")
        PVCm = cursor.fetchall()
        cursor.execute("SELECT * FROM PAm WHERE noadmsip="+ noadmsip +" ORDER BY horodate DESC")
        PAm = cursor.fetchall()
        cursor.execute("SELECT * FROM ETCO2 WHERE noadmsip="+ noadmsip +" ORDER BY horodate DESC")
        ETCO2 = cursor.fetchall()
        cursor.execute("SELECT * FROM PaCO2 WHERE noadmsip="+ noadmsip +" ORDER BY horodate DESC")
        PaCO2 = cursor.fetchall()
        cursor.execute("SELECT * FROM Glycemie WHERE noadmsip="+ noadmsip +" ORDER BY horodate DESC")
        Glycemie = cursor.fetchall()
        cursor.execute("SELECT * FROM INR WHERE noadmsip="+ noadmsip +" ORDER BY horodate DESC")
        INR = cursor.fetchall()
        cursor.execute("SELECT * FROM Plaquettes WHERE noadmsip="+ noadmsip +" ORDER BY horodate DESC")
        Plaquettes = cursor.fetchall()
        cursor.execute("SELECT * FROM Temperature WHERE noadmsip="+ noadmsip +" ORDER BY horodate DESC")
        Temperature = cursor.fetchall()
        cursor.execute("SELECT * FROM TeteLit WHERE noadmsip="+ noadmsip +" ORDER BY horodate DESC")
        TeteLit = cursor.fetchall()
        cursor.execute("SELECT * FROM Patient WHERE noadmsip="+ noadmsip +" ORDER BY horodate DESC")
        Patient = cursor.fetchall()
        allValues = [PPC, PICm, LICOX, Pupilles, PVCm, PAm, ETCO2, PaCO2, Glycemie, INR, Plaquettes, Temperature, TeteLit, Patient]
        PatientEncoder().encode(allValues)
        allValuesJSONData = json.dumps(allValues, indent=4, cls=PatientEncoder)
        return(allValuesJSONData)
    

    @app.route("/patients/<noadmsip>/kpis", methods=["GET"])
    def getKpis(noadmsip):
        cursor.execute("SELECT * FROM PPC WHERE noadmsip="+ noadmsip +" ORDER BY horodate DESC")
        PPC = cursor.fetchall()
        cursor.execute("SELECT * FROM PICm WHERE noadmsip="+ noadmsip +" ORDER BY horodate DESC")
        PICm = cursor.fetchall()
        cursor.execute("SELECT * FROM LICOX WHERE noadmsip="+ noadmsip +" ORDER BY horodate DESC")
        LICOX = cursor.fetchall()
        cursor.execute("SELECT * FROM Pupilles WHERE noadmsip="+ noadmsip +" ORDER BY horodate DESC")
        Pupilles = cursor.fetchall()
        cursor.execute("SELECT * FROM PVCm WHERE noadmsip="+ noadmsip +" ORDER BY horodate DESC")
        PVCm = cursor.fetchall()
        cursor.execute("SELECT * FROM PAm WHERE noadmsip="+ noadmsip +" ORDER BY horodate DESC")
        PAm = cursor.fetchall()
        cursor.execute("SELECT * FROM ETCO2 WHERE noadmsip="+ noadmsip +" ORDER BY horodate DESC")
        ETCO2 = cursor.fetchall()
        cursor.execute("SELECT * FROM PaCO2 WHERE noadmsip="+ noadmsip +" ORDER BY horodate DESC")
        PaCO2 = cursor.fetchall()
        cursor.execute("SELECT * FROM Glycemie WHERE noadmsip="+ noadmsip +" ORDER BY horodate DESC")
        Glycemie = cursor.fetchall()
        cursor.execute("SELECT * FROM INR WHERE noadmsip="+ noadmsip +" ORDER BY horodate DESC")
        INR = cursor.fetchall()
        cursor.execute("SELECT * FROM Plaquettes WHERE noadmsip="+ noadmsip +" ORDER BY horodate DESC")
        Plaquettes = cursor.fetchall()
        cursor.execute("SELECT * FROM Temperature WHERE noadmsip="+ noadmsip +" ORDER BY horodate DESC")
        Temperature = cursor.fetchall()
        cursor.execute("SELECT * FROM TeteLit WHERE noadmsip="+ noadmsip +" ORDER BY horodate DESC")
        TeteLit = cursor.fetchall()
        cursor.execute("SELECT * FROM Patient WHERE noadmsip="+ noadmsip +" ORDER BY horodate DESC")
        Patient = cursor.fetchall()
        allValues = [PPC, PICm, LICOX, Pupilles, PVCm, PAm, ETCO2, PaCO2, Glycemie, INR, Plaquettes, Temperature, TeteLit, Patient]
        PatientEncoder().encode(allValues)
        allValuesJSONData = json.dumps(allValues, indent=4, cls=PatientEncoder)
        return(allValuesJSONData)

    
    @app.route("/patients/<noadmsip>/kpis/<timeFrame>")
    def searchKpi(kpi, noadmsip, timeFrame):  
        target_datetime = datetime.datetime.fromtimestamp(int(timeFrame)/1000)
        cursor.execute("SELECT * FROM " + kpi +" WHERE noadmsip="+ noadmsip +" AND horodate > '" + str(target_datetime)[:19] +"' ORDER BY horodate DESC")     
        allValues = cursor.fetchall()
        PatientEncoder().encode(allValues)
        allValuesJSONData = json.dumps(allValues, indent=4, cls=PatientEncoder)
        return(allValuesJSONData)
    

    @app.route("/size")
    def get_db_size():  
        size = cursor.execute("SELECT pg_size_pretty(pg_database_size('"+ DB.NAME +"'));")
        return(size)

    @app.route("/cache/size")
    def getCacheSize():  
        file_name = "./Patients.db"
        file_stats = os.stat(file_name)
        size = file_stats.st_size / (1024 * 1024)
        PatientEncoder().encode(size)
        sizeJSONData = json.dumps(size, indent=4, cls=PatientEncoder)
        return(sizeJSONData)
    
    @app.route("/delete", methods=["DELETE"])
    def db_delete():
        cursor.execute("BEGIN;")
        cursor.execute("DROP TABLE IF EXISTS PPC;")
        cursor.execute("DROP TABLE IF EXISTS PICm;")
        cursor.execute("DROP TABLE IF EXISTS LICOX;")
        cursor.execute("DROP TABLE IF EXISTS Pupilles;")
        cursor.execute("DROP TABLE IF EXISTS PVCm;")
        cursor.execute("DROP TABLE IF EXISTS PAm;")
        cursor.execute("DROP TABLE IF EXISTS ETCO2;")
        cursor.execute("DROP TABLE IF EXISTS PaCO2;")
        cursor.execute("DROP TABLE IF EXISTS Glycemie;")
        cursor.execute("DROP TABLE IF EXISTS INR;")
        cursor.execute("DROP TABLE IF EXISTS Plaquettes;")
        cursor.execute("DROP TABLE IF EXISTS Temperature;")
        cursor.execute("DROP TABLE IF EXISTS TeteLit;")
        cursor.execute("DROP TABLE IF EXISTS Patient;")
        cursor.execute("COMMIT;")
        return(' all kpis deleted from database ! ')

    def update_patient(noadmsip):
        print(str(noadmsip))
        cursor.execute('SELECT noadmsip FROM Patient;')  
        allPatients = cursor.fetchall()
        print(allPatients)
        #Check if the patient already exists in the db
        cursor.execute('SELECT lastLoadingTime FROM Patient WHERE noadmsip ='+ noadmsip +';')  
        lastLoadingTime = cursor.fetchone()
        if lastLoadingTime is not None:
            print('not none')
            limitDate = lastLoadingTime[0].strftime('%Y-%m-%d %H:%M:%S')  # Convert to string
            dateNow = dateNow[0].strftime('%Y-%m-%d %H:%M:%S')  # Convert to string
            print('on se rend ici')
            print(limitDate)
            print(dateNow)
            cursor.execute("BEGIN;")
            cursor.execute("UPDATE Patient SET lastLoadingTime = %s WHERE noadmsip = %s;", (dateNow, noadmsip))
            cursor.execute("COMMIT;")

    # this is stored into my posgreSQL personal database created specificly for the developpement with a selected patient who was hospitalized in 2016

    # creates selected patinent info table

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    Patient(noadmsip INTEGER PRIMARY KEY, firstname TEXT, lastname TEXT, dateofbirth TIMESTAMP, gender TEXT, lifetimenumber INT, weight FLOAT, idealWeight FLOAT, height FLOAT, primarydiagnosis TEXT, lastLoadingTime TIMESTAMP)""")

    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_patient_noadmsip ON Patient (noadmsip)""")
    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_patient_lastLoadingTime ON Patient (lastLoadingTime)""")
    

    # 1. NEURO-MONITORING TARGETS

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    PPC(id INTEGER PRIMARY KEY, kpi TEXT, noadmsip INTEGER, value INTEGER, horodate TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip))""")

    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_vent_noadmsip ON PPC (noadmsip)""")
    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_vent_horodate ON PPC (horodate)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    PICm(id INTEGER PRIMARY KEY, kpi TEXT, noadmsip INTEGER, value INTEGER, horodate TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip))""")

    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_picm_noadmsip ON PICm (noadmsip)""")
    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_picm_horodate ON PICm (horodate)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    LICOX(id INTEGER PRIMARY KEY, kpi TEXT, noadmsip INTEGER, value FLOAT, unitofmeasure TEXT, horodate TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip))""")

    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_licox_noadmsip ON LICOX (noadmsip)""")
    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_licox_horodate ON LICOX (horodate)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    Pupilles(id INTEGER PRIMARY KEY, kpi TEXT, noadmsip INTEGER, value TEXT, state TEXT, horodate TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip))""")

    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_pupilles_noadmsip ON Pupilles (noadmsip)""")
    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_pupilles_horodate ON Pupilles (horodate)""")


    # 2. CARDIO-RESPIRATORY TARGETS

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    PVCm(id INTEGER PRIMARY KEY, kpi TEXT, noadmsip INTEGER, value FLOAT, horodate TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip))""")

    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_pvcm_noadmsip ON PVCm (noadmsip)""")
    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_pvcm_horodate ON PVCm (horodate)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    PAm(id INTEGER PRIMARY KEY, kpi TEXT, noadmsip INTEGER, value FLOAT, horodate TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip))""")

    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_pam_noadmsip ON PAm (noadmsip)""")
    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_pam_horodate ON PAm (horodate)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    ETCO2(id INTEGER PRIMARY KEY, kpi TEXT, noadmsip INTEGER, value FLOAT, horodate TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip))""")

    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_etco2_noadmsip ON ETCO2 (noadmsip)""")
    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_etco2_horodate ON ETCO2 (horodate)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    PaCO2(id INTEGER PRIMARY KEY, kpi TEXT, noadmsip INTEGER, value FLOAT, horodate TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip))""")

    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_paco2_noadmsip ON PaCO2 (noadmsip)""")
    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_paco2_horodate ON PaCO2 (horodate)""")


    # 3. LABORATORY MONITORING TARGETS

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    Glycemie(id INTEGER PRIMARY KEY, kpi TEXT, noadmsip INTEGER, value FLOAT, unitofmeasure TEXT, horodate TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip))""")

    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_glycemie_noadmsip ON Glycemie (noadmsip)""")
    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_glycemie_horodate ON Glycemie (horodate)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    INR(id INTEGER PRIMARY KEY, kpi TEXT, noadmsip INTEGER, value FLOAT, unitofmeasure TEXT, horodate TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip))""")

    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_inr_noadmsip ON INR (noadmsip)""")
    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_inr_horodate ON INR (horodate)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    Plaquettes(id INTEGER PRIMARY KEY, kpi TEXT, noadmsip INTEGER, value FLOAT, unitofmeasure TEXT, horodate TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip))""")

    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_plaquettes_noadmsip ON Plaquettes (noadmsip)""")
    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_plaquettes_horodate ON Plaquettes (horodate)""")

    # 4. GENERAL SUPPORT MONITORING TARGETS

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    TeteLit(id INTEGER PRIMARY KEY, kpi TEXT, noadmsip INTEGER, value TEXT, horodate TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip))""")

    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_tetelit_noadmsip ON TeteLit (noadmsip)""")
    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_tetelit_horodate ON TeteLit (horodate)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    Temperature(id INTEGER PRIMARY KEY, kpi TEXT, noadmsip INTEGER, value TEXT, unitofmeasure TEXT, horodate TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip))""")

    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_temp_noadmsip ON Temperature (noadmsip)""")
    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_temp_horodate ON Temperature (horodate)""")

    #Check if the patient already exists in the db
    cursor.execute('SELECT noadmsip FROM Patient WHERE noadmsip = 3563;')  
    patient = cursor.fetchone()
    
    if patient is None:
        print(' Inserting data into database ...')
        cursor.execute('''INSERT INTO Patient (noadmsip, firstname, lastname, dateofbirth, gender, lifetimenumber, weight, idealWeight, height, primarydiagnosis, lastLoadingTime) VALUES(3563, 'M', 'B', '2002-12-05', 'F', 2107336, 40, 0.0, 0.0, 'NA', '2023-07-30');''')
        cursor.execute("COMMIT;" )#end transaction
    

        folder_name = 'continu_data'
        tables = ['PPC', 'PICm', 'LICOX', 'Pupilles', 'PVCm', 'PAm', 'ETCO2', 'PaCO2', 'Glycemie', 'INR', 'Plaquettes', 'TeteLit', 'Temperature' ]

        for table in tables:
            df = pd.read_csv(f"./{folder_name}/{table}.csv")

            for index, row in df.iterrows():
                values = ', '.join(f"'{value}'" for value in row)
                if table == 'LICOX' or table == 'Glycemie' or table == 'Temperature' or table == 'INR' or table == 'Plaquettes':
                    cursor.execute(f"INSERT INTO {table} (id, kpi, noadmsip, value, unitofmeasure, horodate) VALUES ({values});")
                    cursor.execute("COMMIT;" )#end transaction
                elif table == 'Pupilles':
                    cursor.execute(f"INSERT INTO {table} (id, kpi, noadmsip, value, state, horodate) VALUES ({values});")
                    cursor.execute("COMMIT;" )#end transaction
                else:
                    cursor.execute(f"INSERT INTO {table} (id, kpi, noadmsip, value, horodate) VALUES ({values});")
                    cursor.execute("COMMIT;" )#end transaction
            
            print(f"all {table} data inserted in database")

except Exception as error:
    print(error)

""" finally:
    if cursor is not None:
        cursor.close()
    if connection is not None:
        connection.close() """

cors = CORS(app, resource = {
    r"/*":{
        "origins":"*"
    }
})
if __name__=="__main__":
    app.run(port=5000)