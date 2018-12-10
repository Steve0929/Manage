import React, { Component }  from 'react';
import M from "materialize-css/dist/js/materialize.min.js";
import moment from 'moment'
import 'moment/locale/es'

const ProyectSummary = (props) =>{
    const dateString = props.proyect.timeStamp
    const dateConFormato = moment(dateString).toDate();
    const date = moment(dateConFormato, 'MM-DD-YYYY').locale("es").format("LLLL");
    return(
    <div className="card z-depth-1 overcss">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title">{props.proyect.titulo}</span>
        <p>Creado por: {props.proyect.creadorNombre+' '+props.proyect.creadorApellido} </p>
        <p className="grey-text">El {date} </p>
      </div>
     <button className="btn red accent-2" onClick={(e)=>props.delete(e, props.proyect._id)}><i className="material-icons">delete</i></button>

    </div>
    );
  }

export default ProyectSummary;
