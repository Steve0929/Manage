import React  from 'react';
import {Link} from 'react-router-dom'
import InLinks from './Inlinks'
import OutLinks from './OutLinks'
import {connect} from 'react-redux'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const Navbar = (props) =>{
  //console.log(props.authRedux)
  var links;
  if(props.authRedux.auth === null || props.authRedux.auth === false){
     links = <OutLinks/>
  }
  if(props.authRedux.auth === true){
     links = <InLinks updateNavbarOut={props.updateNavbarOut}/>
  }
  return(
   <nav className= "nav-wrapper blue darken-3">
    <div className="containers">
      <Link to= '/dashboard' style={{marginLeft: '50px'}} className="brand-logo"> Proyect manager </Link>
      {links}
    </div>
   </nav>

  )
}

const mapStateToProps = (state) =>{
    return{
      authRedux: state.auth
    }
}


export default connect(mapStateToProps)(Navbar);
