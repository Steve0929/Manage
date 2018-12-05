const express = require ('express');
const router = express.Router();
const proyecto = require ('../schemas/proyectos.js');

router.get('/', (req,res) =>{
  res.json({
    status: 'Beep Bop...'
   });
  }
)


router.get('/api/proyectos', async(req,res) =>{
      const proyectos = await proyecto.find();
      console.log(proyectos);
      res.json(proyectos);
  }
)

router.get('/api/proyectos/:id', async(req,res) =>{
      const unproyecto = await proyecto.findById(req.params.id);
      console.log(req.params);
      res.json({proyect: unproyecto , logged: req.isAuthenticated()});
  }
)

router.post('/api/isauth', async(req,res) =>{
      console.log( req.isAuthenticated());
      console.log(req.user);
      res.json({logged: req.isAuthenticated(), loggedUser: req.user});
  }
)

router.post('/api/crearproyecto', async(req,res) =>{
      console.log(req.body);
      const {titulo, descripcion,creador,creadorId,timeStamp} = req.body;
      const proyectoAñadir = new proyecto({titulo,descripcion,creador,creadorId,timeStamp});
      await proyectoAñadir.save();
      res.json({ status: 'Beep Bop...Success!'});
  }
)


router.put('/api/proyectos/:id', async(req,res) =>{
      const {titulo,descripcion} = req.body;
      const proyectoActualizar = ({titulo,descripcion});
      await proyecto.findOneAndUpdate(req.params.id, proyectoActualizar);
  }
)

router.delete('/api/proyectos/:id', async(req,res) =>{
      await proyecto.findByIdAndRemove(req.params.id);
      res.json({ status: 'Beep Bop...Deleted!'});
  }
)


module.exports = router;
