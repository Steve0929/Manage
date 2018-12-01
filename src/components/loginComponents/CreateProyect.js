import React, { Component } from 'react';
import {connect} from 'react-redux'
import {createProyect} from '../actions/proyectActions'

class CreateProyect extends Component{
  state = {
    titulo: '',
    descripcion: '',
    creador: 'Steve', creadorId: '3813', timeStamp: ''
  }

  handleChange = (e) =>{
    this.setState({ [e.target.id] : e.target.value}) //id of input
    this.setState({ timeStamp : new Date()});
  }

  handleCrear = (e) =>{
    e.preventDefault();
    this.props.createProyect(this.state)
    //console.log(this.state);
  }

  render(){
    return(
      <div className="container ">
         <form onSubmit={this.handleCrear} className="white">
          <h5 className="grey-text text-darken-3"> Crear un nuevo proyecto </h5>
            <div className="input-field">
              <label htmlFor="titulo"> Nombre del proyecto </label>
              <input type="text" id="titulo" onChange={this.handleChange}/>
            </div>
           <div className="input-field">
              <label htmlFor="descripcion">Descripción</label>
              <textarea id="descripcion" className="materialize-textarea" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-1"> Crear!</button>
          </div>
         </form>
        </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    createProyect: (proyect) => dispatch(createProyect(proyect))
  }
}

export default connect(null, mapDispatchToProps)(CreateProyect);
