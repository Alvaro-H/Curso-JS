'use strict'

//Cargar módulos de node para crear el servidor
var express = require('express');
var bodyParser = require('body-parser');

//Ejecutar express (http)
var app = express();

//Cargar ficheros rutas
var article_routes = require('./routes/article');

//Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//CORS

//Añadir prefijos a rutas
app.use('/api', article_routes);

//Exportar modulo (fichero actual.)
module.exports = app;