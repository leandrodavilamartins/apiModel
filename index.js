const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json()); // middleware que permite acessar objetos json no corpo da requisição 

mongoose.connect('mongodb+srv://granjamatinha:matinha@cluster0.te0mg.mongodb.net/Estoque6?retryWrites=true&w=majority')
.then( response => {
    console.log('Connected to mongodb database ...');
})
.catch( err => {
    console.error(err.message);
})

const dataSchema = new mongoose.Schema({ // cria schema para o model 
    name: String,
    quantity : Number
})

const dataModel = mongoose.model('items', dataSchema); // cria model 


app.get('/', (req,res) => { // home page 
    res.send('Homepage da api');
});

app.get('/about', (req,res) => {  // página about 
    res.send('About page');
})

app.get('/estoque', (req,res) => { // retorna estoque 
    dataModel.find({})
    .then( response => {
        res.json(response);
    })
    .catch( err => {
        console.error(err);
    })
})

app.post('/estoque', (req,res) => { // adiciona item ao estoque 
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

app.get('/estoque/:id', async (req,res) => { // retorna item do estoque 
    const index = req.params.id;
    const items = await readDatabase();
    const filteredItems = items.filter( item => {
        return item._id == index;
    })
    res.send(filteredItems);
})

app.put('/estoque/:id', (req,res) => { // atualiza item de estoque 
    const index = req.params.id;
    const data = req.body;
    dataModel.findByIdAndUpdate(index, {name: data.name, quantity: data.quantity})
    .then(() => { 
        console.log('Atualização realizada com sucesso !');
        res.send('Atualização de item realizada com sucesso !');
    })
    .catch( err => {
        console.log('Não foi possível atualizar item !');
    })
})

app.delete('/estoque/:id', (req,res) => { // deleta item de estoque 
    const index = req.params.id;
    dataModel.findByIdAndDelete(index)
    .then( () => {
        console.log("Item removido com sucesso !");
        res.send("Item removido com sucesso !");
    })
    .catch( err => {
        res.send("Não foi possível remover item !");
    })
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

async function readDatabase(){
    var result = [];
    result = await dataModel.find({})
    return result;
}