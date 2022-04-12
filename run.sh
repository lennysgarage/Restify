#!/bin/bash

# Navigate to the backend
cd backend

echo "Starting backend web server..."
# Activate virtual env
source .venv/bin/activate

# Kills backend when we kill frontend
trap 'kill %1' SIGINT
python3 manage.py runserver & cd ../frontend && npm start 
