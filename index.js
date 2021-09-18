const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

mongoose.connect('mongodb+srv://granjamatinha:matinha@cluster0.te0mg.mongodb.net/Estoque6?retryWrites=true&w=majority')
.then( response => {
    console.log('Connected to mongodb database ...');
})
.catch( err => {
    console.error(err.message);
})

const dataSchema = new mongoose.Schema({
    name: String,
    quantity : Number
})

const dataModel = mongoose.model('items', dataSchema);


app.get('/', (req,res) => {
    res.send('Homepage da api');
});

app.get('/about', (req,res) => {
    res.send('About page');
})

app.get('/estoque', (req,res) => {
    dataModel.find({})
    .then( response => {
        res.json(response);
    })
    .catch( err => {
        console.error(err);
    })
})


app.listen(3000, () => {
    console.log('Listening on port 3000');
});