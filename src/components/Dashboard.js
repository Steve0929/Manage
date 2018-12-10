import React, { Component } from 'react';
import Notifications from './Notifications'
import Proyectlist from './Proyectlist'
import M from "materialize-css/dist/js/materialize.min.js";
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {getProyects} from './actions/proyectActions'
import {borrarProyect} from './actions/proyectActions'

class Dashboard extends Component{


  componentDidMount(){ //apenas cargue se ejecuta
    console.log('montado');
    this.props.getProyectsRedux();
    //this.getProyectos();
  }

  logOutUpdateState(){
    this.setState({auth: false});
  }
/*
  getProyectos(){
      var currentToken = sessionStorage.getItem('accesToken');
      fetch('http://localhost:3001/api/proyectos', { headers: {'Authorization': currentToken}})
        .then(res => res.json())
        .then(data =>{
          if(data.auth === 'true'){
             this.setState({proyects: data.proyectos, auth: true})
             }
          else{
            this.setState({auth: false}) //Token is not valid
          }
        });
    }


  borrarProyecto = (e, deleteProyectId) =>{
    e.preventDefault();
    console.log('Eliminar: '+deleteProyectId);
    fetch('http://localhost:3001/api/proyectos/'+deleteProyectId, {
          method: 'DELETE',
          headers: {'Content-Type' : 'application/json', 'Accept': 'application/json'}
    })
    .then(res => res.json())
    .then(data => {console.log(data);
                   M.toast({html: 'Proyecto eliminado'+deleteProyectId});
                   this.getProyectos();
                 });
  }
  */

  handleBorrarProyecto = (e, deleteProyectId) => {
    e.preventDefault();
    this.props.borrarProyectoRedux(deleteProyectId);
  }

  render(){
    console.log(this.props);
    if(this.props.authRedux.auth === false) {return <Redirect to = '/registrarme'/>}
    if(this.props.authRedux.auth === null )
      {return  (<div className="progress"><div className="indeterminate"></div></div>)} //loading...
    return(
      <div className="dashcss container ">
        <div className="row">
          <div className="col s12 m6">
           <Proyectlist proyects = {this.props.proyectsRedux.proyects} delete={this.handleBorrarProyecto}/>
           </div>
          <div className="col s12 m5 offset-m1"> </div>
            <Notifications/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return{
    authRedux: state.auth,
    proyectsRedux: state.proyects,
    currentUserRedux: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    getProyectsRedux: () => dispatch(getProyects()),
    borrarProyectoRedux: (deleteProyectId) => dispatch(borrarProyect(deleteProyectId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
