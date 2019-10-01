// implement your API here

const express = require('express');

const dataBase = require('./data/db')


const server = express()

server.use(express.json());

server.get('/api/users',(req, res) => {
    dataBase.find()
    
    .then(users => {
        res.json(users)
    })
    .catch(err => res.status(500).json({error: "The users information could not be retrieved."}))
})

server.get('/api/users/:id', (req, res) => {
    
    //define the id from the request
    const id = req.params.id

        dataBase.findById(id)
        .then(user => {
            if(!user){
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }

            else res.json(user)
        })
        
        .catch(err => res.status(500).json({error: "The users information could not be retrieved."}))
})

server.post('/api/users', (req, res) => {
    
    const newUser = req.body
    
    if(!newUser.name || !newUser.bio){
        res.status(400).json({ errorMessage: 'Please provide name and bio for user' });
    }
    else{
        
        dataBase.insert(newUser)
        .then(user => {
            res.status(201).json(user)
        })
    
        .catch(err => res.status(500).json({error: "There was an error while saving the user to the database"}))
    }
})

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body
    
    if(!changes.name || !changes.bio){
        res.status(400).json({ errorMessage: 'Please provide name and bio for user' });
    }
    else{
        dataBase.update(id, changes)
        .then(user => {
            if(!user){
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }

            else res.status(201).json(user)
        })

        .catch(err => res.status(500).json({error: "The user information could not be modified."}))
    }
})


server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id

    dataBase.remove(id)
    .then(user => {
        if(!user){
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        }

        else res.json(user)
    })
    .catch(err => res.status(500).json({error: "The user could not be removed"}))
})

const port = '5000'

server.listen(port, () => console.log(`\nServer listening on port ${port}\n`))