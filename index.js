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

app.post('/estoque', (req,res) => {
    const data = req.body;
    const modelInstance = new dataModel({
        name : data.name,
        quantity : data.quantity
    })

    modelInstance.save()
    .then( () => {
        console.log('Dado salvo em banco de dados com sucesso!');
        res.send("Item salvo com sucesso!");
    })
    .catch( err => {
        console.error(err);
    })
})

app.get('/estoque/:id', async (req,res) => {
    const index = req.params.id;
    const items = await readDatabase();
    const filteredItems = items.filter( item => {
        return item._id == index;
    })
    res.send(filteredItems);
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

async function readDatabase(){
    const result = await dataModel.find({})
    return result;
}