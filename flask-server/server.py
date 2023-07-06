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

#/home/kasm-user/cathydb.sh
connection = sqlite3.connect('/home/kasm-user/Desktop/Downloads/Patients.db', check_same_thread=False)

cursor = connection.cursor()

#create patinent info table

cursor.execute("""CREATE TABLE IF NOT EXISTS
Patients(noadmsip INTEGER PRIMARY KEY, fistname TEXT, lastname TEXT, age TEXT, gender TEXT, lifetimenb INT, weight FLOAT, idealWeight FLOAT, height FLOAT, lastLoadingTime DATETIME)""")

cursor.execute("""CREATE INDEX IF NOT EXISTS idx_patients_noadmsip ON Patients (noadmsip)""")
cursor.execute("""CREATE INDEX IF NOT EXISTS idx_patients_lastLoadingTime ON Patients (lastLoadingTime)""")


# create table for global scores

cursor.execute("""CREATE TABLE IF NOT EXISTS
ScoreGlobal(mesure_id INTEGER PRIMARY KEY AUTOINCREMENT, noadmsip INTEGER, value INTEGER, horodate DATETIME, FOREIGN KEY(noadmsip) REFERENCES Patients(noadmsip))""")

cursor.execute("""CREATE INDEX IF NOT EXISTS idx_global_noadmsip ON ScoreGlobal (noadmsip)""")
cursor.execute("""CREATE INDEX IF NOT EXISTS idx_global_horodate ON ScoreGlobal (horodate)""")

cursor.execute("""CREATE TABLE IF NOT EXISTS
EtatNeurologique(mesure_id INTEGER PRIMARY KEY AUTOINCREMENT, noadmsip INTEGER, value INTEGER, horodate DATETIME, FOREIGN KEY(noadmsip) REFERENCES Patients(noadmsip))""")

cursor.execute("""CREATE INDEX IF NOT EXISTS idx_neuro_noadmsip ON EtatNeurologique (noadmsip)""")
cursor.execute("""CREATE INDEX IF NOT EXISTS idx_neuro_horodate ON EtatNeurologique (horodate)""")

cursor.execute("""CREATE TABLE IF NOT EXISTS
Glasgow(mesure_id INTEGER PRIMARY KEY AUTOINCREMENT, noadmsip INTEGER, value INTEGER, horodate DATETIME, FOREIGN KEY(noadmsip) REFERENCES Patients(noadmsip))""")

cursor.execute("""CREATE INDEX IF NOT EXISTS idx_glasgow_noadmsip ON Glasgow (noadmsip)""")
cursor.execute("""CREATE INDEX IF NOT EXISTS idx_glasgow_horodate ON Glasgow (horodate)""")

# create table for each adherence monitoring category

# 1. NEURO-MONITORING TARGETS

cursor.execute("""CREATE TABLE IF NOT EXISTS
PPC(mesure_id INTEGER PRIMARY KEY AUTOINCREMENT, noadmsip INTEGER, value INTEGER, horodate DATETIME, FOREIGN KEY(noadmsip) REFERENCES Patients(noadmsip))""")

cursor.execute("""CREATE INDEX IF NOT EXISTS idx_vent_noadmsip ON PPC (noadmsip)""")
cursor.execute("""CREATE INDEX IF NOT EXISTS idx_vent_horodate ON PPC (horodate)""")

cursor.execute("""CREATE TABLE IF NOT EXISTS
PIC(mesure_id INTEGER PRIMARY KEY AUTOINCREMENT, noadmsip INTEGER, value FLOAT, horodate DATETIME, FOREIGN KEY(noadmsip) REFERENCES Patients(noadmsip))""")

cursor.execute("""CREATE INDEX IF NOT EXISTS idx_pic_noadmsip ON PIC (noadmsip)""")
cursor.execute("""CREATE INDEX IF NOT EXISTS idx_pic_horodate ON PIC (horodate)""")

cursor.execute("""CREATE TABLE IF NOT EXISTS
LICOX(mesure_id INTEGER PRIMARY KEY AUTOINCREMENT, noadmsip INTEGER, value FLOAT, horodate DATETIME, FOREIGN KEY(noadmsip) REFERENCES Patients(noadmsip))""")

