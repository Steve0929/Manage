const express = require ('express');
const router = express.Router();
const proyecto = require ('../schemas/proyectos.js');
require('../passJWT');
const passport = require ('passport');
const User = require ('../schemas/users.js');
var ObjectId = require('mongodb').ObjectID;

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


router.post('/api/proyectos/', function(req, res, next) {
    passport.authenticate('jwt', { session: false }, async function(err, user, info) {
    //Errors:
    if (err) {return next(err);}
    if (!user) {console.log(info); return res.json({auth: 'false', info: info.name});}
    //Succes:
    console.log(req.body);
    const {_id} = req.body;
    const usuario = await User.findOne({_id: _id});
    const proyectos = await proyecto.find({_id: {$in: usuario.proyectosInvolucrado}});
    //console.log(proyectos);
    res.json({proyectos: proyectos , auth: 'true'});
  })(req, res, next);
});


router.get('/api/apocalypse', async(req,res) =>{
      const proyectos = await proyecto.find();
      const rr = await proyecto.remove();
      const us = await User.remove();
      console.log(proyectos);
      res.json(proyectos);

  }
)

router.get('/api/todopro', async(req,res) =>{
      const proyectos = await proyecto.find();
      console.log(proyectos);
      res.json(proyectos);

  }
)

router.post('/api/crearproyecto', function(req, res, next) {
    passport.authenticate('jwt', { session: false }, async function(err, user, info) {
    var proyectoGuardadoId = null
    //Errors:
    if (err) {return next(err);}
    if (!user) {console.log(info); return res.json({auth: 'false', info: info.name});}
    //Succes:
    console.log(req.body);
    const {titulo, descripcion,creadorNombre,creadorApellido,creadorId,timeStamp,avance,involucrados,logs,totalHoras} = req.body;
    const proyectoAñadir = new proyecto({titulo,descripcion,creadorNombre,creadorApellido,creadorId,timeStamp,avance,
                           involucrados,logs,totalHoras});
    await proyectoAñadir.save(async function(err,proyectoGuardado) {
      //console.log(proyectoGuardado.id);
      proyectoGuardadoId = proyectoGuardado.id;
      //Ligar el proyecto al usuario
      var usuarioUpdated = await User.findOne({_id: creadorId});
      usuarioUpdated.proyectosInvolucrado.push(proyectoGuardadoId);
      const us = await User.findByIdAndUpdate(usuarioUpdated._id , usuarioUpdated);
    });
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
    const {titulo, descripcion,creadorNombre,creadorApellido,creadorId,timeStamp,avance,acciones,involucrados,milestones,logs,
          totalHoras,horasCompletadas} = req.body;
    const updatedProyect = {titulo, descripcion,creadorNombre,creadorApellido,creadorId,timeStamp,avance,acciones,
                            involucrados,milestones,logs,totalHoras,horasCompletadas};
    await proyecto.findByIdAndUpdate(req.params.id, updatedProyect);
    const unproyecto = await proyecto.findById(req.params.id);
    res.json({proyecto: unproyecto , auth: 'true', actualizado: 'true'});
  })(req, res, next);
});


router.put('/api/proyectosadduser/:id', function(req, res, next) {
    passport.authenticate('jwt', { session: false }, async function(err, user, info) {
    //Errors:
    if (err) {return next(err);}
    if (!user) {console.log(info.name); return res.json({auth: 'false', info: info.name});}
    //Succes:
    const {titulo, descripcion,creadorNombre,creadorApellido,creadorId,timeStamp,avance,acciones,
           involucrados,newEmail,milestones,logs,totalHoras,horasCompletadas} = req.body;
    const emailExists = await User.findOne({email: newEmail});
    if(emailExists){
       const updatedProyect = {titulo, descripcion,creadorNombre,creadorApellido,creadorId,timeStamp,avance,acciones,
                              involucrados,milestones,logs,totalHoras,horasCompletadas};
       var newInvolucrado = {nombre: emailExists.nombre, apellido: emailExists.apellido, identifier: emailExists._id};
    //  console.log(emailExists._id);
    //  console.log(updatedProyect.involucrados);
    //  console.log(updatedProyect.involucrados.some(item => item.identifier == emailExists._id))
       if(updatedProyect.involucrados.some(item => item.identifier == emailExists._id)){
        console.log('Duplicado');
        res.json({actualizado: 'false', msg: 'El usuario ya está vinculado al proyecto'});
       }

       else{
         updatedProyect.involucrados.push(newInvolucrado);
         await proyecto.findByIdAndUpdate(req.params.id, updatedProyect);
         updateUserproyect = emailExists;
         updateUserproyect.proyectosInvolucrado.push(req.params.id);
         await User.findByIdAndUpdate(emailExists._id, updateUserproyect);
         const unproyecto = await proyecto.findById(req.params.id);
         res.json({proyecto: unproyecto , auth: 'true', actualizado: 'true'});
       }
    }
    else{
       res.json({actualizado: 'false', msg: 'Hubo un problema al añadir el usuario'});
    }
  })(req, res, next);
});

