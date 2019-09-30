// implement your API here

const express = require('express');

const dataBase = require('./data/db')

const server = express()

server.get('/api/users',(req, res) => {
    dataBase.find()
    
    .then(users => {
        res.json(users)
    })
    .catch(err => console.log(err))
})

server.get('/api/users/:id', (req, res) => {
    
    //define the id from the request
    const id = req.params.id
    
    //
    dataBase.findById(id)
    .then(user => {
        res.json(user)
    })
    
    .catch((err => console.log(err)))
})

server.post('/api/users', (req, res) => {
    const dbUser = req.body

    dataBase.insert(dbUser)
    .then(user => {
        res.json(user)
    })

    .catch(err => console.log(err))
})


server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id

    dataBase.remove(id)
    .then(user => {
        res.json(user)
    })
    .catch(err => console.log(err))
})



const port = '5000'

server.listen(port, () => console.log(`\nServer listening on port ${port}\n`))