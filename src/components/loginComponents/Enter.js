import React, { Component } from 'react';
import M from "materialize-css/dist/js/materialize.min.js";
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {ingresar} from '../actions/authCheck'

class Enter extends Component{

  state = {
    email: '',
    password: '',
    auth: null
  }

  handleChange = (e) =>{
    this.setState({ [e.target.id] : e.target.value}) //id of input
  }

  handleReduxLogin = (e) =>{
    e.preventDefault();
    this.props.ingresoRedux(this.state)
  }


  render(){
    if(this.props.authRedux.auth === true) return <Redirect to = '/dashboard'/>
    return(
      <div className="container ">
         <form onSubmit={this.handleReduxLogin} className="white">
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

const mapDispatchToProps = (dispatch) =>{
  return{
    ingresoRedux: (credentials) => dispatch(ingresar(credentials))
  }
}

const mapStateToProps = (state) =>{
  return{
    authRedux: state.auth,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Enter);
