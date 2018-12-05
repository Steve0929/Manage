const passport = require ('passport');
const ingreso = require('passport-local').Strategy;
const User = require ('./schemas/users.js');

passport.use(new ingreso({
    usernameField: 'email'},
    async (email,password,done) => {
      const user = await User.findOne({email: email});
      if(!user){
         return done(null, false, {mensaje: 'Usuario no existe'}); //err,  user, msg
      }
      else{
        const coincidePass = await user.CompararPass(password);
        if(coincidePass){
           return done(null, user);
        }
        else{
          return done(null, false, {mensaje: 'Contraseña incorrecta'})
        }
      }
}));

passport.serializeUser((user,done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
      console.log("des   " +user.id);
      done(err,user);
  });
});
