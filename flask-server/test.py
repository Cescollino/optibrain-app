import psycopg2

# Connection details
hostname = "your_server_hostname"
port = 5432  # Default PostgreSQL port
database = "your_database_name"
username = "your_username"
password = "your_password"

# Create a connection object
connection = psycopg2.connect(
    host=hostname,
    port=port,
    database=database,
    user=username,
    password=password
)

# Create a cursor object
cursor = connection.cursor()


# Execute a SELECT query
cursor.execute("SELECT * FROM your_table_name")

# Fetch all the rows
rows = cursor.fetchall()

# Print the result
for row in rows:
    print(row)

# Close the cursor and connection
cursor.close()
connection.close()