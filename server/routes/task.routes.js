const express = require ('express');
const router = express.Router();
const proyecto = require ('../proyectos.js');


router.get('/', (req,res) =>{
  res.json({
    status: 'Beep Bop...'
   });
  }
)


router.get('/api/proyects', async(req,res) =>{
      const proyectos = await proyecto.find();
      console.log(proyectos);
      res.json(proyectos);

  }
)

router.get('/api/proyects/:id', async(req,res) =>{
      const unproyecto = await proyecto.findById(req.params.id);
      res.json(unproyecto);
  }
)

router.post('/api/crearproyecto', async(req,res) =>{
      console.log(req.body);
      const {title, description} = req.body;
      const proyectoAñadir = new proyecto({title,description});
      await proyectoAñadir.save();
      res.json({ status: 'Beep Bop...Success!'});
  }
)


router.put('/api/proyectos/:id', async(req,res) =>{
      const {title, description} = req.body;
      const proyectoActualizar = ({title,description});
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
