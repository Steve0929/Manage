import React, { Component } from 'react';
import ProyectSummary from './ProyectSummary'
import {Link} from 'react-router-dom'


const Proyectlist = (props) =>{
  return(
    <div className="proyectcss section">
      { props.proyects && props.proyects.map(proyect =>{ //cycle por los proyectos
        return (
          <Link key={proyect._id} to={'/proyecto/'+proyect._id}>
          <ProyectSummary proyect={proyect} key={proyect._id} delete={props.delete}/>
          </Link>
        )
      })}
    </div>
  )
}

export default Proyectlist;
