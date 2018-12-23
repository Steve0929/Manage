import React, { Component }  from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import moment from 'moment'
import 'moment/locale/es'
import {getProyectById} from './actions/proyectActions'
import {updateProyect} from './actions/proyectActions'
import {añadirUsuario} from './actions/proyectActions'

import { Timeline, Icon ,Slider, Spin} from 'antd';
import 'antd/es/timeline/style/index.css';
import 'antd/es/icon/style/index.css';
import 'antd/es/slider/style/index.css';
import 'antd/es/tooltip/style/index.css';
import 'antd/es/spin/style/index.css';

import {Collapsible, CollapsibleItem, Modal, Button, Row, Col, Tag} from 'react-materialize'

import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Grow from '@material-ui/core/Grow';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import red from '@material-ui/core/colors/red';


var id = 'null';


// <div className="progress"><div className="indeterminate"></div></div>
// <button className="btn indigo accent-2 " onClick={(e)=> this.handleUpdate(e, clone)}>Update</button>
// <Button onClick={this.toggleDrawer('left', true)}>Open Left</Button>

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function TransitionGrow(props) {
  return <Grow {...props} />;
}

const primary2 = red[500];
class ProyectComp extends Component{

constructor(props){
  super(props);
  id =  this.props.match.params.id; //Extract proyect id from url
  //console.log(id);
}

state = {
  tituloAccion: '',
  descrpAccion: '',
  emailAñadir: '',
  open: false,
  open2: false,
  left: false
}

handleClickOpen = () => {
    this.setState({ open: true });
  };

handleClose = () => {
  this.setState({ open: false });
};

handleClickOpen2 = () => {
    this.setState({ open2: true });
  };

handleClose2 = () => {
   this.setState({ open2: false });
};


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

añadirUsuario(e, cloneProyect){
  e.preventDefault();
  var newInvolucrado = this.state.emailAñadir;
  this.props.añadirUsuario(cloneProyect, newInvolucrado);
  this.setState({emailAñadir: ''})
}

añadirUsuarioo = (cloneProyect) => (e) => {
  console.log('how many times')
  var newInvolucrado = this.state.emailAñadir;
  this.props.añadirUsuario(cloneProyect, newInvolucrado);
  this.setState({emailAñadir: '', open: false })
}

añadirAccioon = (cloneProyect) => (e) => {
  e.preventDefault();
  var newact = {titulo: this.state.tituloAccion, accion: this.state.descrpAccion, estado: '9'}
  cloneProyect.acciones.push(newact);
  this.props.updateProyect(cloneProyect);
  this.setState({tituloAccion: '', descrpAccion: '', open2: false})
}


removerInvolucrado(){
  console.log('remover');
}

toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

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
           <span className="card-title">{this.props.proyectRedux.descripcion} </span>
           <Slider defaultValue= {this.props.proyectRedux.avance} key={this.props.proyectRedux.avance}
                    onChange={this.onChange} onAfterChange={(value)=>this.onAfterChange(value, clone)} /> </div>
           <Divider/>
          <div style={{display: 'flex', justifyContent: 'left', flexWrap: 'wrap', marginLeft: '10px', marginBottom: '3px'}}>
           {this.props.proyectRedux.involucrados.map(involucrado =>{
             return (
               <Chip
                key={involucrado.identifier}
                icon={<FaceIcon />}
                label= {involucrado.nombre+' '+involucrado.apellido}
                onDelete={this.removerInvolucrado}
                
                style={{ margin: '15px'}}
                />
              )
           })}
          </div>
        <div className="card-action grey lighten-4 grey-text">
         <button className="btn blue" style={{marginBottom: '15px'}} onClick={this.handleClickOpen}> <i className="material-icons">person_add</i></button>
         <span className='new badge blue' data-badge-caption=''> {this.props.proyectRedux.avance}% </span>
          <div> Creado por: {this.props.proyectRedux.creadorNombre+' '+this.props.proyectRedux.creadorApellido} </div>
            <div style={{marginBottom: '15px'}}> Creado {date}</div>
              <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" TransitionComponent={TransitionGrow}>
                <DialogTitle id="form-dialog-title">Añadir un usuario</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Por favor inserta el correo del usuario para añadirlo al proyecto.
                  </DialogContentText>
                  <input type="text" id="emailAñadir" onChange={this.handleChangeInputAction}/>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.añadirUsuarioo(clone)} color="primary">Añadir</Button>
                </DialogActions>
              </Dialog>


              <Drawer anchor="left" open={this.state.left} onClose={this.toggleDrawer('left', false)}>
               <div
                 tabIndex={0}
                 role="button"
                 onClick={this.toggleDrawer('left', false)}
                 onKeyDown={this.toggleDrawer('left', false)}
               >
               <div className="card z-depth 1">
                 <div className="card-content">
                   <span className="card-title">{this.props.proyectRedux.titulo} </span>
                  </div>
               </div>
               </div>
              </Drawer>
           </div>
          <div>
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

      <button className="btn blue" onClick={this.handleClickOpen2} style={{marginLeft: '15px'}}>Añadir una acción</button>
       <Dialog open={this.state.open2} onClose={this.handleClose2}  maxWidth={'sm'} fullWidth={true}
               aria-labelledby="form-dialog-title" TransitionComponent={Transition}>
         <DialogTitle id="form-dialog-title">Añadir una acción</DialogTitle>
         <DialogContent style={{padding: '30px'}}>
           <DialogContentText>
             Por favor ingresa la información correspondiente.
           </DialogContentText>
           <div className="input-field">
             <label htmlFor="accion"> Acción </label>
             <input type="text" id="tituloAccion" onChange={this.handleChangeInputAction}/>
           </div>
           <div className="input-field">
             <label htmlFor="descripcion"> Descripción </label>
             <input type="text" id="descrpAccion" onChange={this.handleChangeInputAction}/>
           </div>
         </DialogContent>
         <DialogActions>
           <Button onClick={this.añadirAccioon(clone)} color="primary">Añadir</Button>
         </DialogActions>
       </Dialog>
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
    updateProyect: (proyect) => dispatch(updateProyect(proyect)),
    añadirUsuario: (proyect, email) => dispatch(añadirUsuario(proyect, email)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProyectComp);
