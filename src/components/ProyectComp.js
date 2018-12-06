import React, { Component }  from 'react';
import {Redirect} from 'react-router-dom'

var id = 'null';

class ProyectComp extends Component{

constructor(props){
  super(props);
  id =  this.props.match.params.id;
  console.log(id);
}

state = {
  proyecto : [],
  auth: null
}

componentDidMount(){
  this.getProyectById();
}


getProyectById(){
    var currentToken = sessionStorage.getItem('accesToken');
    if(currentToken){
    fetch('http://localhost:3001/api/proyectos/'+id , { headers: {'Authorization': currentToken}})
      .then(res => res.json())
      .then(data => {
      if(data.auth === 'true'){
         this.setState({proyecto: data.proyect, auth: true})
         }
      else{
        this.setState({auth: false}) //Token is not valid
        console.log(data.auth, data.info);
      }
    });
    }
    else{
      this.setState({auth: false}) //No token in session
      console.log("No autenticado, redirreccionar...");
    }
  }

render(){
  if(this.state.auth === false) return <Redirect to = '/'/>
  if(this.state.auth === null) return  (<div className="progress"><div className="indeterminate"></div></div>) //loading...
  return(
    <div className="container section projectInfo">
      <div className="card z-depth 1">
        <div className="card-content">
        <span className="card-title">Project title - {id} </span>
          <span className="card-title">Contenido - {this.state.proyecto.descripcion}  </span>
        <p> infooo </p>
        </div>
        <div className="card-action grey lighten-4 grey-text">
          <div> Creado por: {this.state.proyecto.creador} </div>
            <div> Creado: {this.state.proyecto.timeStamp}</div>
        </div>
      </div>
    </div>
  )
  }
}

export default ProyectComp;
