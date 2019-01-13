import React  from 'react';
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {logOut} from './actions/authCheck'
import Button from '@material-ui/core/Button';

const inLinks = (props) =>{
  return(
    <div>
       <NavLink style={{ textDecoration: 'none',color: 'white'}}  to='/crear'>
       <Button style={{textTransform: 'none'}}color="inherit">Nuevo Proyecto</Button>
       </NavLink>

       <Button style={{textTransform: 'none'}}color="inherit" onClick={props.salir}>Log out</Button>

       <NavLink  style={{ textDecoration: 'none',color: 'white', marginRight: '5px', marginLeft: '10px'}}
            to='/' className ="btn btn-floating pink light-1">NN</NavLink>
    </div>
  )
}

const mapDispatchToProps = (dispatch) =>{
  return{
    salir: () => dispatch(logOut())
  }
}

export default connect(null,mapDispatchToProps)(inLinks);
