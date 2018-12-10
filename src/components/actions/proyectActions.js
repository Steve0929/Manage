import M from "materialize-css/dist/js/materialize.min.js";


export const createProyect = (proyect) =>{
  return (dispatch, getState) => {
      var currentToken = sessionStorage.getItem('accesToken');
      const creatorInfo = getState().auth.user;
      const nombre = creatorInfo.nombre;
      const apellido = creatorInfo.apellido;
      const id = creatorInfo._id;
      const time = Date.now();
      var newProyect = {titulo: proyect.titulo, descripcion: proyect.descripcion,
                        creadorNombre: nombre, creadorApellido: apellido, creadorId: id, timeStamp: time}
      console.log(newProyect);
      //async call to post data
      fetch('http://localhost:3001/api/crearproyecto', {
            method: 'POST',
            body: JSON.stringify(newProyect),
            headers: {'Authorization': currentToken, 'Content-Type' : 'application/json', 'Accept': 'application/json'}

      })
      .then(res => res.json())
      .then(data =>{
        if(data.auth === 'true' && data.creado === 'true'){

           dispatch({type: 'PROYECTO CREADO'});
           }
        else{
           dispatch({type: 'NOT LOGGED'});
           dispatch({type: 'ERROR_CREAR_PROYECTO'}); //Token is not valid
        }
      });
    }
}

export const getProyects = () =>{
  return (dispatch, getState) =>{
    var currentToken = sessionStorage.getItem('accesToken');
    fetch('http://localhost:3001/api/proyectos', { headers: {'Authorization': currentToken}})
      .then(res => res.json())
      .then(data =>{
        if(data.auth === 'true' && data.proyectos){
           var proyectos = data.proyectos;
           dispatch({type: 'GOT PROYECTS', proyectos });
           }
        else{
           dispatch({type: 'NOT LOGGED'});
           dispatch({type: 'CANT GET PROYECTS'}); //Token is not valid
        }
      });
  }
}

export const getProyectById = (id) =>{
  return (dispatch, getState) =>{
    var currentToken = sessionStorage.getItem('accesToken');
    fetch('http://localhost:3001/api/proyectos/'+id, { headers: {'Authorization': currentToken}})
      .then(res => res.json())
      .then(data =>{
        if(data.proyecto && data.auth === 'true'){
           var unproyecto = data.proyecto;
           dispatch({type: 'GOT PROYECT BY ID', unproyecto });
           }
        else{
           dispatch({type: 'NOT LOGGED'});
           dispatch({type: 'CANT GET PROYECT BY ID'}); //Token is not valid or ID is not valid
        }
      });
  }
}


export const borrarProyect = (deleteProyectId) =>{
  return (dispatch, getState) =>{
    var currentToken = sessionStorage.getItem('accesToken');
    fetch('http://localhost:3001/api/proyectos/'+deleteProyectId, {method: 'DELETE', headers: {'Authorization': currentToken}})
      .then(res => res.json())
      .then(data =>{
        if(data.auth === 'true' && data.eliminado === 'true'){
           var updatedProyects = data.updatedProyects;
           dispatch({type: 'PROYECTO ELIMINADO', deleteProyectId, updatedProyects});
           }
        else{
           dispatch({type: 'NOT LOGGED'});
           dispatch({type: 'NO SE ELIMINO'});
        }
      });
  }
}
