import React  from 'react';
import {NavLink} from 'react-router-dom'

const inLinks = () =>{
  return(
    <ul className="right">
      <li> <NavLink to='/crear'>New Project</NavLink> </li>
      <li> <NavLink to='/'>Log out </NavLink> </li>
      <li> <NavLink to='/' className ="btn btn-floating pink light-1">NN</NavLink> </li>
    </ul>
  )
}

export default inLinks;
