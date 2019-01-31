import React from 'react';
import moment from 'moment'
import 'moment/locale/es'
import { Progress } from 'antd';
import 'antd/es/progress/style/index.css';

/*  <div className="progress light-blue lighten-2 ">
  <div className="determinate light-blue darken-3" style={{width: props.proyect.avance+'%'}} ></div>
  </div> */

const ProyectSummary = (props) =>{
    const dateString = props.proyect.timeStamp
    const dateConFormato = moment(dateString).toDate();
    const date = moment(dateConFormato, 'MM-DD-YYYY').locale("es").calendar();
    var percentage = null;
    if(props.proyect.totalHoras==0){
       percentage = 0;
    }
    else{
      percentage = Math.floor((props.proyect.horasCompletadas *100)/props.proyect.totalHoras)
    }
    return(
    <div className="card z-depth-1 overcss">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title">{props.proyect.titulo}</span>
         <Progress percent={percentage} showInfo={false} size="small" status="active" />
         <span className='new badge blue' data-badge-caption=''> {percentage}% </span>
          <span className='new badge teal accent-4' data-badge-caption=''> {props.proyect.horasCompletadas}h/{props.proyect.totalHoras}h</span>
        <p>Creado por: {props.proyect.creadorNombre+' '+props.proyect.creadorApellido} </p>
        <p className="grey-text">{date} </p>
      </div>
     <button className="btn red accent-2 " onClick={(e)=>props.delete(e, props.proyect._id)}><i className="material-icons">delete</i></button>

    </div>
    );
  }

export default ProyectSummary;
