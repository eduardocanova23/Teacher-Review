"""
Implements a backend server
"""
# Imports
import requests
import re
from scripts.siga_data_to_db import insert_into_db
from scripts.courses_list import courses
from scripts.siga_scraper_class import (
    siga_curriculum_scraper,
    siga_grande_scraper
)

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

@server.route("/generate-db", methods=["POST"])
def generate_db():
    curriculum_scraper = siga_curriculum_scraper()
    grade_scrapper = siga_grande_scraper()
    print("Started Scraping")
    grade_df = grade_scrapper.get_grande_info(courses)
    print("Finished Grade")
    subject_info = curriculum_scraper.get_subject_info()   
    print("Finished Subject Info")
    print("Generate Scraped Datasets")

    db = insert_into_db(database)
    subject_df = db.insert_subject(subject_info, grade_df)
    professor_df = db.insert_professor(grade_df)
    course_df = db.insert_course(subject_info)
    teach_df = db.insert_teach(grade_df, professor_df, subject_df, '2023.1')
    syllabus_df = db.insert_syllabus(subject_info, subject_df, course_df)

    return {
        'status': 200
    }



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
