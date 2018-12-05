import React, { Component } from 'react';
import Notifications from './Notifications'
import Proyectlist from './Proyectlist'
import M from "materialize-css/dist/js/materialize.min.js";
//import {connect} from 'react-redux'


class Dashboard extends Component{
  state = {
    proyects : []
  }

  componentDidMount(){ //apenas cargue se ejecuta
    console.log('montado');
    this.getProyectos();
  }

  getProyectos(){
      fetch('http://localhost:3001/api/proyectos')
        .then(res => res.json())
        .then(data => this.setState({proyects: data}))
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
