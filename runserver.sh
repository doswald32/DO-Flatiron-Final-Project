#!/bin/bash

cd server
export FLASK_APP=app.py
export FLASK_RUN_PORT=5555
flask db upgrade
python seed.py
python app.py