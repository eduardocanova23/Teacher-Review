SET check_function_bodies = false;

/* Table 'Professor' */
CREATE TABLE "Professor"(
  id serial NOT NULL,
  professor_name varchar,
  professor_m1 int,
  professor_m2 int,
  professor_m3 int,
  PRIMARY KEY(id)
);

