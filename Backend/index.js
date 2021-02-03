'use strict'

var mongoose = require('mongoose');

var app = require('./app');
var port = 3900;

mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/api_rest_blog', {useNewUrlParser: true})
    .then(()=>{
        console.log('La conexion ha la base de datos se ha realizado con exito.');
        //Crear servidor y ponerme a escuchar peticiones Http
        app.listen(port, () =>{
            console.log('Server working on http://localhost:' + port);
        });
    });