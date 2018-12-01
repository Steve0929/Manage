import React from 'react';

const ProyectSummary = ({proyect}) =>{
    return(
    <div className="card z-depth-1 overcss">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title">{proyect.titulo}</span>
        <p>Created by: {proyect.creador} </p>
        <p className="grey-text"> {proyect.timeStamp} </p>
      </div>
    </div>
    );
  }
export default ProyectSummary;
