const express = require('express');
const server = express();
server.use(express.json());

/* CONST DECLARATIONS*/
    let numberOfReq = 0;
    const projects = [];


/* VALIDATIONS */
// Contagem de Requisiçoes
// Verifica se existe um projeto com esse id
function checkProjectIdExist(req,res,next){
    const { id } = req.params;
    const project =  projects.find(p => p.id == id);

    if(!project){
        return res.status(400).json({error: "Nao existe nenhum projeto com esse id"});
    }
    return next();
}
// Retorna o numero de requisicoes
function logRequest(req,res,next){
    numberOfReq++;
    console.log(`Numero de Requisiçoes: ${numberOfReq}`);
    return next();
}
server.use(logRequest);



/* ROUTES */
// Cria novo projeto
server.post('/projects', (req,res,next) => {
    const {id,title} = req.body;
    const project = {
        id,
        title,
        tasks: []
}   ;
    projects.push(project);
    return res.json(projects);
})
// Retorna todos os projetos
server.get('/projects', (req,res) => {
    return res.json(projects);
})
// Retorna um projeto
server.get('/projects/:id', (req,res) => {
    const {id} = req.params;
    const project = projects.find(p => p.id == id);

    return res.json(project);
})
// Altera apenas o titulo do projeto com um id especifico
server.put('/projects/:id', checkProjectIdExist, (req,res) => {
    const {id} = req.params;
    const {title} = req.body;

    const project =  projects.find(p => p.id == id);
    project.title = title;

    return res.json(project);
})
// Deletar o projeto de um id especifico
server.delete('/projects/:id', checkProjectIdExist, (req,res) => { 
    const {id} = req.params;
    const index =  projects.findIndex(p => p.id == id);

    projects.splice(index,1);

    return req.send();
})
// Adiciona uma nova tarefa a um projeto de um id especifico
server.post('/projects/:id/tasks', checkProjectIdExist, (req,res) => {
    const {id} = req.params;
    const {title} = req.body;

    const project =  projects.find(p => p.id == id);
    project.tasks.push(title);

    return res.json(project);
})



server.listen(4000);