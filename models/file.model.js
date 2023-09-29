const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const File = new Schema({
    fecha: Date,
    nombre: String,
    url: String
});

module.exports = mongoose.model('File', File);