cursor.execute("""CREATE INDEX IF NOT EXISTS idx_licox_noadmsip ON LICOX (noadmsip)""")
cursor.execute("""CREATE INDEX IF NOT EXISTS idx_licox_horodate ON LICOX (horodate)""")

cursor.execute("""CREATE TABLE IF NOT EXISTS
Pupilles(mesure_id INTEGER PRIMARY KEY AUTOINCREMENT, noadmsip INTEGER, value FLOAT, horodate DATETIME, FOREIGN KEY(noadmsip) REFERENCES Patients(noadmsip))""")

cursor.execute("""CREATE INDEX IF NOT EXISTS idx_pupilles_noadmsip ON FiO2 (noadmsip)""")
cursor.execute("""CREATE INDEX IF NOT EXISTS idx_pupilles_horodate ON Pupilles (horodate)""")


# 2. CARDIO-RESPIRATORY TARGETS

cursor.execute("""CREATE TABLE IF NOT EXISTS
PVC(mesure_id INTEGER PRIMARY KEY AUTOINCREMENT, noadmsip INTEGER, nom TEXT, value FLOAT, horodate DATETIME, FOREIGN KEY(noadmsip) REFERENCES Patients(noadmsip))""")

cursor.execute("""CREATE INDEX IF NOT EXISTS idx_pvc_noadmsip ON PVC (noadmsip)""")
cursor.execute("""CREATE INDEX IF NOT EXISTS idx_pvc_horodate ON PVC (horodate)""")

cursor.execute("""CREATE TABLE IF NOT EXISTS
PaM(mesure_id INTEGER PRIMARY KEY AUTOINCREMENT, noadmsip INTEGER, value FLOAT, horodate DATETIME, FOREIGN KEY(noadmsip) REFERENCES Patients(noadmsip))""")

cursor.execute("""CREATE INDEX IF NOT EXISTS idx_pam_noadmsip ON PaM (noadmsip)""")
cursor.execute("""CREATE INDEX IF NOT EXISTS idx_pam_horodate ON PaM (horodate)""")

cursor.execute("""CREATE TABLE IF NOT EXISTS
EtCO2(mesure_id INTEGER PRIMARY KEY AUTOINCREMENT, noadmsip INTEGER, realV INTEGER, value FLOAT, horodate DATETIME, FOREIGN KEY(noadmsip) REFERENCES Patients(noadmsip))""")

cursor.execute("""CREATE INDEX IF NOT EXISTS idx_etco2_noadmsip ON EtCO2 (noadmsip)""")
cursor.execute("""CREATE INDEX IF NOT EXISTS idx_etco2_horodate ON EtCO2 (horodate)""")

cursor.execute("""CREATE TABLE IF NOT EXISTS
PaCO2(mesure_id INTEGER PRIMARY KEY AUTOINCREMENT, noadmsip INTEGER, realV INTEGER, value FLOAT, horodate DATETIME, FOREIGN KEY(noadmsip) REFERENCES Patients(noadmsip))""")

cursor.execute("""CREATE INDEX IF NOT EXISTS idx_paco2_noadmsip ON PaCO2 (noadmsip)""")
cursor.execute("""CREATE INDEX IF NOT EXISTS idx_paco2_horodate ON PaCO2 (horodate)""")


# 3. LABORATORY MONITORING TARGETS

cursor.execute("""CREATE TABLE IF NOT EXISTS
Glycemie(mesure_id INTEGER PRIMARY KEY AUTOINCREMENT, noadmsip INTEGER, realV INTEGER, value FLOAT, horodate DATETIME, FOREIGN KEY(noadmsip) REFERENCES Patients(noadmsip))""")

cursor.execute("""CREATE INDEX IF NOT EXISTS idx_glycemie_noadmsip ON Glycemie (noadmsip)""")
cursor.execute("""CREATE INDEX IF NOT EXISTS idx_glycemie_horodate ON Glycemie (horodate)""")

