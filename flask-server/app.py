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

# 1. execute the virtual environment : source .venv/bin/activate
# 2. install the requiered packages : pip install -r requirements.txt

# create patinent info file
connection = sqlite3.connect('Patients.db', check_same_thread=False)

cursor = connection.cursor()


# Loads most recent 100 patients intime in the SIP without a outtime
cursor.execute("""CREATE TABLE IF NOT EXISTS
Lits(ptbedstayid INTEGER PRIMARY KEY, encounterid INTEGER, bedlabel TEXT, unite INTERGER, nodossier TEXT, intime DATETIME)""")

cursor.execute("""CREATE INDEX IF NOT EXISTS idx_patients_noadmsip ON Patients (noadmsip)""")
cursor.execute("""CREATE INDEX IF NOT EXISTS idx_patients_lastLoadingTime ON Patients (lastLoadingTime)""")

# create patinent info table

cursor.execute("""CREATE TABLE IF NOT EXISTS
Patients(noadmsip INTEGER PRIMARY KEY, fistname TEXT, lastname TEXT, age TEXT, gender TEXT, lifetimenb INT, weight FLOAT, idealWeight FLOAT, height FLOAT, lastLoadingTime DATETIME)""")

cursor.execute("""CREATE INDEX IF NOT EXISTS idx_patients_noadmsip ON Patients (noadmsip)""")
cursor.execute("""CREATE INDEX IF NOT EXISTS idx_patients_lastLoadingTime ON Patients (lastLoadingTime)""")

# always in Kg
cursor.execute("""CREATE TABLE IF NOT EXISTS
Poids(mesure_id INTEGER PRIMARY KEY AUTOINCREMENT, noadmsip INTEGER, value FLOAT, horodate DATETIME, FOREIGN KEY(noadmsip) REFERENCES Patients(noadmsip))""")

cursor.execute("""CREATE INDEX IF NOT EXISTS idx_poids_noadmsip ON Poids (noadmsip)""")
cursor.execute("""CREATE INDEX IF NOT EXISTS idx_poids_horodate ON Poids (horodate)""")


# create table for global scores

# TODO : need to have a global score for each KPI and then calculate the GLOBAL SCORE
cursor.execute("""CREATE TABLE IF NOT EXISTS
ScoreGlobal(mesure_id INTEGER PRIMARY KEY AUTOINCREMENT, noadmsip INTEGER, value INTEGER, horodate DATETIME, FOREIGN KEY(noadmsip) REFERENCES Patients(noadmsip))""")

cursor.execute("""CREATE INDEX IF NOT EXISTS idx_global_noadmsip ON ScoreGlobal (noadmsip)""")
cursor.execute("""CREATE INDEX IF NOT EXISTS idx_global_horodate ON ScoreGlobal (horodate)""")

cursor.execute("""CREATE TABLE IF NOT EXISTS
EtatNeurologique(mesure_id INTEGER PRIMARY KEY AUTOINCREMENT, noadmsip INTEGER, value INTEGER, horodate DATETIME, FOREIGN KEY(noadmsip) REFERENCES Patients(noadmsip))""")

cursor.execute("""CREATE INDEX IF NOT EXISTS idx_neuro_noadmsip ON EtatNeurologique (noadmsip)""")
cursor.execute("""CREATE INDEX IF NOT EXISTS idx_neuro_horodate ON EtatNeurologique (horodate)""")

# score is between 3 and 15 and has severity thresholds
cursor.execute("""CREATE TABLE IF NOT EXISTS
GlasgowScore(mesure_id INTEGER PRIMARY KEY AUTOINCREMENT, noadmsip INTEGER,  score INTEGER CHECK (score BETWEEN 3 AND 15),
               severe INTEGER, horodate DATETIME, FOREIGN KEY(noadmsip) REFERENCES Patients(noadmsip))""")

cursor.execute("""CREATE INDEX IF NOT EXISTS idx_glasgow_noadmsip ON Glasgow (noadmsip)""")
cursor.execute("""CREATE INDEX IF NOT EXISTS idx_glasgow_horodate ON Glasgow (horodate)""")

# create table for each adherence monitoring category

# 1. NEURO-MONITORING TARGETS

