const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://granjamatinha:matinha@cluster0.te0mg.mongodb.net/mySecondDatabase?retryWrites=true&w=majority')
.then( response => {
    console.log('Connected to mongodb database ...');
})
.catch( err => {
    console.error(err.message);
})

app.get('/', (req,res) => {
    res.send('Homepage da api');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});