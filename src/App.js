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


class App extends Component{
  state = {
    auth: false
  }

  updateNavbarIn(){
    console.log('gdfg');
    this.setState({auth: true});
  }

  updateNavbarOut(){
    localStorage.removeItem("accesToken");
    this.setState({auth: false});
  }

  render(){
    return(
      <BrowserRouter>
      <div className="App">
        <Navbar auth={this.state.auth} updateNavbarOut={this.updateNavbarOut.bind(this)} />
        <Switch>
         <Route exact path='/' />
         <Route path='/dashboard' component={Dashboard} />
         <Route path='/proyecto/:id' component={ProyectComp} />
         <Route path='/registrarme' component={Register} />
         <Route path='/ingresar' render={()=><Enter updateNavIn={this.updateNavbarIn.bind(this)} />}/>
         <Route path='/crear' component={CreateProyect} />
         </Switch>

      </div>
      </BrowserRouter>
    );
  }
}
export default App;
