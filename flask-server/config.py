#!/usr/bin/env python

# Create a separate file to avoid uploading on your repository
import postgresqlconfig as cfg

# Scheme: "postgres+psycopg2://<USERNAME>:<PASSWORD>@<IP_ADDRESS>:<PORT>/<DATABASE_NAME>"

DATABASE_URI = f"postgresql+psycopg2://{cfg.mysql['username']}:{cfg.mysql['password']}@{cfg.mysql['host']}:5432/{cfg.mysql['db']}"