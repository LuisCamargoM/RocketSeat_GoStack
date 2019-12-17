# RocketSeat_GoStack  
  Curso da RocketSeat

# Modulo 1.1 | Ambiente e conceitos Node JS
    - Segurança no Node JS 
    - CRUD

# Modulo 1.2 | Continuaçao Node JS
    - Query, Route, body  
    - Segurança no Node JS 
    - CRUD

# Desafio da RocketSeat
Feito: 3minutos e 48s

# Modulo 2.1 | Debug, Docker, PostGres
    - Docker: Criaçao de Ambientes Isolados(container) (5432)
    - PostGres: Banco de dados
    - Sequelize:
        - ORM: Abstraçao de banco de dados
            Tabelas viram models
            Sem SQL
        - Migrations
            Controle de versao para BD
                Manter atualizada a base de dados( Ambiente de desenvolvimento, Ambiente de producao)
                Atraves de Arquivo
                1 arquivo por tabela
        - Seeds
            Populacao da base de dados para desenvolvimentos/testes
            Executavel por codigo SOMENTE
            Caso precisem ser adicionados para producao, faça atravez da migration
        - MVC
                Model: 
                    Armazena a abstracao do Banco de dados, utilizado para manipular os dados contidos nas tabelas
                    Nao possuem responsabilidade sobre a regra de negocio da aplicacao
                Controller
                    É o ponto de entrada das requisicoes da nossa aplicacao, uma rota geralmente esta associada diretamente com um metodo
                    do controller
                    Cria-se apenas com 5 metodos
                        index() //Listagem de Usuarios
                        show() //Exibir um unico usuario
                        store() //Cadastro usuario
                        update() //Alterar usuario
                        delete() //Deletar usuario
                View
                    É o retorno ao cliente, em aplicacoes que nao utilizando o modelo de API REST isso pode serum html
                    Neste caso, nossa view ,é apenas nosso JSON que sera retornado ao Front-End 
        - EsLint
        - JWT: JSON WEB TOKEN
            É um autenticador de sessoes
              x1.x2.x3  
                -> X1: Define o tipo de algoritmo
                -> X2: Obtem informacoes adicionais(id,nome,email....)
                -> x3: Assinatura deste autenticador