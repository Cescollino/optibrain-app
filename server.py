import psycopg2
from flask import Flask
from flask_cors import CORS
import datetime
from datetime import timedelta
import json
from json import JSONEncoder
from dateutil.relativedelta import relativedelta
import re
import sqlite3
import os
import constants
import datetime
import pandas as pd
import psycopg2
import os
import constants


class PatientEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, (datetime.datetime, datetime.date)):
            return obj.isoformat()
        return super().default(obj)

app = Flask(__name__)

dateNow = datetime.datetime.now()
dateNow = datetime.datetime(2016, 3, 17, 18, 19, 47)

try:
    connection = psycopg2.connect(
        host = constants.DB_HOST ,
        dbname = constants.DB_NAME,
        user = constants.DB_USERNAME,
        password = constants.DB_PASSWORD,
        port = constants.DB_PORT,
    )
    cursor = connection.cursor()

    if cursor is not None:
        print(' successfully connected to the pgAdmin database ! ')
    else:
        print(' not connected with database :( ')

    @app.route("/", methods=["GET"])
    def index():
        return { "obtibrain api": "optibrain appliation flask-server" }
    
    # define routes to get the patients data from PostgreSQL
    @app.route('/patients', methods=["GET"])
    def fetchAllPatients():
        try:
            cursor.execute(f"SELECT * FROM Patient;")
            # Fetch all the rows as a list of tuples
            rows = cursor.fetchall()
            # Get the column names to use as keys for the dictionaries
            column_names = [desc[0] for desc in cursor.description]
            # Convert the patients list of tuples into a list of dictionaries
            data = [dict(zip(column_names, row)) for row in rows]
                # Convert the dictionaries patients list into a JSON list
            patients = json.dumps(data, indent=4, cls=PatientEncoder)
            return patients
        except Exception as e:
            # Log the error message for debugging
            print("Error executing SQL query:", str(e))
            # Optionally, raise the exception to propagate it further
            raise e

    @app.route("/patient/noadmsip/<int:noadmsip>", methods=["GET"])
    def searchPatient(noadmsip):   
        try:
            cursor.execute(f"SELECT * FROM Patient WHERE noadmsip={noadmsip};")
            # Fetch all the rows as a list of tuples
            # Get the column names to use as keys for the dictionary
            column_names = [desc[0] for desc in cursor.description]
            # Fetch the first row from the query result
            row = cursor.fetchone()
            # Convert the row into a dictionary
            data = dict(zip(column_names, row))
                # Convert the dictionaries patients list into a JSON list
            patient = json.dumps(data, indent=4, cls=PatientEncoder)
            return patient
        except Exception as e:
            # Log the error message for debugging
            print("Error executing SQL query:", str(e))
            # Optionally, raise the exception to propagate it further
            raise e

    @app.route("/patient/noadmsip/<int:noadmsip>/kpis", methods=["GET"])
    def get_patient_kpis(noadmsip):
        all_kpis = {
            "PPC": fetch_kpis_from_database("PPC", noadmsip),
            "PICm": fetch_kpis_from_database("PICm", noadmsip),
            "LICOX": fetch_kpis_from_database("LICOX", noadmsip),
            "Pupilles": fetch_kpis_from_database("Pupilles", noadmsip),
            "PVCm": fetch_kpis_from_database("PVCm", noadmsip),
            "PAm": fetch_kpis_from_database("PAm", noadmsip),
            "ETCO2": fetch_kpis_from_database("ETCO2", noadmsip),
            "PaCO2": fetch_kpis_from_database("PaCO2", noadmsip),
            "Glycemie": fetch_kpis_from_database("Glycemie", noadmsip),
            "INR": fetch_kpis_from_database("INR", noadmsip),
            "Plaquettes": fetch_kpis_from_database("Plaquettes", noadmsip),
            "Temperature": fetch_kpis_from_database("Temperature", noadmsip),
            "TeteLit": fetch_kpis_from_database("TeteLit", noadmsip),
        }

        all_kpis_json_data = json.dumps(all_kpis, indent=4, cls=PatientEncoder)
        return all_kpis_json_data
    
    @app.route("/patient/noadmsip/<int:noadmsip>/kpis/<kpi>", methods=["GET"])
    def fetch_patient_kpi(noadmsip, kpi):
        kpi = { kpi: fetch_kpis_from_database(kpi, noadmsip) }

        kpi_json_data = json.dumps(kpi, indent=4, cls=PatientEncoder)
        return  kpi_json_data

    @app.route("/patient/noadmsip/<int:noadmsip>/kpis/timeFrames/<int:timeframe>", methods=["GET"])
    def get_patient_time(noadmsip, timeframe):
        timeframe_to_datetime = timedelta(hours=float(timeframe))
        timeframe = dateNow -  timeframe_to_datetime
        timeframe = timeframe.strftime('%Y-%m-%d %H:%M:%S')

        all_kpis = {
            "PPC": fetch_kpis_time("PPC", noadmsip, timeframe),
            "PICm": fetch_kpis_time("PICm", noadmsip, timeframe),
            "LICOX": fetch_kpis_time("LICOX", noadmsip, timeframe),
            "Pupilles": fetch_kpis_time("Pupilles", noadmsip, timeframe),
            "PVCm": fetch_kpis_time("PVCm", noadmsip, timeframe),
            "PAm": fetch_kpis_time("PAm", noadmsip, timeframe),
            "ETCO2": fetch_kpis_time("ETCO2", noadmsip, timeframe),
            "PaCO2": fetch_kpis_time("PaCO2", noadmsip, timeframe),
            "Glycemie": fetch_kpis_time("Glycemie", noadmsip, timeframe),
            "INR": fetch_kpis_time("INR", noadmsip, timeframe),
            "Plaquettes": fetch_kpis_time("Plaquettes", noadmsip, timeframe),
            "Temperature": fetch_kpis_time("Temperature", noadmsip, timeframe),
            "TeteLit": fetch_kpis_time("TeteLit", noadmsip, timeframe),
        }

        all_kpis_json_data = json.dumps(all_kpis, indent=4, cls=PatientEncoder)
        return all_kpis_json_data

    @app.route("/db/size", methods=["GET"])
    def get_db_size():  
        size = cursor.execute("SELECT pg_size_pretty(pg_database_size('"+ os +"'));")
        return(size)

    @app.route("/cache/size", methods=["GET"])
    def getCacheSize():  
        file_name = "./Patients.db"
        file_stats = os.stat(file_name)
        size = file_stats.st_size / (1024 * 1024)
        PatientEncoder().encode(size)
        sizeJSONData = json.dumps(size, indent=4, cls=PatientEncoder)
        return(sizeJSONData)

    @app.route("/patients", methods=["DELETE"])
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
            print(limitDate)
            print(dateNow)
            cursor.execute("BEGIN;")
            cursor.execute("UPDATE Patient SET lastLoadingTime = %s WHERE noadmsip = %s;", (dateNow, noadmsip))
            cursor.execute("COMMIT;")


    def fetch_kpis_from_database(table_name, noadmsip):
        try:
            # Execute the query
            cursor.execute(f"SELECT * FROM {table_name} WHERE noadmsip={noadmsip} ORDER BY horodate DESC;")

            # Fetch all rows from the query result
            rows = cursor.fetchall()

            # Get the column names to use as keys for the dictionaries
            column_names = [desc[0] for desc in cursor.description]

            # Convert the rows into a list of dictionaries
            data = [dict(zip(column_names, row)) for row in rows]
            return data
        except Exception as e:
            # Log the error message for debugging
            print("Error executing SQL query:", str(e))
            # Optionally, raise the exception to propagate it further
            raise e

    def fetch_kpis_time(table_name, noadmsip, timeframe):
        try:
            # Execute the query
            cursor.execute(f"SELECT * FROM {table_name} WHERE noadmsip=%s AND horodate > %s ORDER BY horodate DESC;", (noadmsip, timeframe))

            # Fetch all rows from the query result
            rows = cursor.fetchall()

            # Get the column names to use as keys for the dictionaries
            column_names = [desc[0] for desc in cursor.description]

            # Convert the rows into a list of dictionaries
            data = [dict(zip(column_names, row)) for row in rows]
            return data
        except Exception as e:
            # Log the error message for debugging
            print("Error executing SQL query:", str(e))
            # Optionally, raise the exception to propagate it further
            raise e
          # 1. creates patinent info table

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    Patient(noadmsip INTEGER PRIMARY KEY, firstname TEXT, lastname TEXT, dateofbirth TIMESTAMP, gender TEXT, lifetimenumber INT, weight FLOAT, idealWeight FLOAT, height FLOAT, primarydiagnosis TEXT, intime TIMESTAMP, outtime TIMSTAMP, lastLoadingTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP)""")

    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_patient_noadmsip ON Patient (noadmsip)""")
    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_patient_lastLoadingTime ON Patient (lastLoadingTime)""")

    # 2. create the deviation score tables for the 15 key point indicators (kpis) shown of interface

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    PPCDeviation(id INTEGER PRIMARY KEY, kpi TEXT NOT NULL, hour TEXT NOT NULL, score INTEGER, FOREIGN KEY(kpi) REFERENCES PPC(kpi)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    PICmDeviation(id INTEGER PRIMARY KEY, kpi TEXT NOT NULL, hour TEXT NOT NULL, score INTEGER, lastLoadingTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP FOREIGN KEY(kpi) REFERENCES PICm(kpi)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    LICOXDeviationDeviation(id INTEGER PRIMARY KEY, kpi TEXT NOT NULL, hour TEXT NOT NULL, score INTEGER, lastLoadingTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP FOREIGN KEY(kpi) REFERENCES LICOX(kpi)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    PupillesDeviation(id INTEGER PRIMARY KEY, kpi TEXT NOT NULL, hour TEXT NOT NULL, score INTEGER, lastLoadingTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP FOREIGN KEY(kpi) REFERENCES Pupilles(kpi)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    PVCmDeviation(id INTEGER PRIMARY KEY, kpi TEXT NOT NULL, hour TEXT NOT NULL, score INTEGER, lastLoadingTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(kpi) REFERENCES PVCm(kpi)""")
    
    cursor.execute("""CREATE TABLE IF NOT EXISTS
    PAmDeviation(id INTEGER PRIMARY KEY, kpi TEXT NOT NULL, hour TEXT NOT NULL, score INTEGER, lastLoadingTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(kpi) REFERENCES PAm(kpi)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    ETCO2Deviation(id INTEGER PRIMARY KEY, kpi TEXT NOT NULL, hour TEXT NOT NULL, score INTEGER, lastLoadingTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(kpi) REFERENCES ETCO2(kpi)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    PaCO2Deviation(id INTEGER PRIMARY KEY, kpi TEXT NOT NULL, hour TEXT NOT NULL, score INTEGER, lastLoadingTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(kpi) REFERENCES PaCO2(kpi)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    GlycemieDeviation(id INTEGER PRIMARY KEY, kpi TEXT NOT NULL, hour TEXT NOT NULL, score INTEGER, lastLoadingTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(kpi) REFERENCES Glycemie(kpi)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    INRDeviation(id INTEGER PRIMARY KEY, kpi TEXT NOT NULL, hour TEXT NOT NULL, score INTEGER, lastLoadingTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(kpi) REFERENCES INR(kpi)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    PlaquettesDeviation(id INTEGER PRIMARY KEY, kpi TEXT NOT NULL, hour TEXT NOT NULL, score INTEGER, lastLoadingTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(kpi) REFERENCES Plaquettes(kpi)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    TeteLitDeviation(id INTEGER PRIMARY KEY, kpi TEXT NOT NULL, hour TEXT NOT NULL, score INTEGER, lastLoadingTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(kpi) REFERENCES TeteLit(kpi)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    TemperatureDeviation(id INTEGER PRIMARY KEY, kpi TEXT NOT NULL, hour TEXT NOT NULL, score INTEGER, lastLoadingTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(kpi) REFERENCES Temperature(kpi)""")
   
    # creates the tables for kpis continious data

    # 1. NEURO-MONITORING TARGETS

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    PPC(id INTEGER PRIMARY KEY, kpi TEXT, noadmsip INTEGER, value INTEGER, horodate TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip))""")

    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_ppc_noadmsip ON PPC (noadmsip)""")
    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_ppc_horodate ON PPC (horodate)""")

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
    cursor.execute('SELECT noadmsip FROM Patient')  
    patients = cursor.fetchone()
    
    if patients is None:
        print(' Inserting data into database ...')
        cursor.execute('''INSERT INTO Patient (noadmsip, firstname, lastname, dateofbirth, gender, lifetimenumber, weight, idealWeight, height, primarydiagnosis, intime, outtime, lastLoadingTime) VALUES(3563, 'M', 'B', '2002-12-05', 'F', 2107336, 40, 0.0, 0.0, 'NA', CURRENT_TIMESTAMP);''')
        cursor.execute("COMMIT;" )#end transaction
    

        folder_name = 'continu_data'
        tables = ['PPC', 'PICm', 'LICOX', 'Pupilles', 'PVCm', 'PAm', 'ETCO2', 'PaCO2', 'Glycemie', 'INR', 'Plaquettes', 'TeteLit', 'Temperature' ]

        # continu data insertion
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

        # deviation insertion
        folder_name = 'deviation_data'
        tables = ['LICOX', 'Pupilles', 'ETCO2', 'Glycemie' ]
        
        for table in tables:
            df = pd.read_csv(f"./{folder_name}/{table}.csv")

            for index, row in df.iterrows():
                values = ', '.join(f"'{value}'" for value in row)
                
                cursor.execute(f"INSERT INTO {table}Deviation (id, kpi, hour TEXT NOT NULL, score, lastloadingtime, VALUES ({values});")
                cursor.execute("COMMIT;" )#end transaction
            
            print(f"all {table} data inserted in database")
        
except Exception as error:
    print(error)

cors = CORS(app, resource = {
r"/*":{
    "origins":"*"
}
})

if __name__=="__main__":
    app.run(port=5000)