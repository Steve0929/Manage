import React, { Component }  from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import moment from 'moment'
import 'moment/locale/es'
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
if(this.props.authRedux.auth === true){
    this.props.getProyectByIdRedux(id);
   }
}

render(){
  console.log(this.props.proyectRedux)

  if(this.props.authRedux.auth === false || this.props.authRedux.auth === null ) return <Redirect to = '/'/>
  if(!this.props.proyectRedux.timeStamp) return  (<div className="progress"><div className="indeterminate"></div></div>) //loading...
  if(this.props.proyectRedux.timeStamp){
    const dateString = this.props.proyectRedux.timeStamp
    const dateConFormato = moment(dateString).toDate();
    const date = moment(dateConFormato, 'MM-DD-YYYY').locale("es").format("LLLL");
  return(
    <div className="container section projectInfo">
      <div className="card z-depth 1">
        <div className="card-content">
        <span className="card-title">Project title - {id} </span>
          <span className="card-title">Contenido - {this.props.proyectRedux.descripcion}  </span>
        <p> infooo </p>
        </div>
        <div className="card-action grey lighten-4 grey-text">
          <div> Creado por: {this.props.proyectRedux.creadorNombre+' '+this.props.proyectRedux.creadorApellido} </div>
            <div> Creado el {date}</div>
        </div>
      </div>
    </div>
  )
}}
}

const mapStateToProps = (state) =>{
  return{
    authRedux: state.auth,
    proyectRedux: state.proyects.unproyecto,
    currentUserRedux: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    getProyectByIdRedux: (id) => dispatch(getProyectById(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProyectComp);
