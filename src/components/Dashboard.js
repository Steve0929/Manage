import React, { Component } from 'react';
import Notifications from './Notifications'
import Proyectlist from './Proyectlist'
import {connect} from 'react-redux'


class Dashboard extends Component{
  state = {
    proyects : []
  }

  componentDidMount(){ //apenas cargue se ejecuta
    console.log('montado');
    this.getProyectos();
  }

  getProyectos(){
      fetch('http://localhost:3001/api/proyectos')
        .then(res => res.json())
        .then(data => this.setState({proyects: data}))
        .then(()=> console.log(this.state));
    }

  render(){
    //console.log(this.props);
    const { proyects } = this.props;
    return(
      <div className="dashcss container ">
        <div className="row">
          <div className="col s12 m6">
            <Proyectlist proyects = {this.state.proyects} />
           </div>
          <div className="col s12 m5 offset-m1"> </div>
            <Notifications/>
        </div>
      </div>
    );
  }
}


const mapStateProps = (state) =>  {
  return{
    proyects: state.dd
  }
}


export default connect(mapStateProps)(Dashboard);
