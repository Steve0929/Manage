import React, { Component }  from 'react';

var id = 'null';

class ProyectComp extends Component{

constructor(props){
  super(props);
  id =  this.props.match.params.id;
  console.log(id);
}

state = {
  proyecto : []
}

componentDidMount(){
  this.getProyectById();
}

getProyectById(){
    fetch('http://localhost:3001/api/proyectos/'+id)
      .then(res => res.json())
      .then(data => this.setState({proyecto: data}));
  }

render(){
  return(
    <div className="container section projectInfo">
      <div className="card z-depth 1">
        <div className="card-content">
        <span className="card-title">Project title - {id} </span>
          <span className="card-title">Contenido - {this.state.proyecto.descripcion}  </span>
        <p> infooo </p>
        </div>
        <div className="card-action grey lighten-4 grey-text">
          <div> Creado por: {this.state.proyecto.creador} </div>
            <div> Creado: {this.state.proyecto.timeStamp}</div>
        </div>
      </div>
    </div>
  )
  }
}

export default ProyectComp;
