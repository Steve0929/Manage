import M from "materialize-css/dist/js/materialize.min.js";
import { BrowserRouter } from 'react-router-dom'

export const createProyect = (proyect, redir) =>{
  return (dispatch, getState) => {
      var currentToken = sessionStorage.getItem('accesToken');
      const creatorInfo = getState().auth.user;
      const nombre = creatorInfo.nombre;
      const apellido = creatorInfo.apellido;
      const id = creatorInfo._id;
      const time = Date.now();
      const involucrado = {nombre: nombre, apellido: apellido, identifier: id}
      var newProyect = {titulo: proyect.titulo, descripcion: proyect.descripcion,
                        creadorNombre: nombre, creadorApellido: apellido, creadorId: id, timeStamp: time, avance: 0,
                        involucrados: involucrado}
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
           redir.push('/dashboard');
           }
        else{
           dispatch({type: 'NOT LOGGED'});
           dispatch({type: 'ERROR_CREAR_PROYECTO'}); //Token is not valid
        }
      });
    }
}

export const updateProyect = (proyect) =>{
  return (dispatch, getState) => {
      var currentToken = sessionStorage.getItem('accesToken');
      const time = Date.now();
      var updatedProyect = {titulo: proyect.titulo, descripcion: proyect.descripcion,
                            creadorNombre: proyect.creadorNombre, creadorApellido: proyect.creadorApellido,
                            creadorId: proyect.creadorId, timeStamp: proyect.timeStamp, avance: proyect.avance,
                            acciones: proyect.acciones, involucrados: proyect.involucrados, actividades: proyect.actividades
                            }
      //async call to post data
      fetch('http://localhost:3001/api/proyectos/'+proyect._id, {
            method: 'PUT',
            body: JSON.stringify(updatedProyect),
            headers: {'Authorization': currentToken, 'Content-Type' : 'application/json', 'Accept': 'application/json'}

      })
      .then(res => res.json())
      .then(data =>{
        if(data.auth === 'true' && data.actualizado === 'true'){
           const updatedProyect = data.proyecto
           dispatch({type: 'PROYECTO ACTUALIZADO', updatedProyect});
           }
        else{
           dispatch({type: 'ERROR AL ACTUALIZAR'});
        }
      });
    }
}

export const añadirUsuario = (proyect, email) =>{
  return (dispatch, getState) => {
      var currentToken = sessionStorage.getItem('accesToken');
      const time = Date.now();
      var updatedProyect = {titulo: proyect.titulo, descripcion: proyect.descripcion,
                            creadorNombre: proyect.creadorNombre, creadorApellido: proyect.creadorApellido,
                            creadorId: proyect.creadorId, timeStamp: proyect.timeStamp, avance: proyect.avance,
                            acciones: proyect.acciones, involucrados: proyect.involucrados, newEmail: email,
                            actividades: proyect.actividades
                            }
      //async call to post data
      fetch('http://localhost:3001/api/proyectosadduser/'+proyect._id, {
            method: 'PUT',
            body: JSON.stringify(updatedProyect),
            headers: {'Authorization': currentToken, 'Content-Type' : 'application/json', 'Accept': 'application/json'}

      })
      .then(res => res.json())
      .then(data =>{
        if(data.auth === 'true' && data.actualizado === 'true'){
           const updatedProyect = data.proyecto
           dispatch({type: 'PROYECTO ACTUALIZADO', updatedProyect});
           }
        else{
           const msg = data.msg
           dispatch({type: 'ERROR AL AÑADIR USUARIO', msg});
        }
      });
    }
}

/*
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
*/


export const getProyectsOfUser = () =>{
  return (dispatch, getState) =>{
    var currentToken = sessionStorage.getItem('accesToken');
    const user = getState().auth.user;
    console.log(user);
    fetch('http://localhost:3001/api/proyectos',
            {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {'Authorization': currentToken, 'Content-Type' : 'application/json', 'Accept': 'application/json'}
            })
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
    const creatorInfo = getState().auth.user;
    const id = creatorInfo._id;
    const idJson = {userId: id};
    fetch('http://localhost:3001/api/proyectos/'+deleteProyectId, {
          method: 'DELETE', body: JSON.stringify(idJson), headers: {'Authorization': currentToken}
          })
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
