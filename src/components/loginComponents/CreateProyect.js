import React, { Component } from 'react';
import {connect} from 'react-redux'
import {createProyect} from '../actions/proyectActions'
import {Redirect} from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

class CreateProyect extends Component{
  state = {
    titulo: '',
    descripcion: ''
  }

  handleChange = (e) =>{
    this.setState({ [e.target.id] : e.target.value}) //id of input
  }

  handleCrear = (e) =>{
    e.preventDefault();
    var redir = this.props.history;
    this.props.createProyect(this.state, redir)
    //this.props.history.push('/dashboard');
  }

  render(){
    if(this.props.authRedux.auth === false) return <Redirect to = '/'/>
    if(this.props.authRedux.auth === null) return <Redirect to = '/'/>
    return(
      <Grid container spacing={0} alignItems="center" justify="center" direction="column">
      <Grid item xs={12} style={{width: '50%'}}>
      <Paper style={{width: '100%'}}>
         <form onSubmit={this.handleCrear} className="white">
          <h5 className="grey-text text-darken-3"> Crear un nuevo proyecto </h5>
            <div className="input-field">
              <label htmlFor="titulo"> Nombre del proyecto </label>
              <input type="text" id="titulo" onChange={this.handleChange} aria-required="true" className="validate" required='true'/>
            </div>
           <div className="input-field">
              <label htmlFor="descripcion">Descripción</label>
              <textarea id="descripcion" className="materialize-textarea" onChange={this.handleChange}  aria-required="true"
                        required='true'/>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-1"> Crear!</button>
          </div>
         </form>
         </Paper>
         </Grid>
         </Grid>
    );
  }
}

const mapStateToProps = (state) =>{
  return{
    authRedux: state.auth,
    currentUserRedux: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    createProyect: (proyect, redir) => dispatch(createProyect(proyect, redir))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProyect);
