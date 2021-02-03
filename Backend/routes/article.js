'use strict'

var express = require('express');
var ArticleController = require('../controllers/article');

var router = express.Router();

// Rutas de prueba
router.get('/test', ArticleController.test);
router.post('/datosWeb', ArticleController.datosWeb);

//Rutas utiles
router.post('/save', ArticleController.save);
router.get('/articles', ArticleController.getArticles);

module.exports = router;