import React, { Component }  from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import moment from 'moment'
import 'moment/locale/es'
import {getProyectById} from './actions/proyectActions'
import {updateProyect} from './actions/proyectActions'
import {añadirUsuario} from './actions/proyectActions'
import {removerUsuario} from './actions/proyectActions'
import Heat from './Heat'

import {Button} from 'react-materialize'

import M from "materialize-css/dist/js/materialize.min.js";
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
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {blue, grey, amber, red, purple, indigo, pink, cyan, lightBlue, deepOrange, teal} from '@material-ui/core/colors'
import createPalette from '@material-ui/core/styles'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import WorkIcon from '@material-ui/icons/Work';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Ballot from '@material-ui/icons/Ballot';
import BallotOutlined from '@material-ui/icons/BallotOutlined';
import BallotRounded from '@material-ui/icons/BallotRounded';
import BallotTwoTone from '@material-ui/icons/BallotTwoTone';
import Beenhere from '@material-ui/icons/Beenhere';
import BeenhereTwoTone from '@material-ui/icons/BeenhereTwoTone';
import EditTwoTone from '@material-ui/icons/EditTwoTone';
import DeleteForeverTwoTone from '@material-ui/icons/DeleteForeverTwoTone';
import SettingsTwoTone from '@material-ui/icons/SettingsTwoTone';
import ExtensionTwoTone from '@material-ui/icons/ExtensionTwoTone';
import TimerTwoTone from '@material-ui/icons/TimerTwoTone';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InputBase from '@material-ui/core/InputBase';

var id = 'null';

// <div className="progress"><div className="indeterminate"></div></div>
// <button className="btn indigo accent-2 " onClick={(e)=> this.handleUpdate(e, clone)}>Update</button>
// <Button onClick={this.toggleDrawer('left', true)}>Open Left</Button>
// <MenuItem onClick={this.editarTiempo(clone)}><TimerTwoTone style={{color:'#FF7043'}}/> Editar Tiempo</MenuItem>
const accent2 = blue.A200

const theme = createMuiTheme({
  typography: {
   useNextVariants: true,
  },
  palette: {
    primary: purple,
    secondary: {
      main: '#FF9800',
    }
  },
});

const themeg = createMuiTheme({
  typography: {
   useNextVariants: true,
  },
  palette: {
    primary: teal,
    secondary: {
      main: '#4DB6AC',
    }
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function TransitionGrow(props) {
  return <Grow {...props} />;
}

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
});

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
  actividadAñadir: '',
  horasAñadir: '',
  milestoneAñadir: '',
  open: false,
  open2: false,
  open3: false,
  open4: false,
  left: false,
  tab: 0,
  currentMilestone: 0,
  anchorEl: null,
  currentActividad: null,
  currentActividadIndex: null,
  actividadEditando: null,
  horasEditando: null,
  editandoActividad: false,
  editandoTiempo: false
}

handleMenuClick  = (actividad,index) => (e) => {
  this.setState({ anchorEl: e.currentTarget, currentActividadIndex: index, currentActividad: actividad});
};

handleMenuClose = () => {
   this.setState({ anchorEl: null });
 };

eliminarActividad = (clone) => (e) => {
   console.log('eliminar'+this.state.currentActividadIndex)
   clone.milestones[this.state.currentMilestone].actividades.splice(this.state.currentActividadIndex, 1);
   var fl = true;
   for(let i=0; i<clone.milestones[this.state.currentMilestone].actividades.length;i++){
       if(clone.milestones[this.state.currentMilestone].actividades[i].completado==false){
          fl=false
       }
   }
   if(fl){clone.milestones[this.state.currentMilestone].completado = true;}
   else{clone.milestones[this.state.currentMilestone].completado = false;}
   this.props.updateProyect(clone);
   this.setState({currentActividadIndex: '', currentActividad: '', anchorEl: null})
 };

editarActividad = (clone) => (e) =>{
  this.setState({editandoActividad: true, anchorEl: null, actividadEditando: this.state.currentActividad.actividad,
                horasEditando: this.state.currentActividad.horas})
}

editarActividad2 = (clone) => (e) =>{
  var actividadEditada ={actividad:this.state.actividadEditando, horas: this.state.horasEditando ,
                         completado: this.state.currentActividad.completado}
  clone.milestones[this.state.currentMilestone].actividades[this.state.currentActividadIndex] = actividadEditada;
  this.props.updateProyect(clone);
  this.setState({editandoActividad: false, anchorEl: null, actividadEditando: null, horasEditando: null, editandoTiempo:false})
  console.log('focusout')
}

