#!/bin/bash

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