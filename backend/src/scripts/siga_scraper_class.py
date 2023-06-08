import requests
from bs4 import BeautifulSoup
import pandas as pd

# Classe abstrata para os scrappings do siga
class siga_scraper():
    def __init__(self):
        self.default_url = 'https://www.siga.ufrj.br/sira/'
    def _generate_soup(self, sub_url):
        try:
            response = requests.get(self.default_url + sub_url)
            soup = BeautifulSoup(response.text, 'html.parser')
            return soup
        except:
            raise Exception("Bad Request")

# Scrapper das grades horárias do siga (2023.1)
class siga_grande_scraper(siga_scraper):
    def _process_grade_info(self, greade_info, table_rows):
        for row in table_rows:
                cells = row.find_all('td')
                if len(cells) > 0:
                    codigo = cells[0].text.strip()
                    professor = cells[5].text.strip()
                    if codigo == 'Código':
                            continue
                    elif codigo and professor:
                            greade_info.append([codigo, professor])
    def get_grande_info(self, courses):
        greade_info = []
        for cur in courses:
                name, id = cur
                course_soup = self._generate_soup('gradeHoraria/' + id) 
                table_rows = course_soup.find_all('tr', class_=['tableBody1', 'tableBody2'])
                self._process_grade_info(greade_info, table_rows)
        
        # print(f'Complete course: {name}')
        grade_info_df = pd.DataFrame(greade_info, columns=['code', 'professor'])

        return grade_info_df

 
 
# Scraper dos currículos do Siga
class siga_curriculum_scraper(siga_scraper):
    # Processa cada uma das linhas da lista de currículos, obtendo o último (mais recente) currículo do curso
    def _process_course_ids(self, course_ids, table_rows):
        for row in table_rows:
            course_name = row.find('b').text.replace('\n', '')
            course_links = row.find_all('a')
            if len(course_links) > 0:
                last_a_tag = row.find_all('a')[-1]
                course_ids[f'{course_name}'] =  str(last_a_tag).split('.html')[0].split('curriculo/')[1]

    # Processa cada linha do currículo, obtendo a informação do código e do nome do curso
    def _process_course_info(self, subject_info, name, table_rows):
        for row in table_rows:
            columns = row.find_all('td')
            code = columns[0].find('a')
            if code:
                code = code.text
                subj_name = columns[1].text
                subject_info.append([code,  subj_name, name])


    # Associa a cada curso o link do seu currículo
    def _get_course_ids_curriculo(self):
        course_ids = {}
        sub_urls = [
            'repositorio-curriculo/AC3274D7-762A-497B-B5C5-EE2117F2A096.html',
            'repositorio-curriculo/80167CF7-3880-478C-8293-8E7D80CEDEBE.html'
        ]
        for su in sub_urls:
            course_soup = self._generate_soup(su)
            table_rows = course_soup.find_all('tr', class_=['tableTitleBlue', 'tableBodyBlue2'])
            self._process_course_ids(course_ids, table_rows)
            
        return course_ids

     # A partir do currículo do curso, obtém as informações sobre as disciplinas 
    def get_subject_info(self):
        subject_info = []
        course_ids = self._get_course_ids_curriculo()
        for name, id in list(course_ids.items()):
            first_page = self._generate_soup("repositorio-curriculo/" + id + ".html")
            src_curriculum = first_page.find('frame', {"name":"frameDynamic"}).get('src')
            curr_soup = self._generate_soup('repositorio-curriculo/' + src_curriculum)
            tables = curr_soup.find_all('table', {'class': 'lineBorder'})[1:]
            for tb in tables:
                table_rows = tb.find_all('tr', {'class': ['tableBodyBlue2', 'tableBodyBlue1']})
                self._process_course_info(subject_info, name, table_rows)
            # print('Complete course', name)

        subject_info_df = pd.DataFrame(subject_info, columns=['code', 'subject_name', 'course_name'])
        subject_info_df = subject_info_df.drop_duplicates()
        return subject_info_df