cursor.execute("""CREATE TABLE IF NOT EXISTS
INR(mesure_id INTEGER PRIMARY KEY AUTOINCREMENT, noadmsip INTEGER, realV INTEGER, value FLOAT, horodate DATETIME, FOREIGN KEY(noadmsip) REFERENCES Patients(noadmsip))""")

cursor.execute("""CREATE INDEX IF NOT EXISTS idx_inr_noadmsip ON INR (noadmsip)""")
cursor.execute("""CREATE INDEX IF NOT EXISTS idx_inr_horodate ON INR (horodate)""")

cursor.execute("""CREATE TABLE IF NOT EXISTS
Plaquettes(mesure_id INTEGER PRIMARY KEY AUTOINCREMENT, noadmsip INTEGER, source TEXT, value FLOAT, horodate DATETIME, FOREIGN KEY(noadmsip) REFERENCES Patients(noadmsip))""")

cursor.execute("""CREATE INDEX IF NOT EXISTS idx_plaquettes_noadmsip ON Plaquettes (noadmsip)""")
cursor.execute("""CREATE INDEX IF NOT EXISTS idx_plaquettes_horodate ON Plaquettes (horodate)""")

# 4. GENERAL SUPPORT MONITORING TARGETS

cursor.execute("""CREATE TABLE IF NOT EXISTS
AnalgoSedation(mesure_id INTEGER PRIMARY KEY AUTOINCREMENT, noadmsip INTEGER, value FLOAT, horodate DATETIME, FOREIGN KEY(noadmsip) REFERENCES Patients(noadmsip))""")

cursor.execute("""CREATE INDEX IF NOT EXISTS idx_analgo_noadmsip ON AnalgoSedation (noadmsip)""")
cursor.execute("""CREATE INDEX IF NOT EXISTS idx_analgo_horodate ON AnalgoSedation (horodate)""")

cursor.execute("""CREATE TABLE IF NOT EXISTS
Nutrition(mesure_id INTEGER PRIMARY KEY AUTOINCREMENT, noadmsip INTEGER, type TEXT, value FLOAT, horodate DATETIME, FOREIGN KEY(noadmsip) REFERENCES Patients(noadmsip))""")

cursor.execute("""CREATE INDEX IF NOT EXISTS idx_nutrition_noadmsip ON Nutrition (noadmsip)""")
cursor.execute("""CREATE INDEX IF NOT EXISTS idx_nutrition_horodate ON Nutrition (horodate)""")

cursor.execute("""CREATE TABLE IF NOT EXISTS
TeteLit(mesure_id INTEGER PRIMARY KEY AUTOINCREMENT, noadmsip INTEGER, severe INTEGER, horodate DATETIME, FOREIGN KEY(noadmsip) REFERENCES Patients(noadmsip))""")

cursor.execute("""CREATE INDEX IF NOT EXISTS idx_tetelit_noadmsip ON TeteLit (noadmsip)""")
cursor.execute("""CREATE INDEX IF NOT EXISTS idx_tetelit_horodate ON TeteLit (horodate)""")

cursor.execute("""CREATE TABLE IF NOT EXISTS
Temperature(mesure_id INTEGER PRIMARY KEY AUTOINCREMENT, noadmsip INTEGER, value FLOAT, horodate DATETIME, FOREIGN KEY(noadmsip) REFERENCES Patients(noadmsip))""")

cursor.execute("""CREATE INDEX IF NOT EXISTS idx_temp_noadmsip ON Temperature (noadmsip)""")
cursor.execute("""CREATE INDEX IF NOT EXISTS idx_temp_horodate ON Temperature (horodate)""")

class PatientEncoder(JSONEncoder):
        def default(self, o):
            return o.__dict__

app = Flask(__name__)
file = open("/home/kasm-user/Desktop/Downloads/mot_de_passe", "r")
data = file.read() 
ids = data.split(";")
conn = None
cur = None

