const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require ('mongoose');
const path = require ('path');
const bodyParser = require ('body-parser');
const session = require ('express-session');
const passport = require ('passport');

const cookieSession = require ('cookie-session');

require('./pass');

// allow-cors
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); //change for "*"
  res.header("Access-Control-Allow-Credentials", "true"); //!!!
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
})



//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, 'public')));

var sess = {
  secret: 'bulletproof server',
  resave: true,
  saveUninitialized: true,
  cookie: {
        secure: false
    }
}
//app.use(session(sess));
app.use(cookieSession({
    name: 'proyectosReact',
    keys: ['very secret key'],
    maxAge: 15* 1000 //
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(require('./routes/proyectosRoutes'));
app.use(require('./routes/ingresos'));


// connect to database
const db = 'mongodb://localhost/manage';
mongoose.connect(db, {
  useNewUrlParser: true,
  })
  .then (db=> console.log('Conectado a la db')).catch(er=>console.log(err));


// catch 404
app.use((req, res, next) => {
  res.status(404).send('<h2 align=center>Beep Bop...Error :(</h2>');
});

app.set('port', process.env.PORT || 3001)
var x = app.get('port');
app.listen(app.get('port'), () =>{
    console.log("Server On "+x);
});
