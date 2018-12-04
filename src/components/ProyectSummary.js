import React, { Component }  from 'react';
import M from "materialize-css/dist/js/materialize.min.js";


const ProyectSummary = (props) =>{
    return(
    <div className="card z-depth-1 overcss">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title">{props.proyect.titulo}</span>
        <p>Created by: {props.proyect.creador} </p>
        <p className="grey-text"> {props.proyect.timeStamp} </p>
      </div>
     <button className="btn red accent-2" onClick={(e)=>props.delete(e, props.proyect._id)}><i className="material-icons">delete</i></button>

    </div>
    );
  }

export default ProyectSummary;
