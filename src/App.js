import React, { Component } from 'react';
import logo from './logo.svg';
import './index.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import ProyectComp from './components/ProyectComp'
import Register from './components/loginComponents/Register'
import Enter from './components/loginComponents/Enter'
import CreateProyect from './components/loginComponents/CreateProyect'
import Profile from './components/Profile'
import './trancss.css'
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group-v2';

function ac(props,e){
  console.log(props.pathname.split('/')[1]);
  console.log(props);
  // <input type="button" onClick={e => ac(window.location, e)} value="What you want to do ?" />
}

const App = (props) => (
  <Router>
   <div className="App">
    <Navbar/>
    <Route path='/registrarme' component={Register} />
    <Route path='/ingresar' component={Enter} />
    <Route render={({ location }) =>
      <TransitionGroup>
        <CSSTransition key={location.pathname.split('/')[1]} timeout={500}
                       classNames={(location.pathname.split('/')[1] == 'proyecto'||
                                   location.pathname.split('/')[1] == 'perfil'||
                                   location.pathname.split('/')[1] == 'crear') ? 'pageSliderLeft' : 'pageSliderRight' }
                       mountOnEnter={true} unmountOnExit={true}>
          <Switch location={location} >
             <Route path="/" exact  />
             <Route path='/dashboard' component={Dashboard} />
             <Route path='/proyecto/:id' component={ProyectComp} />
             <Route path='/crear' component={CreateProyect} />
             <Route path='/perfil' component={Profile} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    } />
  </div>
  </Router>
)


export default App;
