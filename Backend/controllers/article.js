'use strict'

var validator = require('validator');
var Article = require('../models/article');

var controller= {

    datosWeb: (req, res) => {
        var param = req.body.param;

        return res.status(200).send({
           curso: 'Master en Frameworks Js',
           autor: 'Alvaro Huerta Aladrén', 
           url: 'http://ahonline.es/',
            param
        });
    },

    test: (req, res) =>{
        return res.status(200).send({
            message: 'Soy la accion test de mi controlador de artículos'
        });
    },

    /*
    * Los parametros que hay que enviarle son:
    * Tittle
    * Content
    */   
    save: (req, res) => {
        //Recogemos parametros de post
        var params = req.body;

        //Validar datos (validator)
        try{
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        } catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            });
        }     
        if(validate_title && validate_content){
            //Crear el objeto a guardar
            var article = new Article();

            //Asignar valores
            article.title = params.title;
            article.content = params.content;
            article.image=null;

            //Guardar articulo
            article.save((err, articleStored)=> {
                
                if(err || !articleStored){
                    return res.status(404).send({
                        status: 'error',
                        message: 'El articulo no se ha guardado!'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    article: articleStored
                });
            });

            // //Devolver articulo
            // return res.status(200).send({
            //     status: 'success',
            //     article
            // });
        }else{
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son validos.'
            });
        }
    },

    getArticles: (req, res) => {
        // Find
        Article.find({}).exec((err, articles)=>{
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los articulos!'
                });
            }
            if(!articles){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay articulos para mostrar!'
                });
            }

            return res.status(200).send({
                status: 'success',
                articles
            });
        });
    }
};//End controller

module.exports = controller;