import React  from 'react';
import {NavLink} from 'react-router-dom'

const inLinks = (props) =>{
  return(
    <ul className="right">
      <li> <NavLink to='/crear'>New Project</NavLink> </li>
      <li> <a onClick={props.updateNavbarOut}>Log out </a> </li>
      <li> <NavLink to='/' className ="btn btn-floating pink light-1">NN</NavLink> </li>
    </ul>
  )
}

export default inLinks;