cursor.execute("""CREATE TABLE IF NOT EXISTS
PPC(mesure_id INTEGER PRIMARY KEY AUTOINCREMENT, noadmsip INTEGER, value INTEGER, horodate DATETIME, FOREIGN KEY(noadmsip) REFERENCES Patients(noadmsip))""")

cursor.execute("""CREATE INDEX IF NOT EXISTS idx_vent_noadmsip ON PPC (noadmsip)""")
cursor.execute("""CREATE INDEX IF NOT EXISTS idx_vent_horodate ON PPC (horodate)""")

cursor.execute("""CREATE TABLE IF NOT EXISTS
PICm(mesure_id INTEGER PRIMARY KEY AUTOINCREMENT, noadmsip INTEGER, value FLOAT, horodate DATETIME, FOREIGN KEY(noadmsip) REFERENCES Patients(noadmsip))""")

cursor.execute("""CREATE INDEX IF NOT EXISTS idx_picm_noadmsip ON PICm (noadmsip)""")
cursor.execute("""CREATE INDEX IF NOT EXISTS idx_picm_horodate ON PICm (horodate)""")

cursor.execute("""CREATE TABLE IF NOT EXISTS
LICOX(mesure_id INTEGER PRIMARY KEY AUTOINCREMENT, noadmsip INTEGER, value FLOAT, horodate DATETIME, FOREIGN KEY(noadmsip) REFERENCES Patients(noadmsip))""")

cursor.execute("""CREATE INDEX IF NOT EXISTS idx_licox_noadmsip ON LICOX (noadmsip)""")
cursor.execute("""CREATE INDEX IF NOT EXISTS idx_licox_horodate ON LICOX (horodate)""")

cursor.execute("""CREATE TABLE IF NOT EXISTS
Pupilles(mesure_id INTEGER PRIMARY KEY AUTOINCREMENT, noadmsip INTEGER, value FLOAT, horodate DATETIME, FOREIGN KEY(noadmsip) REFERENCES Patients(noadmsip))""")

cursor.execute("""CREATE INDEX IF NOT EXISTS idx_pupilles_noadmsip ON Pupilles (noadmsip)""")
cursor.execute("""CREATE INDEX IF NOT EXISTS idx_pupilles_horodate ON Pupilles (horodate)""")


# 2. CARDIO-RESPIRATORY TARGETS

cursor.execute("""CREATE TABLE IF NOT EXISTS
PVCm(mesure_id INTEGER PRIMARY KEY AUTOINCREMENT, noadmsip INTEGER, value FLOAT, horodate DATETIME, FOREIGN KEY(noadmsip) REFERENCES Patients(noadmsip))""")

cursor.execute("""CREATE INDEX IF NOT EXISTS idx_pvcm_noadmsip ON PVCm (noadmsip)""")
cursor.execute("""CREATE INDEX IF NOT EXISTS idx_pvcm_horodate ON PVCm (horodate)""")

cursor.execute("""CREATE TABLE IF NOT EXISTS
PAm(mesure_id INTEGER PRIMARY KEY AUTOINCREMENT, noadmsip INTEGER, value FLOAT, horodate DATETIME, FOREIGN KEY(noadmsip) REFERENCES Patients(noadmsip))""")

cursor.execute("""CREATE INDEX IF NOT EXISTS idx_pam_noadmsip ON PAm (noadmsip)""")
cursor.execute("""CREATE INDEX IF NOT EXISTS idx_pam_horodate ON PAm (horodate)""")

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


DB_USERNAME="marmar38"
DB_PASSWORD="e2b63Fn072$e"
DB_HOST="coder-marmar38-jade-posgres"
DB_NAME="coder-marmar38-jade-posgres"
DB_PORT=5432

class PatientEncoder(JSONEncoder):
        def default(self, o):
            return o.__dict__

app = Flask(__name__)

dateNow = datetime.datetime.now()
sevenDays = timedelta(days=7)
sixMonths = relativedelta(months=6)
thirtySeconds = timedelta(seconds=30)

