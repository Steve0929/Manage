import React, { Component } from 'react';
import M from "materialize-css/dist/js/materialize.min.js";

class Enter extends Component{
  state = {
    email: '',
    password: ''

  }

  handleChange = (e) =>{
    this.setState({ [e.target.id] : e.target.value}) //id of input
  }

  handleEntrar = (e) =>{
    e.preventDefault();
    fetch('http://localhost:3001/api/users/ingresar', {
          method: 'POST',
          body: JSON.stringify(this.state),
          headers: {'Content-Type' : 'application/json', 'Accept': 'application/json'},
          credentials: "include",
    })
    .then(res => res.json())
    .then((res) => {
          console.log(res);
          M.toast({html: res.msg}); //res.msg
        });
  }

checkAuth = () =>{
    fetch('http://localhost:3001/api/isauth', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {'Content-Type' : 'application/json', 'Accept': 'application/json'},
        credentials: "include",
    })
    .then(res => res.json())
    .then((res) => {
          console.log(res.logged);
        });

  }

  render(){
    return(
      <div className="container ">
         <form onSubmit={this.handleEntrar} className="white">
          <h5 className="grey-text text-darken-3"> Ingresar </h5>
          <div className="input-field">
            <label htmlFor="email"> Email </label>
            <input type="email" id="email" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="password"> Password </label>
            <input type="password" id="password" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-1"> Ingresar </button>
          </div>
         </form>
          <button onClick={this.checkAuth} className="btn pink lighten-1 z-depth-1"> TEST! </button>
        </div>
    );
  }
}
export default Enter;