router.put('/api/proyectosremoveruser/:id', function(req, res, next) {
    passport.authenticate('jwt', { session: false }, async function(err, user, info) {
    //Errors:
    if (err) {return next(err);}
    if (!user) {console.log(info.name); return res.json({auth: 'false', info: info.name});}
    //Succes:
    const {titulo, descripcion,creadorNombre,creadorApellido,creadorId,timeStamp,avance,acciones,horasCompletadas,
           involucrados,newEmail,milestones,proyectId,removerUsuarioId,logs,totalHoras} = req.body;
    const usuarioRemover = await User.findOne({'_id': ObjectId(removerUsuarioId)});
    const elProyecto = await proyecto.findOne({'_id': ObjectId(proyectId)});

    if(usuarioRemover){
       const proyectTmp = {titulo, descripcion,creadorNombre,creadorApellido,creadorId,timeStamp,avance,acciones,
                              involucrados,milestones,logs,totalHoras,horasCompletadas};
       var usuarioRemoverTmp = {proyectosInvolucrado: usuarioRemover.proyectosInvolucrado};

       if(elProyecto.involucrados.some(item => item.identifier == removerUsuarioId)){
          var tienePermisos = true;
          if(tienePermisos){
            var index =  elProyecto.involucrados.findIndex(item => item.identifier == removerUsuarioId);
            proyectTmp.involucrados.splice(index, 1);
            await proyecto.findByIdAndUpdate(proyectId, proyectTmp);
            //Actualizar user
            var indexInUser =  usuarioRemover.proyectosInvolucrado.findIndex(item => item._id == proyectId);
              console.log( usuarioRemoverTmp.proyectosInvolucrado.length);
            usuarioRemoverTmp.proyectosInvolucrado.splice(indexInUser,1);
            console.log( usuarioRemoverTmp.proyectosInvolucrado.length);
            await User.findByIdAndUpdate(removerUsuarioId, usuarioRemoverTmp);
            const unproyecto = await proyecto.findById(proyectId);
            res.json({proyecto: unproyecto , auth: 'true', actualizado: 'true'});
          }
          else{
            res.json({actualizado: 'false', msg: 'No tienes permisos para realizar esta acción'});
          }

       }

       else{
         res.json({actualizado: 'false', msg: 'El usuario no está vinculado al proyecto'});
       }
    }
    else{
       res.json({actualizado: 'false', msg: 'Hubo un problema al eliminar el usuario'});
    }
  })(req, res, next);
});


router.delete('/api/proyectos/:id', function(req, res, next) {
    passport.authenticate('jwt', { session: false }, async function(err, user, info) {
    //Errors:
    if (err) {return next(err);}
    if (!user) {console.log(info); return res.json({auth: 'false', info: info.name});}
    //Succes:
    await proyecto.findByIdAndRemove(req.params.id);
    const userId = user.id;
    const usuario = await User.findOne({_id: userId});
    const updatedProyects = await proyecto.find({_id: {$in: usuario.proyectosInvolucrado}});

    //const updatedProyects = await proyecto.find();
    res.json({eliminado: 'true' , auth: 'true', updatedProyects: updatedProyects});
  })(req, res, next);
});


module.exports = router;
