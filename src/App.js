import React, { Component } from 'react';
import logo from './logo.svg';
import './index.css';
import Particles from 'react-particles-js';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import ProyectComp from './components/ProyectComp'
import Register from './components/loginComponents/Register'
import Enter from './components/loginComponents/Enter'
import CreateProyect from './components/loginComponents/CreateProyect'
import {Redirect} from 'react-router-dom'

class App extends Component{


  render(){
    return(
      <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
         <Route exact path='/' />
         <Route path='/dashboard' render={()=><Dashboard />}/>
         <Route path='/proyecto/:id' component={ProyectComp} />
         <Route path='/registrarme' component={Register} />
         <Route path='/ingresar' component={Enter} />
         <Route path='/crear' component={CreateProyect} />
         </Switch>
      </div>
      </BrowserRouter>
    );
  }
}
export default App;
