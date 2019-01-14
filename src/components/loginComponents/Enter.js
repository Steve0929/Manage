import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {ingresar} from '../actions/authCheck'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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

      <Grid container spacing={0} alignItems="center" justify="center" direction="column">
      <Grid item xs={12} style={{width: '30%'}}>
      <Paper style={{width: '100%'}}>
         <form onSubmit={this.handleReduxLogin} className="white">
          <h5 className="grey-text text-darken-3"  style={{width:'100%'}}> Ingresar </h5>
          <div className="input-field" style={{marginTop: '35px'}}>
           <i className="material-icons prefix">account_circle</i>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <i className="material-icons prefix">lock</i>
            <label htmlFor="password"> Password </label>
            <input type="password" id="password" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
          <div className='center-align'>
            <button style={{marginTop:'15px' ,width: '30%',  justifyContent: 'center',alignItems: 'center'}} className="btn pink lighten-1 z-depth-1"> Ingresar </button>
          </div>
          </div>
         </form>
        </Paper>
        </Grid>
        </Grid>
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
