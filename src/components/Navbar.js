import React  from 'react';
import {Link} from 'react-router-dom'
import InLinks from './Inlinks'
import OutLinks from './OutLinks'

const Navbar = () =>{
  return(
   <nav className= "nav-wrapper grey darken-3">
    <div className="container">
      <Link to= '/' className="brand-logo"> Brand corp </Link>
      <InLinks/>
        <OutLinks/>
    </div>
   </nav>
  )
}

export default Navbar;
