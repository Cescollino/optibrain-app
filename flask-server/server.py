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
        try:
            cursor.execute("BEGIN;")

            # List of table names to be deleted
            table_names = [
                "PPC", "PICm", "LICOX", "Pupilles", "PVCm", "PAm",
                "ETCO2", "PaCO2", "Glycemie", "INR", "Plaquettes",
                "Temperature", "TeteLit", "PPCDeviation", "PICmDeviation",
                "LICOXDeviation", "PupillesDeviation", "PVCmDeviation",
                "PAmDeviation", "ETCO2Deviation", "PaCO2Deviation",
                "GlycemieDeviation", "INRDeviation", "PlaquettesDeviation",
                "TemperatureDeviation", "TeteLitDeviation", "Patient"
            ]

            for table_name in table_names:
                cursor.execute(f"DROP TABLE IF EXISTS {table_name} CASCADE;")

            cursor.execute("COMMIT;")
            return "All tables deleted from the database!"
    
        except Exception as e:
            cursor.execute("ROLLBACK;")
            return f"Error deleting tables: {e}"

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
        all_kpis = [
            fetch_patient_kpi(noadmsip, "PPC" ),
            fetch_patient_kpi(noadmsip, "PICm" ),
            # fetch_patient_kpi("LICOX", noadmsip),
            # fetch_patient_kpi("Pupilles", noadmsip),
            # fetch_patient_kpi("PVCm", noadmsip),
            # fetch_patient_kpi("PAm", noadmsip),
            # fetch_patient_kpi("ETCO2", noadmsip),
            # fetch_patient_kpi("PaCO2", noadmsip),
            # fetch_patient_kpi("Glycemie", noadmsip),
            # fetch_patient_kpi("INR", noadmsip),
            # fetch_patient_kpi("Plaquettes", noadmsip),
            # fetch_patient_kpi("Temperature", noadmsip),
            # fetch_patient_kpi("TeteLit", noadmsip),
        ]

        return all_kpis
    
    @app.route("/patient/noadmsip/<int:noadmsip>/kpis/<kpi>", methods=["GET"])
    def fetch_patient_kpi(noadmsip, kpi):
        kpi = { kpi: fetch_kpis(kpi, noadmsip) }

        kpi_json_data = json.dumps(kpi, indent=4, cls=PatientEncoder)
        return  kpi_json_data

    @app.route("/patient/noadmsip/<int:noadmsip>/kpis/timeFrames/<int:timeframe>", methods=["GET"])
    def get_patient_time(noadmsip, time_frame):
        time_frame_to_datetime = timedelta(hours=float(time_frame))
        time_frame = dateNow -  time_frame_to_datetime
        time_frame = time_frame.strftime('%Y-%m-%d %H:%M:%S')

        all_kpis = [
            fetch_kpis_time("PPC", noadmsip, time_frame),
            fetch_kpis_time("PICm", noadmsip, time_frame),
            fetch_kpis_time("LICOX", noadmsip, time_frame),
            fetch_kpis_time("Pupilles", noadmsip, time_frame),
            fetch_kpis_time("PVCm", noadmsip, time_frame),
            fetch_kpis_time("PAm", noadmsip, time_frame),
            fetch_kpis_time("ETCO2", noadmsip, time_frame),
            fetch_kpis_time("PaCO2", noadmsip, time_frame),
            fetch_kpis_time("Glycemie", noadmsip, time_frame),
            fetch_kpis_time("INR", noadmsip, time_frame),
            fetch_kpis_time("Plaquettes", noadmsip, time_frame),
            fetch_kpis_time("Temperature", noadmsip, time_frame),
            fetch_kpis_time("TeteLit", noadmsip, time_frame),
        ]

        return all_kpis
    
    @app.route("/patient/noadmsip/<int:noadmsip>/deviationScores", methods=["GET"])
    def get_patient_deviation_scores(noadmsip):
        kpi = { fetch_deviation_scores("PAm", noadmsip) }
        kpis = json.dumps(kpi, indent=4, cls=PatientEncoder)
        return kpis

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


    def fetch_all(cursor):
        # Fetch all rows from the query result
        rows = cursor.fetchall()
        # Get the column names to use as keys for the dictionaries
        column_names = [desc[0] for desc in cursor.description]
        # Convert the rows into a list of dictionaries
        data = [dict(zip(column_names, row)) for row in rows]
        return json.dumps(data, indent=4, cls=PatientEncoder)

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


    def fetch_kpis_time(cursor, table_name, noadmsip, timeframe):
        try:
            cursor.execute(f"SELECT * FROM {table_name} WHERE noadmsip=%s AND horodate > %s ORDER BY horodate DESC;", (noadmsip, timeframe))
            fetch_all()
        except Exception as e:
            print("Error executing SQL query:", str(e))
            raise e
        

    def fetch_deviation_scores(kpi, noadmsip):
        try:
            cursor.execute(f"SELECT * FROM {kpi}Deviation WHERE noadmsip={noadmsip};")
            fetch_all(cursor)
        except Exception as e:
            print("Error executing SQL query:", str(e))
            raise e
    
    # cursor.execute("BEGIN;")

    # # List of table names to be deleted
    # table_names = [
    #     "PPC", "PICm", "LICOX", "Pupilles", "PVCm", "PAm",
    #     "ETCO2", "PaCO2", "Glycemie", "INR", "Plaquettes",
    #     "Temperature", "TeteLit", "PPCDeviation", "PICmDeviation",
    #     "LICOXDeviation", "PupillesDeviation", "PVCmDeviation",
    #     "PAmDeviation", "ETCO2Deviation", "PaCO2Deviation",
    #     "GlycemieDeviation", "INRDeviation", "PlaquettesDeviation",
    #     "TemperatureDeviation", "TeteLitDeviation", "Patient"
    # ]

    # for table_name in table_names:
    #     cursor.execute(f"DROP TABLE IF EXISTS {table_name} CASCADE;")

    # cursor.execute("COMMIT;")
    # print("All tables deleted from the database!")

    # 1. creates patient info table

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    Patient(noadmsip INTEGER PRIMARY KEY, firstName TEXT, lastName TEXT, dateOfBirth DATE, gender TEXT, lifetimenumber INT, weight FLOAT, idealWeight FLOAT, height FLOAT, primaryDiagnosis TEXT, inTime TIMESTAMP, outTime TIMESTAMP, lastLoadingTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP)""")

    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_patient_noadmsip ON Patient (noadmsip)""")
    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_patient_lastLoadingTime ON Patient (lastLoadingTime)""")
    cursor.execute("COMMIT;")

    # creates the tables for kpis continuous data

    # Define target categories with their columns
    continuous_kpis = [
        ("PPC", ["kpi TEXT NOT NULL", "value INTEGER"]),
        ("PICm", ["kpi TEXT NOT NULL", "value INTEGER"]),
        ("LICOX", ["kpi TEXT", "value FLOAT", "unitOfMeasure TEXT"]),
        ("Pupilles", ["kpi TEXT", "value TEXT", "state TEXT"]),
        ("PVCm", ["kpi TEXT NOT NULL", "value FLOAT"]),
        ("PAm", ["kpi TEXT NOT NULL", "value FLOAT"]),
        ("ETCO2", ["kpi TEXT NOT NULL", "value FLOAT"]),
        ("PaCO2", ["kpi TEXT NOT NULL", "value FLOAT"]),
        ("Glycemie", ["kpi TEXT", "value FLOAT", "unitOfMeasure TEXT"]),
        ("INR", ["kpi TEXT", "value FLOAT", "unitOfMeasure TEXT"]),
        ("Plaquettes", ["kpi TEXT", "value FLOAT", "unitOfMeasure TEXT"]),
        ("TeteLit", ["kpi TEXT", "value TEXT"]),
        ("Temperature", ["kpi TEXT", "value TEXT", "unitOfMeasure TEXT"])
    ]

    def create_continuous_kpis_table(cursor, table_name, columns):
        try:
            create_query = f"""
                CREATE TABLE IF NOT EXISTS {table_name} (
                    id SERIAL PRIMARY KEY,
                    noadmsip INTEGER,
                    {', '.join(columns)},
                    horodate TIMESTAMP,
                    lastLoadingTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip) ON DELETE CASCADE
                )
            """
            cursor.execute(create_query)
            print(f"Table {table_name} created successfully.")
        except Exception as e:
            print(f"Error creating table {table_name}: {e}")

    def create_target_indexes(cursor, table_name):
        try:
            cursor.execute(f"CREATE INDEX IF NOT EXISTS idx_{table_name.lower()}_noadmsip ON {table_name} (noadmsip)")
            cursor.execute(f"CREATE INDEX IF NOT EXISTS idx_{table_name.lower()}_horodate ON {table_name} (horodate)")
        except Exception as e:
            print(f"Error creating indexes for {table_name}: {e}")

    # Create target tables and indexes
    for table_name, columns in continuous_kpis:
        create_continuous_kpis_table(cursor, table_name, columns)
        create_target_indexes(cursor, table_name)

    # Commit changes
    connection.commit()


    # Create threshold deviation score tables for the 15 key point indicators (kpis)

    # List of key point indicators (kpis)
    kpis = [
        "PPC", "PICm", "LICOX", "Pupilles", "PVCm", "PAm",
        "ETCO2", "PaCO2", "Glycemie", "INR", "Plaquettes",
        "TeteLit", "Temperature"
    ]

    def create_deviation_table(cursor, table_name):
        try:
            create_query = f"""
                CREATE TABLE IF NOT EXISTS {table_name}Deviation (
                    id SERIAL PRIMARY KEY,
                    kpi TEXT NOT NULL,
                    noadmsip INTEGER,
                    score INTEGER,
                    hour INTEGER,
                    lastLoadingTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip) ON DELETE CASCADE
                )
            """
            cursor.execute(create_query)
            print(f"Table {table_name}Deviation created successfully.")
        except Exception as e:
            print(f"Error creating table {table_name}Deviation: {e}")

    def create_deviation_indexes(cursor, table_name):
        try:
            cursor.execute(f"CREATE INDEX IF NOT EXISTS idx_{table_name.lower()}dev_noadmsip ON {table_name}Deviation (noadmsip)")
            cursor.execute(f"CREATE INDEX IF NOT EXISTS idx_{table_name.lower()}_kpi ON {table_name}Deviation (kpi)")
        except Exception as e:
            print(f"Error creating indexes for {table_name}Deviation: {e}")
    
    # Create deviation tables and indexes
    for kpi in kpis:
        create_deviation_table(cursor, kpi)
        create_deviation_indexes(cursor, kpi)

    # Commit changes
    connection.commit()
    
    
    #Check if the patient already exists in the db
    cursor.execute('SELECT noadmsip FROM Patient WHERE noadmsip=3563')  
    patients = cursor.fetchone()
    
    if patients is None:
        print(' Inserting data into database ...')
        cursor.execute('''INSERT INTO Patient (noadmsip, firstName, lastName, dateOfBirth, gender, lifeTimeNumber, weight, idealWeight, height, primaryDiagnosis, inTime, outTime, lastLoadingTime) VALUES(3563, 'M', 'B', '2002-12-05', 'F', 2107336, 40, 0.0, 0.0, 'NA', '2016-03-12 00:58:00', '2016-03-18 12:00:00', CURRENT_TIMESTAMP);''')
        cursor.execute("COMMIT;" )#end transaction
    

        folder_name = 'continuous_data'
        tables = ['PPC', 'PICm', 'LICOX', 'Pupilles', 'PVCm', 'PAm', 'ETCO2', 'PaCO2', 'Glycemie', 'INR', 'Plaquettes', 'TeteLit', 'Temperature' ]

        # continu data insertion
        for table in tables:
            df = pd.read_csv(f"./{folder_name}/{table}.csv")
            df = df.drop(df.columns[0], axis=1)

            for index, row in df.iterrows():
                values = ', '.join(f"'{value}'" for value in row)
                if table == 'LICOX' or table == 'Glycemie' or table == 'Temperature' or table == 'INR' or table == 'Plaquettes':
                    cursor.execute(f"INSERT INTO {table} (kpi, noadmsip, value, unitOfMeasure, horodate) VALUES ({values});")
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
                    for index, element in enumerate(row[1:]):
                        cursor.execute(f"INSERT INTO {table}Deviation (kpi, noadmsip, score, hour, lastLoadingTime) VALUES ('{table}', {row[0]}, {element}, {index}, CURRENT_TIMESTAMP);")
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