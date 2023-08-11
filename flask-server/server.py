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
import datetime
import pandas as pd
import psycopg2
import os
import DB
import csv
from utils.transformCsvFiles import *

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
        host = DB.HOST ,
        dbname =  DB.NAME,
        user =  DB.USERNAME,
        password =  DB.PASSWORD,
        port =  DB.PORT,
    )
    cursor = connection.cursor()

    if cursor is not None:
        print(' successfully connected to the pgAdmin database ! ')
    else:
        print(' not connected with database :( ')
 
    @app.route("/patients", methods=["DELETE"])
    def db_delete():
        cursor.execute("BEGIN;")
        cursor.execute("DELETE TABLE IF EXISTS PPC CASCADE;")
        cursor.execute("DROP TABLE IF EXISTS PICm CASCADE;")
        cursor.execute("DROP TABLE IF EXISTS LICOX CASCADE;")
        cursor.execute("DROP TABLE IF EXISTS Pupilles CASCADE;")
        cursor.execute("DROP TABLE IF EXISTS PVCm CASCADE;")
        cursor.execute("DROP TABLE IF EXISTS PAm CASCADE;")
        cursor.execute("DROP TABLE IF EXISTS ETCO2 CASCADE;")
        cursor.execute("DROP TABLE IF EXISTS PaCO2 CASCADE;")
        cursor.execute("DROP TABLE IF EXISTS Glycemie CASCADE;")
        cursor.execute("DROP TABLE IF EXISTS INR CASCADE;")
        cursor.execute("DROP TABLE IF EXISTS Plaquettes CASCADE;")
        cursor.execute("DROP TABLE IF EXISTS Temperature CASCADE;")
        cursor.execute("DROP TABLE IF EXISTS TeteLit CASCADE;")
        cursor.execute("DROP TABLE IF EXISTS PPCDeviation CASCADE;")
        cursor.execute("DROP TABLE IF EXISTS PICmDeviation CASCADE;")
        cursor.execute("DROP TABLE IF EXISTS LICOXDeviation CASCADE;")
        cursor.execute("DROP TABLE IF EXISTS PupillesDeviation CASCADE;")
        cursor.execute("DROP TABLE IF EXISTS PVCmDeviation CASCADE;")
        cursor.execute("DROP TABLE IF EXISTS PAmDeviation CASCADE;")
        cursor.execute("DROP TABLE IF EXISTS ETCO2Deviation CASCADE;")
        cursor.execute("DROP TABLE IF EXISTS PaCO2Deviation CASCADE;")
        cursor.execute("DROP TABLE IF EXISTS GlycemieDeviation CASCADE;")
        cursor.execute("DROP TABLE IF EXISTS INRDeviation CASCADE;")
        cursor.execute("DROP TABLE IF EXISTS PlaquettesDeviation CASCADE;")
        cursor.execute("DROP TABLE IF EXISTS TemperatureDeviation CASCADE;")
        cursor.execute("DROP TABLE IF EXISTS TeteLitDeviation CASCADE;")
        cursor.execute("DROP TABLE IF EXISTS Patient;")
        cursor.execute("COMMIT;")
        return(' all kpis deleted from database ! ')

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
            "PPC": fetch_kpis("PPC", noadmsip),
            "PICm": fetch_kpis("PICm", noadmsip),
            "LICOX": fetch_kpis("LICOX", noadmsip),
            "Pupilles": fetch_kpis("Pupilles", noadmsip),
            "PVCm": fetch_kpis("PVCm", noadmsip),
            "PAm": fetch_kpis("PAm", noadmsip),
            "ETCO2": fetch_kpis("ETCO2", noadmsip),
            "PaCO2": fetch_kpis("PaCO2", noadmsip),
            "Glycemie": fetch_kpis("Glycemie", noadmsip),
            "INR": fetch_kpis("INR", noadmsip),
            "Plaquettes": fetch_kpis("Plaquettes", noadmsip),
            "Temperature": fetch_kpis("Temperature", noadmsip),
            "TeteLit": fetch_kpis("TeteLit", noadmsip),
        }

        all_kpis_json_data = json.dumps(all_kpis, indent=4, cls=PatientEncoder)
        return all_kpis_json_data
    
    @app.route("/patient/noadmsip/<int:noadmsip>/kpis/<kpi>", methods=["GET"])
    def fetch_patient_kpi(noadmsip, kpi):
        kpi = { kpi: fetch_kpis(kpi, noadmsip) }

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
    
    @app.route("/patient/noadmsip/<int:noadmsip>/deviationScores", methods=["GET"])
    def get_patient_deviation_scores(noadmsip):
        all_kpis = {
            "PAm": fetch_deviation_scores("PAm", noadmsip),
            "ETCO2": fetch_deviation_scores("ETCO2", noadmsip),
            "Glycemie": fetch_deviation_scores("Glycemie", noadmsip)
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


    def fetch_kpis(table_name, noadmsip):
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
        

    def fetch_deviation_scores(kpi, noadmsip):
        try:
            # Execute the query
            cursor.execute(f"SELECT * FROM {kpi}Deviation  WHERE noadmsip={noadmsip};")

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
    Patient(noadmsip INTEGER PRIMARY KEY, firstname TEXT, lastname TEXT, dateofbirth DATE, gender TEXT, lifetimenumber INT, weight FLOAT, idealWeight FLOAT, height FLOAT, primarydiagnosis TEXT, intime TIMESTAMP, outtime TIMESTAMP, lastLoadingTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP)""")

    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_patient_noadmsip ON Patient (noadmsip)""")
    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_patient_lastLoadingTime ON Patient (lastLoadingTime)""")

    # creates the tables for kpis continious data

    # 1. NEURO-MONITORING TARGETS

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    PPC(id SERIAL PRIMARY KEY, kpi TEXT NOT NULL, noadmsip INTEGER, value INTEGER, horodate TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip) ON DELETE CASCADE)""")

    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_ppc_noadmsip ON PPC (noadmsip)""")
    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_ppc_horodate ON PPC (horodate)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    PICm(id SERIAL PRIMARY KEY, kpi TEXT NOT NULL, noadmsip INTEGER, value INTEGER, horodate TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip) ON DELETE CASCADE)""")

    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_picm_noadmsip ON PICm (noadmsip)""")
    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_picm_horodate ON PICm (horodate)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    LICOX(id SERIAL PRIMARY KEY, kpi TEXT, noadmsip INTEGER, value FLOAT, unitofmeasure TEXT, horodate TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip) ON DELETE CASCADE)""")

    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_licox_noadmsip ON LICOX (noadmsip)""")
    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_licox_horodate ON LICOX (horodate)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    Pupilles(id SERIAL PRIMARY KEY, kpi TEXT, noadmsip INTEGER, value TEXT, state TEXT, horodate TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip) ON DELETE CASCADE)""")

    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_pupilles_noadmsip ON Pupilles (noadmsip)""")
    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_pupilles_horodate ON Pupilles (horodate)""")
    
    # 2. CARDIO-RESPIRATORY TARGETS

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    PVCm(id SERIAL PRIMARY KEY, kpi TEXT NOT NULL, noadmsip INTEGER, value FLOAT, horodate TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip) ON DELETE CASCADE)""")

    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_pvcm_noadmsip ON PVCm (noadmsip)""")
    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_pvcm_horodate ON PVCm (horodate)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    PAm(id SERIAL PRIMARY KEY, kpi TEXT NOT NULL, noadmsip INTEGER, value FLOAT, horodate TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip) ON DELETE CASCADE)""")

    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_pam_noadmsip ON PAm (noadmsip)""")
    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_pam_horodate ON PAm (horodate)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    ETCO2(id SERIAL PRIMARY KEY, kpi TEXT NOT NULL, noadmsip INTEGER, value FLOAT, horodate TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip) ON DELETE CASCADE)""")

    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_etco2_noadmsip ON ETCO2 (noadmsip)""")
    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_etco2_horodate ON ETCO2 (horodate)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    PaCO2(id SERIAL PRIMARY KEY, kpi TEXT NOT NULL, noadmsip INTEGER, value FLOAT, horodate TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip) ON DELETE CASCADE)""")

    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_paco2_noadmsip ON PaCO2 (noadmsip)""")
    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_paco2_horodate ON PaCO2 (horodate)""")


    # 3. LABORATORY MONITORING TARGETS

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    Glycemie(kpi TEXT , noadmsip INTEGER, value FLOAT, unitofmeasure TEXT, horodate TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip))""")

    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_glycemie_noadmsip ON Glycemie (noadmsip)""")
    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_glycemie_horodate ON Glycemie (horodate)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    INR(kpi TEXT , noadmsip INTEGER, value FLOAT, unitofmeasure TEXT, horodate TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip) ON DELETE CASCADE)""")

    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_inr_noadmsip ON INR (noadmsip)""")
    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_inr_horodate ON INR (horodate)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    Plaquettes(kpi TEXT , noadmsip INTEGER, value FLOAT, unitofmeasure TEXT, horodate TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip) ON DELETE CASCADE)""")

    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_plaquettes_noadmsip ON Plaquettes (noadmsip)""")
    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_plaquettes_horodate ON Plaquettes (horodate)""")

    # 4. GENERAL SUPPORT MONITORING TARGETS

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    TeteLit(kpi TEXT, noadmsip INTEGER, value TEXT, horodate TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip) ON DELETE CASCADE)""")

    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_tetelit_noadmsip ON TeteLit (noadmsip)""")
    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_tetelit_horodate ON TeteLit (horodate)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    Temperature(kpi TEXT, noadmsip INTEGER, value TEXT, unitofmeasure TEXT, horodate TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip))""")

    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_temp_noadmsip ON Temperature (noadmsip)""")
    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_temp_horodate ON Temperature (horodate)""")

    # 2. create the deviation score tables for the 15 key point indicators (kpis) shown of interface

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    PPCDeviation(kpi TEXT NOT NULL, noadmsip INTEGER, scores INTEGER[], lastLoadingTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip) ON DELETE CASCADE)""")

    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_ppcdev_noadmsip ON PPC (noadmsip)""")
    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_ppc_kpi ON PPC (kpi)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    PICmDeviation(kpi TEXT NOT NULL, noadmsip INTEGER , scores INTEGER[], lastLoadingTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip) ON DELETE CASCADE)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    LICOXDeviationDeviation(kpi TEXT NOT NULL, noadmsip INTEGER , scores INTEGER[], lastLoadingTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip) ON DELETE CASCADE)""")

    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_licoxdev_noadmsip ON PPC (noadmsip)""")
    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_licox_kpi ON PPC (kpi)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    PupillesDeviation(kpi TEXT NOT NULL, noadmsip INTEGER, scores INTEGER[], lastLoadingTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip) ON DELETE CASCADE)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    PVCmDeviation(kpi TEXT NOT NULL, noadmsip INTEGER, scores INTEGER[], lastLoadingTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip) ON DELETE CASCADE)""")
    
    cursor.execute("""CREATE TABLE IF NOT EXISTS
    PAmDeviation(kpi TEXT NOT NULL, noadmsip INTEGER, scores INTEGER[], lastLoadingTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip) ON DELETE CASCADE)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    ETCO2Deviation(kpi TEXT NOT NULL, noadmsip INTEGER , scores INTEGER[], lastLoadingTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip) ON DELETE CASCADE)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    PaCO2Deviation(kpi TEXT NOT NULL, noadmsip INTEGER , scores INTEGER[], lastLoadingTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip) ON DELETE CASCADE)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    GlycemieDeviation(kpi TEXT NOT NULL, noadmsip INTEGER , scores INTEGER[], lastLoadingTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip) ON DELETE CASCADE)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    INRDeviation(kpi TEXT NOT NULL, noadmsip INTEGER , scores INTEGER[], lastLoadingTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip) ON DELETE CASCADE)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    PlaquettesDeviation(kpi TEXT NOT NULL, noadmsip INTEGER , scores INTEGER[], lastLoadingTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip) ON DELETE CASCADE)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    TeteLitDeviation(kpi TEXT NOT NULL, noadmsip INTEGER , scores INTEGER[], lastLoadingTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip) ON DELETE CASCADE)""")

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    TemperatureDeviation(kpi TEXT NOT NULL, noadmsip INTEGER , scores INTEGER[], lastLoadingTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip) ON DELETE CASCADE)""")
   

    #Check if the patient already exists in the db
    cursor.execute('SELECT noadmsip FROM Patient WHERE noadmsip=3563')  
    patients = cursor.fetchone()
    
    if patients is None:
        print(' Inserting data into database ...')
        cursor.execute('''INSERT INTO Patient (noadmsip, firstname, lastname, dateofbirth, gender, lifetimenumber, weight, idealWeight, height, primarydiagnosis, intime, outtime, lastLoadingTime) VALUES(3563, 'M', 'B', '2002-12-05', 'F', 2107336, 40, 0.0, 0.0, 'NA', '2016-03-12 00:58:00', '2016-03-18 12:00:00', CURRENT_TIMESTAMP);''')
        cursor.execute("COMMIT;" )#end transaction
    

        folder_name = 'continu_data'
        tables = ['PPC', 'PICm', 'LICOX', 'Pupilles', 'PVCm', 'PAm', 'ETCO2', 'PaCO2', 'Glycemie', 'INR', 'Plaquettes', 'TeteLit', 'Temperature' ]

        # continu data insertion
        for table in tables:
            df = pd.read_csv(f"./{folder_name}/{table}.csv")
            df = df.drop(df.columns[0], axis=1)

            for index, row in df.iterrows():
                values = ', '.join(f"'{value}'" for value in row)
                if table == 'LICOX' or table == 'Glycemie' or table == 'Temperature' or table == 'INR' or table == 'Plaquettes':
                    cursor.execute(f"INSERT INTO {table} (kpi, noadmsip, value, unitofmeasure, horodate) VALUES ({values});")
                    cursor.execute("COMMIT;" )#end transaction
                elif table == 'Pupilles':
                    cursor.execute(f"INSERT INTO {table} (kpi, noadmsip, value, state, horodate) VALUES ({values});")
                    cursor.execute("COMMIT;" )#end transaction
                else:
                    cursor.execute(f"INSERT INTO {table} (kpi, noadmsip, value, horodate) VALUES ({values});")
                    cursor.execute("COMMIT;" )#end transaction
            
            print(f"all {table} data inserted in database")

        # deviation insertion
        folder_name = 'deviation_data'
        tables = ['LICOX', 'Pupilles', 'ETCO2', 'Glycemie' ]
         # Deviation insertion
        folder = 'deviation_data'
        tables = ['PAm', 'ETCO2', 'Glycemie']

        for table in tables:
            # Open file 
            with open(f"./{folder}/{table}.csv") as file_obj:
                
                # Create reader object by passing the file 
                # object to reader method
                reader_obj = csv.reader(file_obj, delimiter=';')
                
                # Iterate over each row in the csv 
                # file using reader object to format into the posgreSQL database
                for row in reader_obj:
                    int_row = [int(element) for element in row[1:]]
                    cursor.execute(f"INSERT INTO {table}Deviation (kpi, noadmsip, scores) VALUES ('{table}', {row[0]}, ARRAY{int_row});")
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