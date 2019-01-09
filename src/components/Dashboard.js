import React, { Component } from 'react';
import Notifications from './Notifications'
import Proyectlist from './Proyectlist'
import M from "materialize-css/dist/js/materialize.min.js";
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
//import {getProyects} from './actions/proyectActions'
import {borrarProyect} from './actions/proyectActions'
import {getProyectsOfUser} from './actions/proyectActions'

class Dashboard extends Component{


  componentDidMount(){ //apenas cargue se ejecuta
    console.log('montado');
    //this.props.getProyectsRedux();
    if(this.props.authRedux.auth === true){
      this.props.getProyectsOfUser();
    }
  }

  logOutUpdateState(){
    this.setState({auth: false});
  }


  handleBorrarProyecto = (e, deleteProyectId) => {
    e.preventDefault();
    this.props.borrarProyectoRedux(deleteProyectId);
  }

  render(){
    console.log(this.props);
    if(this.props.authRedux.auth === false) {return <Redirect to = '/registrarme'/>}
    if(this.props.authRedux.auth === null ) {return  (<div className="progress"><div className="indeterminate"></div></div>)} //loading...
    return(
      <div className="dashcss">
        <div className="row">
          <div className="col s12 m6" style={{margin: '30px'}}>
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
    //getProyectsRedux: () => dispatch(getProyects()),
    borrarProyectoRedux: (deleteProyectId) => dispatch(borrarProyect(deleteProyectId)),
    getProyectsOfUser: () => dispatch(getProyectsOfUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
