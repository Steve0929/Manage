const express = require ('express');
const router = express.Router();
const proyecto = require ('../proyectos.js');


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
      res.json(unproyecto);
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
      res.json({ status: 'Beep Bop...Updated!'});
  }
)

router.delete('/api/proyectos/:id', async(req,res) =>{
      await proyecto.findOneAndRemove(req.params.id);
      res.json({ status: 'Beep Bop...Deleted!'});
  }
)


module.exports = router;
