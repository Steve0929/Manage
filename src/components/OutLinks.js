import React  from 'react';
import {NavLink} from 'react-router-dom'
import Button from '@material-ui/core/Button';

const OutLinks = () =>{
  return(
    <ul className="right">
       <li> <NavLink to='/registrarme'>Registrarse</NavLink> </li>
       <li> <NavLink to='/ingresar'>Ingresar</NavLink> </li>
     </ul>
  )
}

export default OutLinks;
