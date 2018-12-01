import React  from 'react';
import ProyectSummary from './ProyectSummary'
import {Link} from 'react-router-dom'

const Proyectlist = ({proyects}) =>{
  return(
    <div className="proyectcss section">
      { proyects && proyects.map(proyect =>{ //cycle por los proyectos
        return (
          <Link to={'/proyecto/'+proyect._id}>
          <ProyectSummary proyect={proyect} key={proyect._id} />
          </Link>
        )

      })}
    </div>
  )
}

export default Proyectlist;