try:
    conn = psycopg2.connect(
        host = DB_HOST,
        dbname = DB_NAME,
        username = DB_USERNAME,
        password = DB_PASSWORD,
        port = DB_PORT
    )
    cur = conn.cursor()

    # Creates a new table
    cur.execute(''' CREATE TABLE IF NOT EXISTS Lits (
                id serial PRIMARY KEY, 
                noadmsip INTEGER,
                uniteclinique INTEGER,
                lit  DECIMAL(2, 2),
                entree TIMESTAMP,
                sortie TIMESTAMP) '''
    )

    cur.execute('COMMIT;')


    # Beds API Route
    @app.route("/beds")
    def showBeds():
        cur.execute('BEGIN;')
        cur.execute('SELECT PtBedStay.ptBedStayId, ptBedStay.encounterId, bedlabel, clinicalUnitId	AS Unite, d_Encounter.LifeTimeNumber AS NoDossier, ptBedStay.inTime, ptBedStay.outTime FROM "readonly"."ptBedStay" INNER JOIN "readonly"."d_Encounter" ON d_Encounter.encounterId = ptBedStay.encounterId WHERE clinicalUnitId IN (4, 10) AND ptBedStay.outTime IS NULL ORDER BY ptBedStay.inTime DESC;')
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
        file_name = "Patients.db"
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
        cursor.execute("DROP TABLE IF EXISTS GlasgowScore;")
        cursor.execute("DROP TABLE IF EXISTS Patients;")
        cursor.execute("DROP TABLE IF EXISTS PPC;")
        cursor.execute("DROP TABLE IF EXISTS PICm;")
        cursor.execute("DROP TABLE IF EXISTS LICOX;")
        cursor.execute("DROP TABLE IF EXISTS Pupilles;")
        cursor.execute("DROP TABLE IF EXISTS PVCm;")
        cursor.execute("DROP TABLE IF EXISTS PAm;")
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

finally:
    if cur is not None:
        cur.close()
    if conn is not None:
        conn.close()

    
