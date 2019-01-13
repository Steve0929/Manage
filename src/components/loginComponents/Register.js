import React, { Component } from 'react';
import M from "materialize-css/dist/js/materialize.min.js";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

class Register extends Component{
  state = {
    email: '',
    password: '',
    nombre: '',
    apellido: '',
    timeStamp: Date.now(),
  }

  handleChange = (e) =>{
    this.setState({ [e.target.id] : e.target.value}) //id of input
  }

  handleRegistrarme = (e) =>{
    e.preventDefault();
    console.log(this.state);
    fetch('http://localhost:3001/api/users/registrarse', {
          method: 'POST',
          body: JSON.stringify(this.state),
          headers: {'Content-Type' : 'application/json', 'Accept': 'application/json'}
    })
    .then(res => res.json())
    .then((res) => {
          console.log(res);
          M.toast({html: res.status});
          this.props.history.push('/ingresar');
        });
  }


  render(){
    return(
      <Grid container spacing={0} alignItems="center" justify="center" direction="column">
      <Grid item xs={12} style={{width: '35%'}}>
      <Paper style={{width: '100%'}}>
         <form onSubmit={this.handleRegistrarme} className="white">
          <h5 className="grey-text text-darken-3"> Registrarse </h5>
          <div className="input-field">
            <label htmlFor="nombre"> Nombre </label>
            <input type="text" id="nombre" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="apellido"> Apellido </label>
            <input type="text" id="apellido" onChange={this.handleChange}/>
          </div>

          <div className="input-field">
            <label htmlFor="email"> Email </label>
            <input type="email" id="email" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="password"> Password </label>
            <input type="password" id="password" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <div className='center-align'>
            <button className="btn pink lighten-1 z-depth-1"> Registrarme </button>
            </div>
          </div>
         </form>
         </Paper>
         </Grid>
         </Grid>
    );
  }
}
export default Register;