editarTiempo = (clone) => (e) =>{
  this.setState({editandoTiempo: true, anchorEl: null, actividadEditando: this.state.currentActividad.actividad,
                horasEditando: this.state.currentActividad.horas})
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

handleClickOpen3 = () => {
    this.setState({ open3: true });
  };

handleClose3 = () => {
   this.setState({ open3: false });
};

handleClickOpen4 = () => {
    this.setState({ open4: true });
  };

handleClose4 = () => {
   this.setState({ open4: false });
};


handleTabChange = (event, value) => {
   this.setState({ tab: value });
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

añadirUsuarioo = (cloneProyect) => (e) => {
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

añadirActividad = (cloneProyect) => (e) => {
  console.log('activity');
  e.preventDefault();
  if(cloneProyect.milestones[0] == null){
    M.toast({html: 'No se seleccionó un Milestone'});
    this.handleClose3();
  }
  else{
  var actividad = {actividad: this.state.actividadAñadir, completado: false, horas: this.state.horasAñadir, timeStamp: null}
  cloneProyect.milestones[this.state.currentMilestone].actividades.push(actividad);
  cloneProyect.milestones[this.state.currentMilestone].completado = false
  this.props.updateProyect(cloneProyect);
  this.handleClose3();
  }
}

handleCheck = (activity, index, cloneProyect) => (e) => {
  e.preventDefault();
  console.log(cloneProyect.milestones[this.state.currentMilestone]);
  cloneProyect.milestones[this.state.currentMilestone].actividades[index].completado = !activity.completado;
  if(cloneProyect.milestones[this.state.currentMilestone].actividades[index].completado==true){
    cloneProyect.milestones[this.state.currentMilestone].actividades[index].timeStamp = Date.now();

    if(cloneProyect.logs[cloneProyect.logs.length-1].timeStamp == null){
        var log = {timeStamp: new Date(), totalHorasDia: activity.horas, actividades: {actividad: activity.actividad}}
        cloneProyect.logs.push(log);
    }

    else{
      var logdate = moment(cloneProyect.logs[cloneProyect.logs.length-1].timeStamp).toDate();
      var logdatem = moment(logdate, 'MM-DD-YYYY');
      var today = new Date();
      var todaym = moment(today, 'MM-DD-YYYY');
    // console.log( todaym.isSame(logdatem, 'day'));
      if(todaym.isSame(logdatem, 'day')){
         console.log('sumar horas');
         console.log(cloneProyect.logs[cloneProyect.logs.length-1].totalHorasDia);
         console.log(activity.horas);
         cloneProyect.logs[cloneProyect.logs.length-1].totalHorasDia =
                          cloneProyect.logs[cloneProyect.logs.length-1].totalHorasDia + activity.horas
         var sameDayAct = {actividad: activity.actividad}
         cloneProyect.logs[cloneProyect.logs.length-1].actividades.push(sameDayAct)
      }

      else{
        var log = {timeStamp: new Date(), totalHorasDia: activity.horas, actividades: activity.actividad}
        cloneProyect.logs.push(log);
      }
    }

  }
  // se marca como no completada
  else{
    cloneProyect.milestones[this.state.currentMilestone].actividades[index].timeStamp = null;
    var logIndex = null
    var today2 = new Date();
    var todaym2 = moment(today2, 'MM-DD-YYYY');
  //  var logIndex = cloneProyect.logs.actividades.findIndex(item=> item.actividad == activity.actividad);
  //  var logIndex = cloneProyect.logs.findIndex(logitem => logitem.timeStamp.isSame(todaym2, 'day'));
    for(var key in cloneProyect.logs) {
        var tmp = cloneProyect.logs[key].timeStamp;
        if(tmp != null){
          tmp = moment(tmp).toDate();
          tmp = moment(tmp, 'MM-DD-YYYY');
          if (tmp.isSame(todaym2, 'day')) {
              logIndex = key;
              break;
            }
        }
    }
    console.log(logIndex);
    console.log(cloneProyect.logs[logIndex]);
    if(logIndex != null){
      //restar horas trabajadas en el dia
      cloneProyect.logs[logIndex].totalHorasDia = cloneProyect.logs[logIndex].totalHorasDia - activity.horas;
      if(cloneProyect.logs[logIndex].totalHorasDia == 0){
         cloneProyect.logs.splice(logIndex, 1);
       }
      }
  }
  var fl = true;
  for(let i=0; i<cloneProyect.milestones[this.state.currentMilestone].actividades.length;i++){
      if(cloneProyect.milestones[this.state.currentMilestone].actividades[i].completado==false){
         fl=false
      }
  }
  if(fl){cloneProyect.milestones[this.state.currentMilestone].completado = true;}
  else{cloneProyect.milestones[this.state.currentMilestone].completado = false;}
  this.props.updateProyect(cloneProyect);
}

añadirMilestone = (cloneProyect) => (e) => {
  e.preventDefault();
  var milestone = {milestone: this.state.milestoneAñadir, completado: false, actividades: [], horas: 0}
  cloneProyect.milestones.push(milestone);
  this.props.updateProyect(cloneProyect);
  this.handleClose4();
}


removerInvolucrado = (involucrado, clone) => (e) =>{
  //clone.involucrados.splice(this.state.currentActividadIndex, 1);//!!!!!!
  console.log('remover'+involucrado.identifier);
  this.props.removerUsuario(clone, involucrado.identifier);
}

milestone = (index) => (e) => {
  console.log('milestone'+index);
  this.setState({currentMilestone: index});
}

toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };


render(){

  //console.log(this.props.proyectRedux)
  const anchorEl = this.state.anchorEl;
  if(this.props.authRedux.auth === false || this.props.authRedux.auth === null ) return <Redirect to = '/'/>
  if(this.props.proyectRedux == [] || this.props.proyectRedux == null )  return  (<div className="progress"><div className="indeterminate"></div></div>) //loading...
  if(this.props.proyectRedux._id != id)  return  (<div className="progress"><div className="indeterminate"></div></div>) //loading...
  if(this.props.proyectRedux.timeStamp){
    //console.log(this.props.proyectRedux)
    var clone = JSON.parse(JSON.stringify(this.props.proyectRedux));
    console.log(clone);
    const dateString = this.props.proyectRedux.timeStamp
    const dateConFormato = moment(dateString).toDate();
    const date = moment(dateConFormato, 'MM-DD-YYYY').locale("es").calendar();

  return(
    <div>
    <Grid container spacing={0}>
    <Grid item xs={6}>
     <div style={{margin: '30px', padding: theme.spacing.unit * 2}}>
    <Card>
    <Heat key={this.props.proyectRedux._id+'cc'} logs={this.props.proyectRedux.logs}/>
    <Divider/>
    <CardHeader
       action={<IconButton> <MoreVertIcon /></IconButton>}
       title={this.props.proyectRedux.titulo}
       subheader={'Creado por '+this.props.proyectRedux.creadorNombre+' '+this.props.proyectRedux.creadorApellido+' '+date}
     />
     <CardContent style={{paddingTop: '0px'}}>
     <Typography component="p"  align='justify'>{this.props.proyectRedux.descripcion}</Typography>
     </CardContent>
     <Divider/>
     <CardContent>
     <div style={{display: 'flex', justifyContent: 'left', flexWrap: 'wrap', marginBottom: '3px'}}>
      {this.props.proyectRedux.involucrados.map(involucrado =>{
       if(involucrado.identifier == this.props.proyectRedux.creadorId){
         return (
           <Chip
            key={involucrado.identifier}
            icon={<FaceIcon />}
            label= {involucrado.nombre+' '+involucrado.apellido}
            onDelete={this.removerInvolucrado}
            style={{ margin: '5px'}}
            color='secondary'
            />
          )}
       else{
        return (
          <Chip
           key={involucrado.identifier}
           icon={<FaceIcon />}
           label= {involucrado.nombre+' '+involucrado.apellido}
           onDelete={this.removerInvolucrado(involucrado, clone)}

           style={{ margin: '5px'}}
           />
         )}
      })}
     </div>
     </CardContent>
     <Divider/>
     <CardActions>
     <button className="btn blue" style={{margin: '15px'}} onClick={this.handleClickOpen}>
             <i className="material-icons">person_add</i></button>
     <span className='new badge blue' data-badge-caption=''> {this.props.proyectRedux.avance}% </span>
      </CardActions>
      </Card>
    </div>

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

      <Dialog open={this.state.open3} onClose={this.handleClose3} aria-labelledby="form-dialog-title" TransitionComponent={TransitionGrow}>
        <DialogTitle id="añadiractv">Añadir una actividad</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor inserta la información de la actividad para añadirla al proyecto.
          </DialogContentText>
          <div className="input-field">
            <label htmlFor="actividadAñadir">Actividad </label>
            <input type="text" id="actividadAñadir" onChange={this.handleChangeInputAction}/>
          </div>
          <div className="input-field">
            <label htmlFor="horasAñadir">Tiempo en horas estimado para ejecutar la actividad</label>
            <input type="number" min="0" id="horasAñadir" onChange={this.handleChangeInputAction}/>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.añadirActividad(clone)} color="primary">Añadir</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={this.state.open4} onClose={this.handleClose4} aria-labelledby="form-dialog-title" TransitionComponent={TransitionGrow}>
        <DialogTitle id="añadiractv">Añadir Milestone</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor inserta la información del Milestone.
          </DialogContentText>
          <div className="input-field">
            <label htmlFor="milestoneAñadir">Milestone </label>
            <input type="text" id="milestoneAñadir" onChange={this.handleChangeInputAction}/>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.añadirMilestone(clone)} color="primary">Añadir</Button>
        </DialogActions>
      </Dialog>
    </Grid>


    <Grid item xs={6}>
     <div style={{margin: '30px', padding: theme.spacing.unit * 2}}>
          <List component="nav" style={{height: '100%', backgroundColor: 'white'}}>
             <ListItem>
             <ListItemText primary="Milestones" secondary="Hitos" />
           </ListItem>
            {this.props.proyectRedux.milestones.map((milestone, index) =>{ //cycle por las Milestones
                var completedBadge = null;
                if(milestone.completado){
                   if(this.state.currentMilestone == index){completedBadge = <BeenhereTwoTone style={{color:'white'}}/>}
                   else{completedBadge = <BeenhereTwoTone style={{color:'#4DB6AC'}}/>}
                }
                if(this.state.currentMilestone == index){
                   return(
                     <div key={milestone._id}>
                     <ListItem button onClick={this.milestone(index)} style={{backgroundColor: '#B2EBF2'}}>
                     <BallotTwoTone color="primary"/>
                     <ListItemText primary={milestone.milestone}/>
                     {completedBadge}
                     </ListItem>
                     <Divider/>
                     </div>
                   )
                }
                else{
                return (
                <div key={milestone._id}>
                <ListItem button onClick={this.milestone(index)}>
                <BallotTwoTone color="secondary"/>
                <ListItemText primary={milestone.milestone}/>
                {completedBadge}
                </ListItem>
                <Divider/>
                </div>
              )}
            })}
            <button className="btn indigo accent-2" style={{margin: '15px'}} onClick={this.handleClickOpen4}> Añadir Milestone</button>
          </List>
      </div>


    <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleMenuClose}>
       <MenuItem onClick={this.editarActividad(clone)}><EditTwoTone style={{color:'#4DB6AC'}}/> Editar</MenuItem>

       <MenuItem onClick={this.eliminarActividad(clone)}><DeleteForeverTwoTone style={{color:'red'}}/> Eliminar</MenuItem>
     </Menu>


      <div style={{margin: '30px', padding: theme.spacing.unit * 2}}>
      <MuiThemeProvider theme={theme}>
      <Paper >
      <AppBar position="static">
          <Tabs value={this.state.tab} onChange={this.handleTabChange} fullWidth >
            <Tab label="Todo" />
            <Tab label="Pendientes" />
            <Tab label="Completados" />
          </Tabs>
      </AppBar>
          {this.state.tab === 0 && clone.milestones.length >0 && <TabContainer>
            {this.props.proyectRedux.milestones[this.state.currentMilestone].actividades.map((actividad, index) =>{ //cycle por las actv
              if(this.state.currentActividadIndex == index && this.state.editandoActividad){
                 var texto = <InputBase onChange={this.handleChangeInputAction} id='actividadEditando' autoFocus={true}
                              onBlur={this.editarActividad2(clone)} defaultValue= {actividad.actividad} />
              }
              else{
                var texto = actividad.actividad;
              }
              if(this.state.currentActividadIndex == index && this.state.editandoTiempo){
                 var horas = <InputBase onChange={this.handleChangeInputAction} id='horasEditando' autoFocus={true}
                              onBlur={this.editarActividad2(clone)} defaultValue= {actividad.horas} />
              }
              else{
                var horas = actividad.horas;
              }
              return (
              <div key={actividad._id}>
               <span>
                <Checkbox checked={actividad.completado} onClick={this.handleCheck(actividad,index,clone)}/>
                {texto}
                <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined} aria-haspopup="true"
                        onClick={this.handleMenuClick(actividad, index)} style={{float: 'right'}}
                        color='primary' size='small'>
                    <SettingsTwoTone />
                </IconButton>
                <p style={{float: 'right'}}>Tiempo: {horas}h</p>
                </span>
                <Divider/>
              </div>
              )
            })}

          </TabContainer>}
          {this.state.tab === 1 && clone.milestones.length >0 && <TabContainer>
            {this.props.proyectRedux.milestones[this.state.currentMilestone].actividades.map((actividad, index) =>{ //cycle por las actv
              if(actividad.completado == false){
                if(this.state.currentActividadIndex == index && this.state.editandoActividad){
                   var texto = <InputBase onChange={this.handleChangeInputAction} id='actividadEditando' autoFocus={true}
                                onBlur={this.editarActividad2(clone)} defaultValue= {actividad.actividad} />
                }
                else{
                  var texto = actividad.actividad;
                }
                if(this.state.currentActividadIndex == index && this.state.editandoTiempo){
                   var horas = <InputBase onChange={this.handleChangeInputAction} id='horasEditando' autoFocus={true}
                                onBlur={this.editarActividad2(clone)} defaultValue= {actividad.horas} />
                }
                else{
                  var horas = actividad.horas;
                }
                return (
                <div key={actividad._id}>
                 <span>
                  <Checkbox checked={actividad.completado} onClick={this.handleCheck(actividad,index,clone)}/>
                  {texto}
                  <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined} aria-haspopup="true"
                          onClick={this.handleMenuClick(actividad, index)} style={{float: 'right'}}
                          color='primary' size='small'>
                      <SettingsTwoTone />
                  </IconButton>
                  <p style={{float: 'right'}}>Tiempo: {horas}h</p>
                  </span>
                  <Divider/>
                </div>
                )
              }
            })}
          </TabContainer>}
          {this.state.tab === 2 && clone.milestones.length >0 && <TabContainer>
            {this.props.proyectRedux.milestones[this.state.currentMilestone].actividades.map((actividad, index) =>{ //cycle por las actv
              if(actividad.completado == true){
                if(this.state.currentActividadIndex == index && this.state.editandoActividad){
                   var texto = <InputBase onChange={this.handleChangeInputAction} id='actividadEditando' autoFocus={true}
                                onBlur={this.editarActividad2(clone)} defaultValue= {actividad.actividad} />
                }
                else{
                  var texto = actividad.actividad;
                }
                if(this.state.currentActividadIndex == index && this.state.editandoTiempo){
                   var horas = <InputBase onChange={this.handleChangeInputAction} id='horasEditando' autoFocus={true}
                                onBlur={this.editarActividad2(clone)} defaultValue= {actividad.horas} />
                }
                else{
                  var horas = actividad.horas;
                }
                return (
                <div key={actividad._id}>
                 <span>
                  <Checkbox checked={actividad.completado} onClick={this.handleCheck(actividad,index,clone)}/>
                  {texto}
                  <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined} aria-haspopup="true"
                          onClick={this.handleMenuClick(actividad, index)} style={{float: 'right'}}
                          color='primary' size='small'>
                      <SettingsTwoTone />
                  </IconButton>
                  <p style={{float: 'right'}}>Tiempo: {horas}h</p>
                  </span>
                  <Divider/>
                </div>
                )
              }
            })}
          </TabContainer>}
      <div className="card-action grey lighten-4 grey-text">
      <button className="btn indigo accent-2" style={{margin: '15px'}} onClick={this.handleClickOpen3}> Añadir actividad</button>
      </div>
      </Paper>
      </MuiThemeProvider>
      </div>
    </Grid>

 </Grid>
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
    removerUsuario: (proyect, removerId) => dispatch(removerUsuario(proyect, removerId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProyectComp);
