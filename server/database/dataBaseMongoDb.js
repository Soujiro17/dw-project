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
    b();
});
const b = async () => {

    try{
        const a = await new Usuario(
            { 
                rut: 123123124, 
                nombres: 'asfasdasd', 
                apellidos: 'asdasfasd', 
                contraseña: 'fasdasdasd', 
                email: '1243214123',
                telefono: 412321, 
                saldo: 312312});
        await a.save();
        console.log('aaaa');
    }catch(error){
        console.log(error);
    }
}

