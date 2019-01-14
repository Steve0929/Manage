import React  from 'react';
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {logOut} from './actions/authCheck'
import Button from '@material-ui/core/Button';

const inLinks = (props) =>{
  const iniciales = props.currentUserRedux.nombre.charAt(0)+props.currentUserRedux.apellido.charAt(0);
  return(
    <div>
       <NavLink style={{ textDecoration: 'none',color: 'white'}}  to='/crear'>
       <Button style={{textTransform: 'none'}}color="inherit">Nuevo Proyecto</Button>
       </NavLink>

       <Button style={{textTransform: 'none'}}color="inherit" onClick={props.salir}>Log out</Button>

       <NavLink  style={{ textDecoration: 'none',color: 'white', marginRight: '5px', marginLeft: '10px'}}
            to='/perfil' className ="btn btn-floating pink light-1">{iniciales}</NavLink>
    </div>
  )
}

const mapStateToProps = (state) =>{
  return{
    currentUserRedux: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    salir: () => dispatch(logOut())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(inLinks);
