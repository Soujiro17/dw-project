const { MONGODB_URI } = require('../const/const.js');
const mongoose = require('mongoose');
const Usuario = require('../models/usuario');

mongoose.connect( MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
} ).catch(error => console.log(error));

const connection = mongoose.connection;

connection.once('open', () =>{
    console.log('MongoDB is connected');
});

