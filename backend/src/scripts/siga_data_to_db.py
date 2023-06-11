import pandas as pd
import sqlalchemy as sql

class insert_into_db():
    def __init__(self, connection):
        self.conn = connection
    
    def _insert_dataframe(self, df, table_name):
        df.to_sql(table_name, self.conn, if_exists="append", index=False)
        print(f"Insert {table_name} table")
        print(df.head())
        print("Number of lines inserted", df.shape)

        return df
    
    def insert_subject(self, subject_info, grade_df):
        subject_df = subject_info.merge(grade_df, how='inner', on='code').loc[:, ['code', 'subject_name']]
        subject_df = subject_df.rename(
            columns={
                'subject_name': 'name'
            }
        )
        subject_df = subject_df.drop_duplicates(subset=['code'])
        subject_df['subject_id'] = [i for i in range(1, subject_df.shape[0]+1)]
        return self._insert_dataframe(subject_df, "Subject")
   
    def insert_professor(self, grade_df):
        un_professors = grade_df['professor'].unique()
        professor_df = pd.concat([pd.Series(un_professors), pd.Series([i for i in range(1, len(un_professors) + 1)])], axis=1)
        professor_df = professor_df.rename(columns={
            0:"name", 
            1:"professor_id"
        })
        return self._insert_dataframe(professor_df, "Professor")

    def insert_course(self, subject_info):
        un_courses = subject_info['course_name'].unique()
        courses_df = pd.concat([pd.Series(un_courses), pd.Series([i for i in range(1,len(un_courses)+1)])], axis=1)
        courses_df = courses_df.rename(columns={
            0: "name",
            1: "course_id"
        })
        return self._insert_dataframe(courses_df, "Course")
    def insert_teach(self, grade_df, professor_df, subject_df, period):
        teach_df = grade_df.merge(professor_df, left_on="professor", right_on="name")
        teach_df = teach_df.merge(subject_df.loc[:, ['code', 'subject_id']], on="code")
        teach_df = teach_df.drop_duplicates(subset=['subject_id', 'professor_id'])
        teach_df['period'] = period
        teach_df['teach_id'] = [i for i in range(1, teach_df.shape[0]+1)]
        teach_df = teach_df.loc[:,['teach_id', 'period', 'subject_id', 'professor_id']]
        return self._insert_dataframe(teach_df, "Teach")

    def insert_syllabus(self, subject_info, subject_df, courses_df):
        syllabus_df = subject_info.merge(subject_df, left_on='subject_name', right_on='name')
        syllabus_df = syllabus_df.merge(courses_df, left_on='course_name', right_on='name')
        syllabus_df = syllabus_df.loc[:, ['course_id', 'subject_id']].drop_duplicates()
        syllabus_df['syllabus_id'] = [i for i in range(1, syllabus_df.shape[0]+1)]
        return self._insert_dataframe(syllabus_df, "Syllabus")