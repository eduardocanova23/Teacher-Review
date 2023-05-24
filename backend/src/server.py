"""
Implements a backend server
"""
# Imports
import requests
import re
from helpers.utils import (
    connect_db,
    generate_token,
    validate_token,
    verify_status,
    verify_date,
    verify_id,
    verify_vector,
    coordinates_extractor
)

from flask import Flask, request
from werkzeug.security import (
    generate_password_hash,
    check_password_hash
)
from sqlalchemy import or_
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
from flask_cors import CORS

# Server instantiation and configuration
server = Flask(__name__)
CORS(server)
server.config['JSON_SORT_KEYS'] = False

# Create connection engine with database
database = connect_db()

# Map database tables as classes
model = automap_base()
model.prepare(autoload_with=database, reflect=True)

@server.route("/add-teacher", methods=["POST"])
def add_teacher():
    request_data =  request.json
    with Session(database) as session:
        try:
            session.add(
                model.classes.Professor(
                    professor_name=request_data['name'],
                    professor_m1=request_data['m1'],
                    professor_m2=request_data['m2'],
                    professor_m3=request_data['m3']
                )
            )
        except:
            session.rollback()
            raise
        else:
            session.commit()
    return {
        "status": 200
    }

@server.route("/get-teachers", methods=["GET"])
def get_teacher():
    teacher_list = []

    with Session(database) as session:
        try:
            results = session.query(
                model.classes.Professor
            ).all()
        except:
            session.rollback()
            raise
        else:
            session.commit()

        for sample in results:
            teacher_list.append({'id': sample.id, 'name': sample.professor_name})

    return {
        "Professors": teacher_list
    }
