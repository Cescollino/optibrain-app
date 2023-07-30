import psycopg2
from flask import Flask, render_template, request, redirect, url_for
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


# variables = ['PPC', 'PICm', 'PVCm', 'PAm', 'Patient_Test_Resuslts', 'multi_var', 'licox_icca', 'licox_continu', 'lab_var', 'etco2_continu']
""" 
variables = ['PPC', 'PICm']

for var in variables:
    df = pd.read_csv(f"./csv_sally/{var}.csv")

    insert_statements = []
    table_name = var

    for index, row in df.iterrows():
        values = ', '.join(f"'{value}'" for value in row)
        insert_statement = f"INSERT INTO {table_name} VALUES ({values});"
        insert_statements.append(insert_statement)

    for statement in insert_statements:
        print(statement) """

# 1. Execute the virtual environment : source .venv/bin/activate
# 2. Install the requiered packages : pip install -r requirements.txt

DB_USERNAME="marmar38"
DB_PASSWORD="e2b63Fn072$e"
DB_HOST="coder-marmar38-jade-postgres"
DB_NAME="marmar38"
DB_PORT=5432

app = Flask(__name__)

try:
    connection = psycopg2.connect(
        host = DB_HOST,
        dbname = DB_NAME,
        user = DB_USERNAME,
        password = DB_PASSWORD,
        port = DB_PORT
    )
    cursor = connection.cursor()

    if cursor is not None:
        print(' successfully connected to the pgAdmin database ')
    else:
        print('not connected with database :( ')


    # this is to store into my posgreSQL personal database created specificly for the developpement with a selected patient who was hospitalized in 2016

    # creates selected patinent info table
    dateNow = datetime.datetime.now()

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    Patient(noadmsip INTEGER PRIMARY KEY, firstname TEXT, lastname TEXT, dateofbirth TEXT, gender TEXT, lifetimenumber INT, weight FLOAT, idealWeight FLOAT, height FLOAT, primarydiagnosis TEXT, lastLoadingTime TEXT)""")

    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_patient_noadmsip ON Patient (noadmsip)""")
    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_patient_lastLoadingTime ON Patient (lastLoadingTime)""")

    # 1. NEURO-MONITORING TARGETS

    cursor.execute("""CREATE TABLE IF NOT EXISTS
    PPC(id INTEGER PRIMARY KEY, noadmsip INTEGER, name TEXT, value INTEGER, datevariable TIMESTAMP, FOREIGN KEY(noadmsip) REFERENCES Patient(noadmsip))""")

    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_ppc_noadmsip ON PPC (noadmsip)""")
    cursor.execute("""CREATE INDEX IF NOT EXISTS idx_ppc_datevariable ON PPC (datevariable)""")
    
    #Check if the patient already exists in the db
    cursor.execute('SELECT noadmsip FROM Patients WHERE noadmsip = 3563;')  
    patient = cursor.fetchone()
    
    if patient is not None:
        cursor.execute('''INSERT INTO Patient (noadmsip, firstname, lastname, dateofbirth, gender, lifetimenumber, weight, idealWeight, height, primarydiagnosis, lastLoadingTime) VALUES(3563, 'M', 'B', '2002-12-05', 'F', 2107336, 40, 0.0, 0.0, 'NA', '2023-07-30');''')
        cursor.execute("COMMIT;" )#end transaction

        df = pd.read_csv(f"./csv_sally/PPC.csv")
        table_name = 'PPC'

        for index, row in df.iterrows():
            values = ', '.join(f"'{value}'" for value in row)
            cursor.execute(f"INSERT INTO PPC (id, noadmsip, name, value, datevariable) VALUES ({values});")
            cursor.execute("COMMIT;" )#end transaction

except Exception as error:
    print(error)

finally:
    if cursor is not None:
        cursor.close()
    if connection is not None:
        connection.close()