dateNow = datetime.datetime.now()
sevenDays = timedelta(days=7)
sixMonths = relativedelta(months=6)
thirtySeconds = timedelta(seconds=30)
try:
    conn = psycopg2.connect(
        host = 'localhost',
        dbname = 'cathydb',
        user = ids[0],
        password = ids[1].translate({ord(c): None for c in string.whitespace}),
        port = 5432
    )
    cur = conn.cursor()

    # Beds API Route
    @app.route("/beds")
    def showBeds():
        cur.execute('BEGIN;')
        cur.execute('SELECT lits.lit, d_encounter.encounterid, d_encounter.firstname, d_encounter.lastname FROM "readonly"."d_encounter" JOIN "readonly"."lits" ON d_encounter.encounterid = lits.noadmsip WHERE "lits"."sortie" IS NULL AND "lits"."lit" <> 0 AND "lits"."entree" > '+ "'" + str(dateNow-sixMonths) +"'" +' ORDER BY "lits"."lit" ASC;')
        listBeds = cur.fetchall()
        cur.execute("ROLLBACK;")
        listBedsStr = []
        for i in listBeds:
            p = str(i).split("'")
            listBedsStr.append([p[1], p[2][3:-2], p[3],p[5]])
        PatientEncoder().encode(listBedsStr)
        JSONData = json.dumps(listBedsStr, indent=4, cls=PatientEncoder)
        return(JSONData)

    @app.route("/beds/<noadmsip>")
    def searchPatient(noadmsip):   
        patient = addToPatient(noadmsip)
        PatientEncoder().encode(patient)
        patientJSONData = json.dumps(patient, indent=4, cls=PatientEncoder)
        return(patientJSONData)
    
    @app.route("/pages/<mesure>/<noadmsip>/<fenetre>")
    def searchMesure(mesure, noadmsip, fenetre):  
        target_datetime = datetime.datetime.fromtimestamp(int(fenetre)/1000)
        cursor.execute("SELECT * FROM " + mesure +" WHERE noadmsip="+ noadmsip +" AND horodate > '" + str(target_datetime)[:19] +"' ORDER BY horodate DESC")     
        allValues = cursor.fetchall()
        PatientEncoder().encode(allValues)
        allValuesJSONData = json.dumps(allValues, indent=4, cls=PatientEncoder)
        return(allValuesJSONData)
    
    @app.route("/DBsize")
    def searchSize():  
        file_name = "/home/kasm-user/Desktop/Downloads/Patients.db"
        file_stats = os.stat(file_name)
        size = file_stats.st_size / (1024 * 1024)
        PatientEncoder().encode(size)
        sizeJSONData = json.dumps(size, indent=4, cls=PatientEncoder)
        return(sizeJSONData)
    
    @app.route("/DeleteDB")
    def deleteDB():
        cursor.execute("BEGIN;")
        cursor.execute("DROP TABLE IF EXISTS ScoreGlobal;")
        cursor.execute("DROP TABLE IF EXISTS EtatNeurologique;")
        cursor.execute("DROP TABLE IF EXISTS Glasgow;")
        cursor.execute("DROP TABLE IF EXISTS Patients;")
        cursor.execute("DROP TABLE IF EXISTS PPC;")
        cursor.execute("DROP TABLE IF EXISTS PIC;")
        cursor.execute("DROP TABLE IF EXISTS LICOX;")
        cursor.execute("DROP TABLE IF EXISTS Pupilles;")
        cursor.execute("DROP TABLE IF EXISTS PVC;")
        cursor.execute("DROP TABLE IF EXISTS PaM;")
        cursor.execute("DROP TABLE IF EXISTS EtCO2;")
        cursor.execute("DROP TABLE IF EXISTS PaCO2;")
        cursor.execute("DROP TABLE IF EXISTS Glycemie;")
        cursor.execute("DROP TABLE IF EXISTS INR;")
        cursor.execute("DROP TABLE IF EXISTS Plaquettes;")
        cursor.execute("DROP TABLE IF EXISTS AnalgoSedation;")
        cursor.execute("DROP TABLE IF EXISTS Nutrition;")
        cursor.execute("DROP TABLE IF EXISTS Temperature;")
        cursor.execute("DROP TABLE IF EXISTS TeteLit;")
    
        cursor.execute("COMMIT;")
        searchSize()
        return('Patients.db empty')
    
    @app.route("/DeleteDischargedPatients")
    def deletePO():
        """cursor.execute("")"""
        return('Done')

except Exception as error:
    print(error)

