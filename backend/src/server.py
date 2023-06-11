"""
Implements a backend server
"""
# Imports
import requests
import re
import time
import pandas as pd
from sqlalchemy import func
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

@server.route("/get-all-teachers", methods=["GET"])
def get_teachers():
    teachers = []
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
            teachers.append({
                "id": sample.professor_id,
                "name": sample.name,
                "m1": sample.metric1,
                "m2": sample.metric2,
                "m3": sample.metric3,
                "m4": sample.metric4,
                "m5": sample.metric5
            })
    return {
        'teacher-list': teachers
    }   


@server.route("/get-teacher-subjects", methods=["POST"])
def get_professors_subjects():
    request_data =  request.json
    subject_table = model.classes.Subject
    teach_table = model.classes.Teach
    subjects_list = []
    with Session(database) as session:
        try:
            results = session.query(
                subject_table.subject_id,
                subject_table.name,
                teach_table.teach_id
            ).join(teach_table, subject_table.subject_id ==  teach_table.subject_id
            ).filter(teach_table.professor_id == request_data['id']).all()
        except:
            session.rollback()
            raise
        else:
            session.commit()
        
        for sample in results:
            subjects_list.append({
                'id': sample.subject_id,
                'teach_id': sample.teach_id,
                'name': sample.name
            })
    return {
        "subjects": subjects_list
    }

# @server.route("/update-professor", methods=["GET"])
# def update_professor():
#     professor_table = model.classes.Professor
#     teach_table = model.classes.Teach
#     review_table = model.classes.Review
    
#     with Session(database) as session:
#         try:
#             results = session.query(
#                 professor_table.professor_id,
#                 review_table.review_id,
#                 review_table.metric1,
#                 review_table.metric2,
#                 review_table.metric3,
#                 review_table.metric4,
#                 review_table.metric5
#             ).join(teach_table, teach_table.professor_id == professor_table.professor_id
#             ).join(review_table, review_table.teach_id == teach_table.teach_id).all()
#         except:
#             session.rollback()
#             raise
#         else:
#             session.commit()
    
#         samples = [{
#             'professor_id': sample.professor_id,
#             'review_id': sample.review_id,
#             'metric1': sample.metric1,
#             'metric2': sample.metric2,
#             'metric3': sample.metric3,
#             'metric4': sample.metric4,
#             'metric': sample.metric5
#         } for sample in results]
#         professor_df = pd.Datafram(samples)
#         print(professor_df)
#     return {
#         'results': samples
#     }

# @server.route("/add-review", methods=["POST"])
# def add_review():
#     request_data =  request.json
#     professor_table = model.classes.Professor
#     ts = time.time()
#     with Session(database) as session:
#         try:
#             session.add(
#                 model.classes.Review(
#                     teach_id=request_data['teach_id'],
#                     description=request_data['description'],
#                     metric1=request_data['m1'],
#                     metric2=request_data['m2'],
#                     metric3=request_data['m3'],
#                     metric4=request_data['m4'],
#                     metric5=request_data['m5'],
#                     report_time=func.to_timestamp(ts)
#                 )
#             )
#         except:
#             session.rollback()
#             raise
#         else:
#             session.commit()

#         try:
#             session.query(
#                 professor_table
#             ).filter(
#                 professor_tableprofessor_id == request_data["professor_id"]
#             ).update({
#                 professor_table.metric1 = 
#             })
        
#     return {
#         "Insert Review": 200
#     }


