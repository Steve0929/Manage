import React  from 'react';
import {NavLink} from 'react-router-dom'
import Button from '@material-ui/core/Button';

const OutLinks = () =>{
  return(
    <div>
      <NavLink style={{ textDecoration: 'none',color: 'white'}}  to='/registrarme'>
      <Button style={{textTransform: 'none'}}color="inherit">Registrarse</Button>
      </NavLink>

      <NavLink style={{ textDecoration: 'none',color: 'white'}}  to='/ingresar'>
      <Button style={{textTransform: 'none'}}color="inherit">Ingresar</Button>
      </NavLink>
    </div>
  )
}

export default OutLinks;
