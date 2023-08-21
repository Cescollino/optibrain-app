# This was the original csv files provided by Gilles, needed transformation
import csv

def rows_into_pg_schema():
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
            data = []
            for row in reader_obj:
                data
                print(f"table : {table}")
                noadmsip = row[0]
                print(f"noadmsip : {noadmsip}")
                values = row[1:]
                print(f"values : {row[1:]}")
                print(row)

