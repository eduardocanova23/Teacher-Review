CREATE TABLE "Professor"(
    "professor_id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "metric1" DOUBLE PRECISION NULL,
    "metric2" DOUBLE PRECISION NULL,
    "metric3" DOUBLE PRECISION NULL,
    "metric4" DOUBLE PRECISION NULL,
    "metric5" DOUBLE PRECISION NULL,
    "metric6" DOUBLE PRECISION NULL,
    "cnt_review" BIGINT NOT NULL
);
ALTER TABLE
    "Professor" ADD PRIMARY KEY("professor_id");
CREATE TABLE "Teach"(
    "subject_id" BIGINT NOT NULL,
    "teach_id" SERIAL NOT NULL,
    "professor_id" BIGINT NOT NULL,
    "metric1" DOUBLE PRECISION NULL,
    "metric2" DOUBLE PRECISION NULL,
    "metric3" DOUBLE PRECISION NULL,
    "metric4" DOUBLE PRECISION NULL,
    "metric5" DOUBLE PRECISION NULL,
    "metric6" DOUBLE PRECISION NULL,
    "cnt_review" BIGINT NULL
);
ALTER TABLE
    "Teach" ADD PRIMARY KEY("teach_id");
CREATE TABLE "Subject"(
    "subject_id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "code" CHAR(6) NOT NULL,
    "description" VARCHAR(255) NULL
);
ALTER TABLE
    "Subject" ADD PRIMARY KEY("subject_id");
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
    "report_time" DATE NOT NULL,
    "period" VARCHAR(8) NOT NULL
);
ALTER TABLE
    "Review" ADD PRIMARY KEY("review_id");
ALTER TABLE
    "Teach" ADD CONSTRAINT "teach_professor_id_foreign" FOREIGN KEY("professor_id") REFERENCES "Professor"("professor_id");
ALTER TABLE
    "Review" ADD CONSTRAINT "review_teach_id_foreign" FOREIGN KEY("teach_id") REFERENCES "Teach"("teach_id");
ALTER TABLE
    "Teach" ADD CONSTRAINT "teach_subject_id_foreign" FOREIGN KEY("subject_id") REFERENCES "Subject"("subject_id");