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
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
   useNextVariants: true,
   "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
  },
  palette: {
    primary:  { 500: '#414b58' },
    secondary: {
      main: '#FF9800',
    }
  },
});

const Navbar = (props) =>{
  //console.log(props.authRedux)
  var links, head, icon;
  if(props.authRedux.auth === null || props.authRedux.auth === false){
     links = <OutLinks/>
     head = 'Project manager'
  }
  if(props.authRedux.auth === true){
     links = <InLinks updateNavbarOut={props.updateNavbarOut}/>
     head = 'Dashboard'
     icon = <i className="material-icons prefix" style={{margin:'5px',fontSize: '36px'}}>assignment</i>
  }

  return(
    <div style={{flexGrow: 1}}>
    <MuiThemeProvider theme={theme}>
    <AppBar position="static" color={theme.secondary} >
           <Toolbar>
             <Link to= '/dashboard'  style={{ textDecoration: 'none',color: 'white' ,margin:'none' }}>
             <IconButton style={{marginLeft: -12, marginRight: 20,}} color="inherit" aria-label="Menu">
               <MenuIcon />
             </IconButton>
              </Link>
             <Typography variant="h6" color="inherit"  style={{flexGrow: 1}}>
               {head}
             </Typography>
             {links}
           </Toolbar>
    </AppBar>
    </MuiThemeProvider>
    </div>

  )
}

const mapStateToProps = (state) =>{
    return{
      authRedux: state.auth
    }
}


export default connect(mapStateToProps)(Navbar);

/* <nav className= "nav-wrapper blue darken-3" style={{color: '#414b58'}}>
  <div className="containers">
      <Link to= '/dashboard' style={{marginLeft: '50px',fontWeight: '500'}} className="brand-logo">
      {icon}
      {head}
      </Link>
    {links}
  </div>
 </nav>
 <AppBar position="static" color='secondary' classes={{colorDefault: '#414b58'}}>
 */
