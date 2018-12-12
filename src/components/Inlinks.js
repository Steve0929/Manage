import React  from 'react';
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {logOut} from './actions/authCheck'

const inLinks = (props) =>{
  return(
    <ul className="right">
      <li> <NavLink to='/crear'>New Project</NavLink> </li>
      <li> <a onClick={props.salir}>Log out</a> </li>
      <li> <NavLink to='/' className ="btn btn-floating pink light-1">NN</NavLink> </li>
    </ul>
  )
}

const mapDispatchToProps = (dispatch) =>{
  return{
    salir: () => dispatch(logOut())
  }
}

export default connect(null,mapDispatchToProps)(inLinks);
