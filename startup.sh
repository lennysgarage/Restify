#!/bin/bash

# Navigate to the backend
cd backend

# Create virtual env
python3 -m venv .venv

# Activate virtual env
source .venv/bin/activate

# Install requirements.txt
pip install -r requirements.txt

# Make migrations
python3 manage.py makemigrations

# Run migrations
python3 manage.py migrate

# Navigate to the frontend
cd ../frontend

# Install all node packages
npm i --legacy-peer-deps