def addToPatient(noadmsip):
        print(str(noadmsip))
        cursor.execute('SELECT noadmsip FROM Patients;')  
        allPatients = cursor.fetchall()
        print(allPatients)

        #Check if the patient already exists in the db
        cursor.execute('SELECT lastLoadingTime FROM Patients WHERE noadmsip ='+ noadmsip +';')  
        lastLoadingTime = cursor.fetchone()
        if lastLoadingTime is not None:
            print('not none')
            limitDate = datetime.datetime.strptime(lastLoadingTime[0], '%Y-%m-%d %H:%M:%S')
            print(limitDate)
            cursor.execute("BEGIN;")
            cursor.execute("UPDATE Patients SET lastLoadingTime = datetime('"+ str(dateNow) +"') WHERE noadmsip ="+ noadmsip +";")
            cursor.execute("COMMIT;")
        else:
            print('none')
            limitDate = dateNow - sevenDays
            print(limitDate)

            #Infos
            cur.execute('SELECT firstname, lastname, dateofbirth, gender, lifetimenumber FROM "readonly"."d_encounter" WHERE "encounterid"='+"'"+ str(noadmsip) +"'"+ ';')
            dataInfos = cur.fetchall()

            #POIDS
            cur.execute('SELECT valuenumber,charttime FROM "readonly"."ptdemographic" WHERE "encounterid"='+"'"+ str(noadmsip) +"'"+ 'AND "attributeid" IN(90292, 90305, 101957, 46228) AND "valuenumber" IS NOT NULL AND "valuenumber"> 1 ORDER BY "charttime" DESC ;')
            poids = cur.fetchall()
            cursor.execute("BEGIN;") #begin transaction
            for p in poids:
                cursor.execute("INSERT INTO Poids(noadmsip, value, horodate) VALUES("+ str(noadmsip)+","+ str(p[0])+", datetime('"+ str(p[1])[:19]+"'))")
            cursor.execute("COMMIT;" )#end transaction
            if(poids[0][0]):
                weight = round(float(poids[0][0]),1) 
            else:
                weight ='None'
            #POIDS IDEAL
            cur.execute('SELECT valuenumber FROM "readonly"."ptdemographic" WHERE "encounterid"='+"'"+ str(noadmsip) +"'"+ 'AND "attributeid" = 14650 AND "valuenumber" IS NOT NULL AND "valuenumber"> 1 ORDER BY "charttime" DESC ;')
            poidsId = cur.fetchone()
            if(poidsId):
                pId = str(poidsId).split("'")
                weightId = round(float(pId[1]),1) 
            else:
                weightId ='None'
            #TAILLE
            cur.execute('SELECT valuenumber FROM "readonly"."ptassessment" WHERE "encounterid"='+"'"+ str(noadmsip) +"'"+ 'AND "attributeid" = 95793  AND "attributeid" IS NOT NULL AND "valuenumber"> 0 ORDER BY "charttime" DESC ;')
            taille = cur.fetchone()
            if(taille):
                p = str(taille).split("'")
                height = round(float(p[1]),1) 
            else:
                height = 'None'
            cursor.execute("BEGIN;") #begin transaction
            cursor.execute("INSERT INTO Patients VALUES ('"+ str(noadmsip) + "','" + str(dataInfos[0][0]) + "','" + str(dataInfos[0][1]) + "',datetime('"+ str(dataInfos[0][2]) +"'),'"+ str(dataInfos[0][3])+ "','" +str(dataInfos[0][4])+ "','"+ str(weight) + "','"+ str(weightId) +"','"+ str(height) + "', datetime('now','localtime'))")
            cursor.execute("COMMIT;") #end transaction

        #On rentre les dernières données   
        cur.execute('SELECT par, valnum, horodate FROM "readonly"."icca_htr" WHERE "noadmsip"='+ str(noadmsip) + ' AND "par" IN('+ "'PPC','PICm', 'Pm' 'PVCm', 'PAm', 'CO2fe'" + ') AND "horodate" >' +"'" + str(limitDate) +"'" +' ORDER BY "horodate" DESC;')
        print('icca selected')
        dataICCA = cur.fetchall()

        cursor.execute("BEGIN;") #begin transaction
        for i in dataICCA:
            if(i[1] is not None):
                if(str(i[0])=='PPC'): #PPC
                    try:
                        cursor.execute("INSERT INTO PPC (noadmsip, value, horodate)VALUES("+ str(noadmsip) + "," + str(i[1]) + ", datetime('" + str(i[2])[:19]+"'))")
                    except:
                        print('Pression de perfusion cérébrale (PPC):'+ str(i))
                if(str(i[0])=='PICm'): #PIC
                    try:
                        cursor.execute("INSERT INTO PIC (noadmsip, value, horodate) VALUES("+ str(noadmsip) + "," + str(i[1]) + ",datetime('" + str(i[2])[:19]+"'))")
                    except:
                        print('Pression intercranienne moyenne (PICm):'+ str(i))
                if(str(i[0])=='PVCm'): #PVCm
                    try:
                        cursor.execute("INSERT INTO PVCm (noadmsip, value, horodate) VALUES("+ str(noadmsip) + "," + str(i[1]) + ",datetime('" + str(i[2])[:19]+"'))")
                    except:
                        print('Pression veineuse centrale moyenne (PVCm):'+ str(i))
                if(str(i[0])=='PAm'): #PAm
                    try:
                        cursor.execute("INSERT INTO PAm (noadmsip, value, horodate) VALUES("+ str(noadmsip) + "," + str(i[1]) + ",datetime('" + str(i[2])[:19]+"'))")
                    except:
                        print('Pression artérielle moyenne (PAm) :'+ str(i))
                if(str(i[0])=='Pm'): #Licox continu --> Pm
                    try:
                        cursor.execute("INSERT INTO LICOX (noadmsip, value, horodate) VALUES("+ str(noadmsip) + "," + str(i[1]) + ",datetime('" + str(i[2])[:19]+"'))")
                    except:
                        print('LICOX (Pm) :'+ str(i))
                    
                if(str(i[0])=='CO2fe'): #CO2fe
                    try:
                        cursor.execute("INSERT INTO SpO2 (noadmsip, value, horodate) VALUES("+ str(noadmsip) + "," + str(i[1]) + ", datetime('" + str(i[2])[:19]+"'))")
                    except:
                        print('ETCO2 continu (CO2fe):'+ str(i))

        cursor.execute("COMMIT;") #end transaction
        print('icca rangé')


        cursor.execute("SELECT * FROM Patients WHERE " +'"noadmsip"=' + str(noadmsip))
        info = cursor.fetchall()
        cursor.execute("SELECT * FROM Hypoxemie")
        hyp = cursor.fetchall()
        return([info, hyp])

 
cors = CORS(app, resource = {
    r"/*":{
        "origins":"*"
    }
})
if __name__=="__main__":
    app.run(port=3587, debug=True)
