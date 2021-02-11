'use strict'

var validator = require('validator');

var fs = require('fs');
var path = require('path');
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
        }else{
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son validos.'
            });
        }
    },

    getArticles: (req, res) => {
        var query = Article.find({});
        var last = req.params.last;
        if(last || last != undefined){
            query.limit(5);
        }
        // Find
    query.sort('-id').exec((err, articles)=>{
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
    },

    getArticle: (req, res) => {

        //Recoger la id de la url
        var articleId = req.params.id;

        //Comprobar que existe
        if(!articleId || articleId == null){
            return res.status(404).send({
                status: 'error',
                message: 'No existe el arículo!'
            });
        }

        //Buscar el articulo
        Article.findById(articleId, (err, article)=>{
            if(err || !article){
                return res.status(404).send({
                    status: 'error',
                    message: 'No existen el artículo!'
                });
            }
            //Devolver el json
            return res.status(200).send({
                status: 'success',
                article
            });
        });
    },

    update: (req, res)=> {

        //Recoger el Id del articulo por la url
        var articleId = req.params.id;
        
        //recoger los datos por put
        var params = req.body;

        //Validar los datos
        try{
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar!'
            });
        }
        if(validate_title && validate_content){
            //Find and update
            console.log(articleId);
            Article.findOneAndUpdate({_id: articleId}, params, {new:true}, (err, articleUpdated) => {
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar!'
                    });
                }

                if(!articleUpdated){
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el artículo!'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    article: articleUpdated
                });
            });
        }else{
            return res.status(200).send({
                status: 'error',
                message: 'La validación no es correcta!'
            });
        }
    },

    delete: (req, res) => {
        //Recoger id de la url
        var articleId = req.params.id;

        //Hacer un find and delete
        Article.findOneAndDelete({_id: articleId}, (err, articleRemoved) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar!'
                });
            }
            
            if(!articleRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'No se ha borrado el articulo. Puede que no exista!'
                });
            }
        });
        return res.status(200).send({
            status: 'success',
            message: 'El artículo ' + articleId + ' ha sido eliminado!'
        });
    },

    upload: (req, res) =>{
        //Configurar el modulo connect multiparty en routes/article.js

        //Recogemos el fichero de la peticio
        var file_name = 'Imagen no subida.';
        
        if(!req.files){
            return res.status(404).send({
                status: 'error',
                message: file_name
            });
        }

        //Tomamos nombre y extension
        var file_path = req.files.file0.path;
        var file_split = file_path.split('\\');

        //Comprobamos que sea una imagen mediante extension
        var file_name = file_split[2];

        //Extension del fichero
        var extension_split = file_name.split('\.');
        var file_ext = extension_split[1];
        
        //Si no es valida borramos fichero
        if(file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif' ){
            //Borra el archivo
            fs.unlink(file_path, (err) =>{
                return res.status(200).send({
                    status: 'error',
                    message: 'La extension de la imagen es inválida',
                });
            });
        }else{
            //Si es válida, id del la url
            var articleId= req.params.id;
            //buscamos el articulo  y le asignamos nombre y imagen
            Article.findOneAndUpdate({_id: articleId}, {image: file_name}, {new:true}, (err, articleUpdated) =>{
                
                if(err || !articleUpdated){
                    return res.status(200).send({
                        status: 'error',
                        message: 'Error al guardar la imagen del artículo!'
                    });
                }
                
                return res.status(200).send({
                    status: 'success',
                    article: articleUpdated
                });
            });
        }
    },//End upload file

    getImage: (req, res) => {
        var file = req.params.image;
        var path_file = './upload/articles/'+ file;
        fs.exists(path_file, (exists) => {
            console.log(exists);
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(404).send({
                    status: 'error',
                    message: 'La imagen no existe!'
                });
            }
        });
    },

    search: (req, res) => {
        //Sacar el string a buscar
        var searchString = req.params.search;
        //Find or
        Article.find({ "$or":[
            {"title": { "$regex": searchString, "$options": "i"}},
            {"content": { "$regex": searchString, "$options": "i"}}
        ]})
        .sort([['date', 'descending']])
        .exec((err, articles) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error en la peticion!'
                });
            }
            if(!articles || articles.length <= 0){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay articulos que mostrar!'
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