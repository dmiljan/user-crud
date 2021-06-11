const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/getAll', (request, response) => {
    const db = dbService.create();

    db.getAllData()
        .then(data => response.json(data))
        .catch(err => console.log(err));
});

app.post('/insert', (request, response) => {
    // console.log(request.body);
    const {name, title} = request.body;
    const db = dbService.create();

    db.insertNewUser(name, title)
        .then(data => response.json({data: data}))
        .catch(err => console.log(err));
});

app.delete('/delete/:id', (request, response) => {
    const {id} = request.params;
    const db = dbService.create();

    db.deleteRowById(id)
        .then(data => response.json({data}))
        .catch(err => console.log(err));
});

app.get('/search/:name', (request, response) => {
    const {name} = request.params;
    const db = dbService.create();

    db.searchByName(name)
        .then(data => response.json(data))
        .catch(err => console.log(err));
});

app.patch('/update', (request, response) => {
    const {id, name, title} = request.body;
    const db = dbService.create();

    db.updateNameById(id, name, title)
        .then(data => response.json({success: data}))
        .catch(err => console.log(err));
});

app.listen(process.env.PORT, () => {
    console.log('app is running');
});