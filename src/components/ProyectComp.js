import React  from 'react';

const ProyectComp = (props) =>{
  const id = props.match.params.id;
  return(
    <div className="container section projectInfo">
      <div className="card z-depth 1">
        <div className="card-content">
        <span className="card-title">Project title - {id} </span>
        <p> infooo </p>
        </div>
        <div className="card-action grey lighten-4 grey-text">
          <div> Created by someone </div>
            <div> Created oct 31 12pm</div>
        </div>
      </div>
    </div>

  )
}

export default ProyectComp;
