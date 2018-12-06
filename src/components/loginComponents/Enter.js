import React, { Component } from 'react';
import M from "materialize-css/dist/js/materialize.min.js";
import {Redirect} from 'react-router-dom'

class Enter extends Component{

  state = {
    email: '',
    password: '',
    auth: null

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
    })
    .then(res => res.json())
    .then((res) => {
          console.log(res);
          M.toast({html: res.msg}); //res.msg
          if(res.auth == 'true'){
             sessionStorage.setItem('accesToken', res.token); //Save token
             this.setState({auth: true});
             this.props.updateNavIn();
          }
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
    if(this.state.auth === true) return <Redirect to = '/dashboard'/>
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
        </div>
    );
  }
}
export default Enter;
