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

@server.route("/get-teacher-by-id", methods=["POST"])
def get_teacher_by_id():
    request_data =  request.json
    teacher = teacher_info(request_data['id'])
    return teacher

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

#recebe um json com professor_id
@server.route("/get-teacher-review", methods=["POST"])
def get_professors_review():
    request_data = request.json
    subject_table = model.classes.Subject
    professor_table = model.classes.Professor
    review_table = model.classes.Review
    teach_table = model.classes.Teach
    subjects_list = []
    
    with Session(database) as session:
        try:
            results = session.query(
                review_table.review_id,
                review_table.report_time,
                review_table.description,
                professor_table.professor_id,
                subject_table.subject_id,
                subject_table.name,
                teach_table.teach_id
            ).join(teach_table, professor_table.professor_id == teach_table.professor_id
            ).join(subject_table, subject_table.subject_id == teach_table.subject_id
            ).join(review_table, review_table.teach_id == teach_table.teach_id
            ).filter(teach_table.professor_id == request_data['id']).all()
        except:
            session.rollback()
            raise
        else:
            session.commit()
        
        for sample in results:
            subjects_list.append({
                'id': sample.review_id,
                'description': sample.description,
                'date': sample.report_time,
                'name': sample.name
            })
    
    return {
        "subjects": subjects_list
    }

@server.route("/add-review", methods=["POST"])
def add_review():
    request_data =  request.json
    ts = time.time()
    teacher = teacher_info(request_data['professor_id'])

    if teacher["cnt_review"]:
        update_info = {
            "metric1": ((teacher['metric1']*teacher['cnt_review']) + request_data['m1'])/(teacher['cnt_review']+1),
            "metric2": ((teacher['metric2']*teacher['cnt_review']) + request_data['m2'])/(teacher['cnt_review']+1),
            "metric3": ((teacher['metric3']*teacher['cnt_review']) + request_data['m3'])/(teacher['cnt_review']+1),
            "metric4": ((teacher['metric4']*teacher['cnt_review']) + request_data['m4'])/(teacher['cnt_review']+1),
            "metric5": ((teacher['metric5']*teacher['cnt_review']) + request_data['m5'])/(teacher['cnt_review']+1),
            "cnt_review": teacher['cnt_review'] + 1
        }
    else: 
        update_info = {
            "metric1": request_data['m1'],
            "metric2": request_data['m2'],
            "metric3": request_data['m3'],
            "metric4": request_data['m4'],
            "metric5": request_data['m5'],
            "cnt_review": 1
        }
    with Session(database) as session:
        try:
            session.add(
                model.classes.Review(
                    teach_id=request_data['teach_id'],
                    description=request_data['description'],
                    metric1=request_data['m1'],
                    metric2=request_data['m2'],
                    metric3=request_data['m3'],
                    metric4=request_data['m4'],
                    metric5=request_data['m5'],
                    report_time=func.to_timestamp(ts)
                )
            )
            session.query(
                model.classes.Professor
            ).filter(
                model.classes.Professor.professor_id == request_data['professor_id']
            ).update(update_info)
        except:
            session.rollback()
            raise
        else:
            session.commit()


    return {
        "update-professor": request_data['professor_id']
    }
 



def teacher_info(id):
    professor_table = model.classes.Professor
    with Session(database) as session:
        try:
            result = session.query(
                professor_table
            ).filter(
                professor_table.professor_id == id
            ).first()
        except:
            session.rollback()
            raise
        else:
            session.commit()
        teacher = {
            'professor_id': result.professor_id,
            'metric1': result.metric1,
            'metric2': result.metric2,
            'metric3': result.metric3,
            'metric4': result.metric4,
            'metric5': result.metric5,
            'cnt_review': result.cnt_review
        }
    return teacher