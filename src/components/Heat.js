import React, { Component } from 'react';
import {connect} from 'react-redux'
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import ReactTooltip from "react-tooltip";
import moment from 'moment'
import 'moment/locale/es'
/*import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';*/
const today = new Date();

const randomValues = getRange(200).map(index => {
    return {
      date: shiftDate(today, -index),
      count: getRandomInt(1, 3)
    };
  });


function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

function getRange(count) {
  return Array.from({ length: count }, (_, i) => i);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var fechas = [];
class Heat extends Component{
  state = {

  }


componentDidMount(){
  /*console.log('mont')
  var fech=[];
  for(var milestoneKey in this.state.milestones){
      for(var actividadKey in this.state.milestones[milestoneKey].actividades){
        console.log(this.state.milestones[milestoneKey].actividades[actividadKey].timeStamp);
        if(this.state.milestones[milestoneKey].actividades[actividadKey].timeStamp != null){
           var date = moment(this.state.milestones[milestoneKey].actividades[actividadKey].timeStamp).local();
           var dateinfo = moment(date, 'MM-DD-YYYY').locale("es").calendar();
           let fecha = {date: date._d, count: 1, real: dateinfo};
           //fechas.push(fecha);
           fech.push(fecha)
           console.log(fecha);
         }
      }
  }
  this.setState({fechastate: fech}); */
}

  render(){
    /*
    var fechas2=[];
    for(var milestoneKey in this.props.milestones){
        for(var actividadKey in this.props.milestones[milestoneKey].actividades){
          if(this.props.milestones[milestoneKey].actividades[actividadKey].timeStamp != null){
             var date = moment(this.props.milestones[milestoneKey].actividades[actividadKey].timeStamp).local();
             var dateinfo = moment(date, 'MM-DD-YYYY').locale("es").calendar();
             let fecha = {date: date._d, count: 1, real: dateinfo};
             fechas2.push(fecha)
             console.log(fecha);
           }
        }
    }*/
    var fechas2=[];
    for(var logKey in this.props.logs){
        if(this.props.logs[logKey].timeStamp != null){
          var date = moment(this.props.logs[logKey].timeStamp).local();
          var dateinfo = moment(date, 'MM-DD-YYYY').locale("es").calendar();
          let fecha = {date: date._d, count: Math.ceil(this.props.logs[logKey].totalHorasDia/2),
                      horasTrabajadas:this.props.logs[logKey].totalHorasDia, real: dateinfo};
          fechas2.push(fecha)
        }
    }

    return(
      <div style={{marginRight: '25px', marginTop: '25px'}}>
      <CalendarHeatmap
            style={{marginBottom: '0px', paddingBottom: '0px'}}
            showWeekdayLabels={true}
            weekdayLabels={['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']}
            startDate={shiftDate(today, -90)}
            endDate={today}
            values={fechas2}
            classForValue={value => {
              if (!value) {
                return "color-empty";
              }
              return `color-github-${value.count}`;
            }}
            tooltipDataAttrs={value => {

              if(value.real == null || value.horasTrabajadas ==null){
                console.log('Nada por aqui')
                return{}
              }
              else{
                return {
                  "data-tip": `${value.real} has count: ${value.horasTrabajadas}`
                };
              }
            }}
            onClick={value => alert(`Clicked on value with count: ${value.count}`)}
          />
          <ReactTooltip />
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return{
    authRedux: state.auth,
    currentUserRedux: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Heat);
