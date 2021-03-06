const express = require ('express');
const router = express.Router();
const passport = require ('passport');
const ingreso = require('passport-local').Strategy;
require('../passJWT');
const jwt = require ('jsonwebtoken');
const User = require ('../schemas/users.js');

router.get('/api/test', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.send(req.user);
    }
);

router.post('/api/users/ingresar', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err){
        return next(err);
        }
    if (!user){
        return res.json({msg: 'Error. El usuario o contraseña no coinciden'});
        }

    req.logIn(user, {session: false}, (err) => {
      if (err) {
          return next(err);
          }
    const token = jwt.sign(user.toJSON(), 'secretforjwtxd', {
          expiresIn: 60*15 //60s*15= 15min
          });
      return res.json({user: user, msg: 'Has ingresado a tu cuenta', auth: 'true', token: 'JWT '+token}); //Exito, devuelve el usuario
    });
  })(req, res, next);
});



router.get('/api/users', async (req,res) =>{
  const usuarios = await User.find();
  res.json(usuarios);

  }
)

router.get('/api/users/salir', async (req,res) =>{
  req.logout();
  res.json({msg: 'Has salido de tu cuenta', status: 'out'});
  }
)

router.post('/api/users/registrarse', async (req,res) =>{
  const {nombre, apellido, email, password,timeStamp} = req.body;
  const errors = [];
  if(nombre.length <=0){
    errors.push({status: 'Error. Inserta un nombre'});
  }
  if(apellido.length <=0){
    errors.push({status: 'Error. Inserta un apellido'});
  }
  if(email.length <=0){
    errors.push({status: 'Error. Inserta un email'});
  }
  if(password.length <=0){
    errors.push({status: 'Error. Inserta una contraseña'});
  }


  const emailExists = await User.findOne({email: email});
  if(emailExists){
     errors.push({status: 'Error. Ese email ya está registrado'});
    }

  if(errors.length == 0){
    const newUser = new User({nombre,apellido,email,password,timeStamp});
    newUser.password = await newUser.encriptarPass(password);
    await newUser.save();
    res.json({
      status: 'Te has registrado exitosamente!'
     });
  }
  else{
    res.json(errors[0]);
   }

})



module.exports = router;
