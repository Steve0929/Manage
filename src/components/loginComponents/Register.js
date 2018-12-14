import React, { Component } from 'react';
import M from "materialize-css/dist/js/materialize.min.js";

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

        });
  }


  render(){
    return(
      <div className="container ">
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
            <button className="btn pink lighten-1 z-depth-1"> Registrarme </button>
          </div>
         </form>
        </div>
    );
  }
}
export default Register;
