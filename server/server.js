const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require ('mongoose');
const path = require ('path');
const bodyParser = require ('body-parser');

//const {mongoosed} = require ('database.js');

// allow-cors
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
})
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(require('./routes/task.routes'));

// connect to database
const db = 'mongodb://localhost/manage';
mongoose.connect(db).then (db=> console.log('Conectado a la db')).catch(er=>console.log(err));




// catch 404
app.use((req, res, next) => {
  res.status(404).send('<h2 align=center>Beep Bop...Error :(</h2>');
});

app.set('port', process.env.PORT || 3001)
var x = app.get('port');
app.listen(app.get('port'), () =>{
    console.log("Server On"+x);
});
