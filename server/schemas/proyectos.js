const mongoose = require ('mongoose');
const moment = require('moment-timezone');
const dateColombia = moment.tz(Date.now(), "America/Bogota");


const {Schema} = mongoose;

const proyectSchema = new Schema({
    titulo: {type: String, required: true},
    descripcion: {type: String, required: true},
    creador: {type: String, required: true},
    creadorId: {type: String, required: true},
    timeStamp: {type : Date, required: true},

});

module.exports = mongoose.model('proyecto', proyectSchema);
