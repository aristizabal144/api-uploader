require('dotenv').config();

const express = require('express');
const fileUpload = require('express-fileupload');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8080';
        this.cors();
        this.middlewares();
        this.routes();
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

    
}

module.exports = Server;