CREATE TABLE "Syllabus"(
    "syllabus_id" SERIAL NOT NULL,
    "course_id" BIGINT NOT NULL,
    "subject_id" BIGINT NOT NULL,
    "category" VARCHAR(32) NULL
);
ALTER TABLE
    "Syllabus" ADD PRIMARY KEY("syllabus_id");
CREATE TABLE "Professor"(
    "professor_id" SERIAL NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "description" VARCHAR(255) NULL,
    "metric1" DOUBLE PRECISION NULL,
    "metric2" DOUBLE PRECISION NULL,
    "metric3" DOUBLE PRECISION NULL,
    "metric4" DOUBLE PRECISION NULL,
    "metric5" DOUBLE PRECISION NULL,
    "metric6" DOUBLE PRECISION NULL
);
ALTER TABLE
    "Professor" ADD PRIMARY KEY("professor_id");
CREATE TABLE "Teach"(
    "subject_id" BIGINT NOT NULL,
    "teach_id" SERIAL NOT NULL,
    "professor_id" BIGINT NOT NULL,
    "period" CHAR(6) NOT NULL
);
ALTER TABLE
    "Teach" ADD PRIMARY KEY("teach_id");
CREATE TABLE "Subject"(
    "subject_id" SERIAL NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "code" CHAR(6) NOT NULL,
    "description" VARCHAR(255) NULL
);
ALTER TABLE
    "Subject" ADD PRIMARY KEY("subject_id");
CREATE TABLE "Course"(
    "course_id" SERIAL NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "description" VARCHAR(255) NULL,
    "coordinator" VARCHAR(64) NULL
);
ALTER TABLE
    "Course" ADD PRIMARY KEY("course_id");
CREATE TABLE "Review"(
    "review_id" SERIAL NOT NULL,
    "teach_id" BIGINT NOT NULL,
    "description" VARCHAR(255) NULL,
    "metric1" DOUBLE PRECISION NULL,
    "metric2" DOUBLE PRECISION NULL,
    "metric3" DOUBLE PRECISION NULL,
    "metric4" DOUBLE PRECISION NULL,
    "metric5" DOUBLE PRECISION NULL,
    "metric6" DOUBLE PRECISION NULL,
    "report_time" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "Review" ADD PRIMARY KEY("review_id");
ALTER TABLE
    "Teach" ADD CONSTRAINT "teach_professor_id_foreign" FOREIGN KEY("professor_id") REFERENCES "Professor"("professor_id");
ALTER TABLE
    "Syllabus" ADD CONSTRAINT "syllabus_subject_id_foreign" FOREIGN KEY("subject_id") REFERENCES "Subject"("subject_id");
ALTER TABLE
    "Syllabus" ADD CONSTRAINT "syllabus_course_id_foreign" FOREIGN KEY("course_id") REFERENCES "Course"("course_id");
ALTER TABLE
    "Review" ADD CONSTRAINT "review_teach_id_foreign" FOREIGN KEY("teach_id") REFERENCES "Teach"("teach_id");
ALTER TABLE
    "Teach" ADD CONSTRAINT "teach_subject_id_foreign" FOREIGN KEY("subject_id") REFERENCES "Subject"("subject_id");