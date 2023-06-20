## Carrasco x Mamata

### Introdução

O projeto está no contexto da disciplina de Programação Avançada e tem como objetivo principal a criação de uma Aplicação Web que resolva um problema real, utilizando tanto os princípios SOLID quanto os padrões de projeto estudados em aula. 

#### Como Executar o código

Para executar, é necessário renomear a pasta "example.env" para apenas ".env". Em seguida, é preciso lenvantar o container, utilizando o Docker. Basta executar o comando abaixo no diretório raiz do projeto: 

```
    docker compose up --build
```


### Problema x Solução
  Atualmente, a taxa de evasão nos cursos de engenharia na UFRJ é extremamente alta. Isso se dá por diversos motivos, seja pelo despreparo dos calouros em relação a matemática básica, pelo choque causado pelo ciclo básico ou pela insatisfação dos alunos com os professores. Além disso, não existe um bom canal de feedback entre os alunos e professores para que os estes tenham noção de como suas aulas estão sendo recebidas pelos alunos e quais aspectos devem ser melhorados para potencializar o aprendizado.

A solução proposta consiste em uma aplicação que permite que os alunos façam avaliações dos professores. As avaliações são específicas à tupla professor-matéria e em cada submissão, o aluno fornece uma breve descrição de sua experiência com o professor na matéria, além de definir uma nota de 0 a 5 em cinco métricas diferentes. Cada uma das métricas tem como objetivo representar o nível de satisfação dos alunos em relação com um aspecto específico da aula, sendo elas: Didática, organização, empatia, pontualidade e mamata. Ademais, a média de cada métrica para todas as avaliações do professor é exibida na página do professor, juntamente com uma lista das matérias lecionadas por ele e algumas das avaliações mais recentes direcionadas a ele.

As informações fornecidas pela aplicação têm como objetivo permitir que os alunos tenham uma ideia melhor sobre o que esperar das aulas ao escolher seus professores, garantindo que tenham uma experiência mais compatível com suas expectativas e façam escolhas informadas. Dessa forma, espera-se que os alunos façam melhores escolhas durante a inscrição em disciplinas, gerando um impacto positivo na taxa de evasão tanto nas engenharias quanto nos demais cursos.

### Tecnologias utilizadas

Para decidir quais tecnologias seriam utilizadas em cada etapa do projeto, mais de um fator foi levado em consideração. O  primeiro requisito foi que as ferramentas escolhidas  fossem fáceis de aprender e familiares a uma parte do grupo, permitindo que o processo de desenvolvimento fosse antecipado. Em segundo lugar, escolhemos tecnologias com comunidades grandes. Isso não só permitiu que encontrássemos soluções para eventuais dúvidas e erros de forma mais rápida, mas também que encontrássemos módulos e bibliotecas prontos para reuso na nossa implementação.

A aplicação foi desenvolvida através de um **container** que foi dividido em 3 imagens: **Backend**, **Frontend** e **Banco de dados**. Além disso, criamos um módulo de **Web Scraper** que preenche os dados do banco. Por fim, montamos testes unitários para as rotas criadas e versionamos o código com um repositório remoto. Cada um desses processos será descrito de forma detalhada, explicitando as tecnologias utilizadas na implementação.

#### Containerização

Uma grande preocupação deste projeto foi garantir que todos os integrantes do grupo fossem capazes interagir com o código em máquina diferentes. Por isso, escolhemos utilizar o **Docker** para criar um **container** que encapsulasse o ambiente de desenvolvimento da aplicação. Essa tecnologia também será essencial para, futuramente, agilizar o **deploy**.

#### Backend

No **Backend** da aplicação, estão as rotas que vão permitir a comunicação com o **Frontend**. Elas trazem a dinamicidade do serviço, permitindo que informações sejam recuperadas e inseridas no banco.  Para implementar essas tarefas, escolhemos utilizar a linguagem de programação **Python** com o framework **Flask**. Isso porque sua estrutura simples é ideal para soluções em que não há necessidade de uma arquitetura complexa por trás. Ademais, a interação entre o **Banco de Dados** e o **Backend** foi desenvolvida a partir do framework **SQLAlchemy** que garante alto desempenho e segurança nos acessos. 

#### Scraper de Dados

Neste projeto, utilizamos as informações do Siga para preencher o **Banco de Dados**, através de um **Scraper** que buscava, no site, informações como: código e nome das disciplinas, nome dos professores e grade horária dos cursos. Novamente, o **Python** foi a linguagem escolhida, pois nos aproveitamos das vantagens oferecidas pelo paradigma de orientação a objetos e  pelas bibliotecas prontas dedicadas a esse tipo de problema. 

Dessa forma, montamos uma hierarquia de classes que implementam as buscas nas **urls** de interesse, utilizando sobretudo o pacote **Requests** e o pacote **Beautiful Soup**. Em seguida, através da biblioteca **Pandas**, o dado foi manipulado para criar estruturas que pudessem ser inseridas diretamente nas tabelas do banco.

#### Banco de Dados

Neste projeto, optamos pelo uso do **Postgres** que é um **Banco de Dados** relacional, a fim de facilitar a codificação e recuperação do relacionamento entre os professores, os cursos, as disciplinas e as avaliações. A modelagem to banco, por sua vez, foi feita por meio do site **drawsql** (https://drawsql.app/diagrams), que torna a tarefa visual e interativa, gerando automaticamente a *query* de criação das tabelas de acordo com o que foi desenhado. 

#### Frontend
O **Frontend** da aplicação tem como papel ser a interface visual em que o usuário irá interagir. Na sua implementação, escolhemos utilizar a linguagem de programação **Javascript** com o framework **React**. Isso porque essa biblioteca minimiza o número de operações que custam processamento de DOM, principalmente, quando tratamos de renderização e alteração de elementos na interface. Além disso, **React** fornece elementos que facilitam a implementação dos princípios **S.O.L.I.D.** como componentes, props, state e virtual DOM.


#### Controle de Versão

Com o intuito de organizar a produção do código pelos integrantes, criamos um repositório **Git** e hospedamos na plataforma **GitHub**. O  **Git** é uma tecnologia de  versionamento que possibilita a criação de ramificações (**branches**) do código que podem ser mescladas de forma controlada. Essa propriedade é importante para paralelizar a programação do trabalho.
