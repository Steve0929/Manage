import React, { Component } from 'react';
import Notifications from './Notifications'
import Proyectlist from './Proyectlist'
import M from "materialize-css/dist/js/materialize.min.js";
import {Redirect} from 'react-router-dom'
//import {connect} from 'react-redux'


class Dashboard extends Component{
  state = {
    proyects : [],
    auth: null
  }

  componentDidMount(){ //apenas cargue se ejecuta
    console.log('montado');
    this.getProyectos();
  }

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

  render(){
    //console.log(this.props);
    console.log(this.state);
    if(this.state.auth === false) return <Redirect to = '/registrarme'/>
    if(this.state.auth === null) return  (<div className="progress"><div className="indeterminate"></div></div>) //loading...
    return(
      <div className="dashcss container ">
        <div className="row">
          <div className="col s12 m6">
           <Proyectlist proyects = {this.state.proyects} delete={this.borrarProyecto}/>
           </div>
          <div className="col s12 m5 offset-m1"> </div>
            <Notifications/>
        </div>
      </div>
    );
  }
}


const mapStateProps = (state) =>  {
  return{
    proyects: state.dd
  }
}


export default Dashboard;
