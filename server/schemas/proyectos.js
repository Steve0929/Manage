const mongoose = require ('mongoose');
const moment = require('moment-timezone');
const dateColombia = moment.tz(Date.now(), "America/Bogota");


const {Schema} = mongoose;

const proyectSchema = new Schema({
    titulo: {type: String, required: true},
    descripcion: {type: String, required: true},
    creadorNombre: {type: String, required: true},
    creadorApellido: {type: String, required: true},
    creadorId: {type: String, required: true},
    timeStamp: {type : Date, required: true},
    avance: {type: Number, default: 0, require: true },
    acciones: [{titulo: String, accion: String, estado: Number}],
    milestones: [{milestone: String, completado: Boolean, horas: Number , actividades: [{actividad: String, horas: Number, completado: Boolean, timeStamp: Date}]}],
    involucrados: [{nombre: String, apellido: String, rol: String, identifier: Schema.ObjectId, _id: false}],
    logs: [{timeStamp: Date, totalHorasDia: Number, actividades: [{actividad: String}]} ],
    totalHoras: {type: Number, default: 0, require: true },
    horasCompletadas: {type: Number, default: 0, require: true },

});

module.exports = mongoose.model('proyecto', proyectSchema);
