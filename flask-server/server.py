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

# 1. Execute the virtual environment : source .venv/bin/activate
# 2. Install the requiered packages : pip install -r requirements.txt

DB_USERNAME="marmar38"
DB_PASSWORD="e2b63Fn072$e"
DB_HOST="coder-marmar38-jade-postgres"
DB_NAME="marmar38"
DB_PORT=5432

app = Flask(__name__)

try:
    conn = psycopg2.connect(
        host = DB_HOST,
        dbname = DB_NAME,
        user = DB_USERNAME,
        password = DB_PASSWORD,
        port = DB_PORT
    )
    cur = conn.cursor()

    if cur is not None:
        print(' successfully connected to the pgAdmin database ')
    else:
        print('not connected with database :( ')


    # Creates a new table
    cur.execute(''' CREATE TABLE IF NOT EXISTS lits (
                id serial PRIMARY KEY, 
                noadmsip INTEGER,
                uniteclinique INTEGER,
                lit  DECIMAL(2, 2),
                entree TIMESTAMP,
                sortie TIMESTAMP) '''
    )

    cur.execute()

    # commit the changes
    conn.commit()
    
    # close the cursor and connection
    cur.close()
    conn.close()

  
except Exception as error:
    print(error)


