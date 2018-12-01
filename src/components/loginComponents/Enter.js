import React, { Component } from 'react';

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
    console.log(this.state);
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
        </div>
    );
  }
}
export default Enter;
