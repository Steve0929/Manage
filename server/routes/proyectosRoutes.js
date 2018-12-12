const express = require ('express');
const router = express.Router();
const proyecto = require ('../schemas/proyectos.js');
require('../passJWT');
const passport = require ('passport');

router.get('/', (req,res) =>{
  res.json({
    status: 'Beep Bop...'
   });
  }
)

//, passport.authenticate('jwt', { session: false }),

router.get('/api/proyectos/', function(req, res, next) {
    passport.authenticate('jwt', { session: false }, async function(err, user, info) {
    //Errors:
    if (err) {return next(err);}
    if (!user) {console.log(info); return res.json({auth: 'false', info: info.name});}
    //Succes:
    const proyectos = await proyecto.find();
    res.json({proyectos: proyectos , auth: 'true'});
  })(req, res, next);
});



router.post('/api/crearproyecto', function(req, res, next) {
    passport.authenticate('jwt', { session: false }, async function(err, user, info) {
    //Errors:
    if (err) {return next(err);}
    if (!user) {console.log(info); return res.json({auth: 'false', info: info.name});}
    //Succes:
    console.log(req.body);
    const {titulo, descripcion,creadorNombre,creadorApellido,creadorId,timeStamp,avance} = req.body;
    const proyectoAñadir = new proyecto({titulo,descripcion,creadorNombre,creadorApellido,creadorId,timeStamp,avance});
    await proyectoAñadir.save();
    res.json({auth: 'true', creado: 'true'});
  })(req, res, next);
});


router.get('/api/proyectos/:id', function(req, res, next) {
    passport.authenticate('jwt', { session: false }, async function(err, user, info) {
    //Errors:
    if (err) {return next(err);}
    if (!user) {console.log(info.name); return res.json({auth: 'false', info: info.name});}
    //Succes:
    const unproyecto = await proyecto.findById(req.params.id);
    console.log(req.isAuthenticated());
    res.json({proyecto: unproyecto , auth: 'true'});
  })(req, res, next);
});


router.put('/api/proyectos/:id', function(req, res, next) {
    passport.authenticate('jwt', { session: false }, async function(err, user, info) {
    //Errors:
    if (err) {return next(err);}
    if (!user) {console.log(info.name); return res.json({auth: 'false', info: info.name});}
    //Succes:
    const {titulo, descripcion,creadorNombre,creadorApellido,creadorId,timeStamp,avance,acciones} = req.body;
    const updatedProyect = {titulo, descripcion,creadorNombre,creadorApellido,creadorId,timeStamp,avance,acciones};
    await proyecto.findByIdAndUpdate(req.params.id, updatedProyect);
    const unproyecto = await proyecto.findById(req.params.id);
    res.json({proyecto: unproyecto , auth: 'true', actualizado: 'true'});
  })(req, res, next);
});


router.delete('/api/proyectos/:id', function(req, res, next) {
    passport.authenticate('jwt', { session: false }, async function(err, user, info) {
    //Errors:
    if (err) {return next(err);}
    if (!user) {console.log(info); return res.json({auth: 'false', info: info.name});}
    //Succes:
    await proyecto.findByIdAndRemove(req.params.id);
    const updatedProyects = await proyecto.find();
    res.json({eliminado: 'true' , auth: 'true', updatedProyects: updatedProyects});
  })(req, res, next);
});


module.exports = router;
