import React, { Component }  from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import moment from 'moment'
import 'moment/locale/es'
import {getProyectById} from './actions/proyectActions'
import {updateProyect} from './actions/proyectActions'

import { Timeline, Icon ,Slider, Spin} from 'antd';
import 'antd/es/timeline/style/index.css';
import 'antd/es/icon/style/index.css';
import 'antd/es/slider/style/index.css';
import 'antd/es/tooltip/style/index.css';
import 'antd/es/spin/style/index.css';

import {Collapsible, CollapsibleItem, Modal, Button} from 'react-materialize'

var id = 'null';

class ProyectComp extends Component{

constructor(props){
  super(props);
  id =  this.props.match.params.id; //Extract proyect id from url
  //console.log(id);
}

state = {
  tituloAccion: '',
  descrpAccion: ''
}

componentDidMount(){
  console.log('trying')
//  this.getProyectById();
 if(this.props.authRedux.auth === true){
    this.props.getProyectByIdRedux(id);
   }
}

handleUpdate(e, cloneProyect){
  e.preventDefault();
  this.props.updateProyect(cloneProyect);
}

handleAddAction(e, cloneProyect){
  e.preventDefault();
  var newact = {titulo: 'Una accion', accion: 'Se hizo algo muy productivo', estado:'2'}
  cloneProyect.acciones.push(newact);
  console.log(cloneProyect)
  this.props.updateProyect(cloneProyect);
}


onAfterChange = (value, cloneProyect) =>{
  console.log('Nuevo avance: '+value+'%');
  cloneProyect.avance = value;
  this.props.updateProyect(cloneProyect);
}

onChange = (value) =>{
  //console.log(value);
}

handleChangeInputAction = (e) =>{
  console.log(e.target.id);
  this.setState({ [e.target.id] : e.target.value})
}

añadirAccion(e, cloneProyect){
  e.preventDefault();
  var newact = {titulo: this.state.tituloAccion, accion: this.state.descrpAccion, estado: '9'}
  cloneProyect.acciones.push(newact);
  this.props.updateProyect(cloneProyect);
  this.setState({tituloAccion: '', descrpAccion: ''})
}


render(){
  console.log(this.props.proyectRedux)
  if(this.props.authRedux.auth === false || this.props.authRedux.auth === null ) return <Redirect to = '/'/>
  if(this.props.proyectRedux == [] || this.props.proyectRedux == null )  return  (<div className="progress"><div className="indeterminate"></div></div>) //loading...
  if(this.props.proyectRedux._id != id)  return  (<div className="progress"><div className="indeterminate"></div></div>) //loading...
  if(this.props.proyectRedux.timeStamp){
    //console.log(this.props.proyectRedux)
    var clone = JSON.parse(JSON.stringify(this.props.proyectRedux));
    //console.log(clone);
    const dateString = this.props.proyectRedux.timeStamp
    const dateConFormato = moment(dateString).toDate();
    const date = moment(dateConFormato, 'MM-DD-YYYY').locale("es").calendar();
  return(
    <div className="container section projectInfo">
      <div className="card z-depth 1">
        <div className="card-content">
          <span className="card-title">{this.props.proyectRedux.titulo} </span>
           <span className="card-title">{this.props.proyectRedux.descripcion}  </span>
           <div className="progress"><div className="indeterminate"></div></div>
           <Slider defaultValue= {this.props.proyectRedux.avance} key={this.props.proyectRedux.avance}
                    onChange={this.onChange} onAfterChange={(value)=>this.onAfterChange(value, clone)} /> </div>
        <div className="card-action grey lighten-4 grey-text">
          <div> Creado por: {this.props.proyectRedux.creadorNombre+' '+this.props.proyectRedux.creadorApellido} </div>
            <div style={{marginBottom: '15px'}}> Creado {date}</div>
             <button className="btn indigo accent-2 " onClick={(e)=> this.handleUpdate(e, clone)}>Update</button>
            <button className="btn blue" onClick={(e)=> this.handleAddAction(e, clone)} style={{marginLeft: '15px'}}>Add</button>
            <span className='new badge blue' data-badge-caption=''> {this.props.proyectRedux.avance}% </span>
        </div>
      </div>
    <div style={{ marginTop: '10%'}}></div>
      <Timeline mode="alternate">
        <Timeline.Item color='green' dot={<Icon type="rocket" theme="twoTone" style={{ fontSize: '36px' }} />}>
            <div className="card z-depth 1">
            <div className="card-content">
              <span className="card-title">Proyecto creado {date}</span>
            </div>
            <div className="card-action grey lighten-4 grey-text">
              Nombre: {this.props.proyectRedux.titulo}
            </div>
            </div>
        </Timeline.Item>

        {this.props.proyectRedux.acciones.map(accion =>{ //cycle por los proyectos
          return (
            <Timeline.Item key={accion._id}>
              <Collapsible popout defaultActiveKey={1}>
              <CollapsibleItem header={accion.titulo} icon='filter_drama'>
                {accion.accion}
              </CollapsibleItem>
              </Collapsible>
            </Timeline.Item>
          )
        })}


      <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>Technical testing 2015-09-01</Timeline.Item>
      </Timeline>
      <Modal
      header='Añadir una acción'
      actions = ''
      trigger={<Button>Añadir una acción</Button>}>
        <form onSubmit={(e) => this.añadirAccion(e,clone)} >
        <div className="input-field">
          <label htmlFor="accion"> Acción </label>
          <input type="text" id="tituloAccion" onChange={this.handleChangeInputAction}/>
        </div>
        <div className="input-field">
          <label htmlFor="descripcion"> Descripción </label>
          <input type="text" id="descrpAccion" onChange={this.handleChangeInputAction}/>
        </div>
         <div className="input-field">
           <button className="btn pink lighten-1 z-depth-1"> Añadir </button>
         </div>
        </form>
      </Modal>
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
    updateProyect: (proyect) => dispatch(updateProyect(proyect))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProyectComp);
