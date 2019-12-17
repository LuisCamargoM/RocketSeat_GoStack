const express = require('express');
const server = express();

server.use(express.json());

/* 
    Query Params: ?teste=1
    Route Params: /teste/1
    Request Body: { "name" : "Luis", "email" : "luis.e.c.mendoza@gmail.com"}   
*/

const users = ["Luis", "Andressa", "Thiago"];

    server.use((req,res,next) => {
        console.time('Request');
        console.log(`Método: ${req.method} | URL: ${req.url}`);
        
        next();

        console.log('Execuçao Final');
        console.timeEnd('Request');
    });

    function checkUserExists(req,res,next){
        if(!req.body.name){
            return res.status(400).json({error : "User not found on request body!"});
        }

        return next();
    }
    function checkUserInArray(req,res,next){
        const user = users[req.params.index];
        if(!user){
            return res.status(400).json({error : "User does not exists !"});
        }

        req.user = user;
        return next();
    }

    // Read
    server.get('/users', (req,res) => {
        return res.json(users); 
    });

    server.get('/users/:index',checkUserInArray, (req,res) => {
        return res.json(req.user);
    })

    // Create
    server.post('/users',checkUserExists, (req,res) => {
       const { name } = req.body;
       users.push(name);

       return res.json(users);
    });

    // Editar
    server.put('/users/:index', checkUserInArray,checkUserExists, (req,res) => {
        const { name } = req.body;
        const { index} = req.params;

        users[index] = name;
        return res.json(users);
    });    
    // Deletar
    server.delete('/users/:index',checkUserExists, (req,res) => {
        const { index} = req.params;
        
        //users.splice(index,1);

        return res.send(`Usuario de index ${index} foi deletado com sucesso!`);
    })

server.listen(3000)