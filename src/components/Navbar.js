import React  from 'react';
import {Link} from 'react-router-dom'
import InLinks from './Inlinks'
import OutLinks from './OutLinks'
//import {connect} from 'react-redux'

const Navbar = (props) =>{
  console.log(props)
  var links;
  if(props.auth === false){
     links = <OutLinks/>
  }
  if(props.auth === true){
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


export default Navbar;
