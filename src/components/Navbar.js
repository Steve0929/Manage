import React  from 'react';
import {Link} from 'react-router-dom'
import InLinks from './Inlinks'
import OutLinks from './OutLinks'
import {connect} from 'react-redux'

//import {connect} from 'react-redux'

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
   <nav className= "nav-wrapper grey darken-3">
    <div className="container">
      <Link to= '/dashboard' className="brand-logo"> Brand corp </Link>
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
