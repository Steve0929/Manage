import React, { Component }  from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {getProyectById} from './actions/proyectActions'

var id = 'null';

class ProyectComp extends Component{

constructor(props){
  super(props);
  id =  this.props.match.params.id; //Extract proyect id from url
  console.log(id);
}


componentDidMount(){
//  this.getProyectById();
  this.props.getProyectByIdRedux(id);
}

/*
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
  */

render(){
  console.log('Proyecto '+ this.props.proyectRedux)
  if(this.props.authRedux.auth === false) return <Redirect to = '/'/>
  if(this.props.authRedux.auth === null) return  (<div className="progress"><div className="indeterminate"></div></div>) //loading...
  return(
    <div className="container section projectInfo">
      <div className="card z-depth 1">
        <div className="card-content">
        <span className="card-title">Project title - {id} </span>
          <span className="card-title">Contenido - {this.props.proyectRedux.descripcion}  </span>
        <p> infooo </p>
        </div>
        <div className="card-action grey lighten-4 grey-text">
          <div> Creado por: {this.props.proyectRedux.creador} </div>
            <div> Creado: {this.props.proyectRedux.timeStamp}</div>
        </div>
      </div>
    </div>
  )
  }
}

const mapStateToProps = (state) =>{
  return{
    authRedux: state.auth,
    proyectRedux: state.proyects.unproyecto
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    getProyectByIdRedux: (id) => dispatch(getProyectById(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProyectComp);
