require('dotenv').config();

const cors = require('cors');
const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8080';
        this.cors();
        this.middlewares();
        this.routes();
        this.initDataBase();
    }

    middlewares(){
        this.app.use(express.static('public'));
        this.app.use(express.json());

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            debug:true
        }));
    }

    routes(){
        this.app.use('/upload',require('../routes/upload.routes'))
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Listening on port',this.port);
        });
    }

    cors(){
        this.app.use(cors());
    }

    initDataBase(){
        mongoose.connect('mongodb://localhost:27017/uploader-db', {
            useNewUrlParser: true,
            useUnifiedTopology: true,}); 
    }
}

module.exports = Server;