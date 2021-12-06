const { MONGODB_URI } = require('../const/const.js');
const mongoose = require('mongoose');

mongoose.connect( MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
} ).catch(error => console.log(error));

const connection = mongoose.connection;

connection.once('open', () =>{
    console.log('MongoDB is connected');
});
<<<<<<< HEAD

=======
>>>>>>> 66cc81192e0c34c883478b9eec710a010974f5ac

