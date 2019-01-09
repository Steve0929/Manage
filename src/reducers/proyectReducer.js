import M from "materialize-css/dist/js/materialize.min.js";

const initState = {
  proyects: [],
  unproyecto: null
}

const proyectReducer = (state = initState , action) => {
  switch (action.type){
    case 'PROYECTO CREADO': console.log("Proyecto creado", action.proyect);
          M.toast({html: 'Proyecto creado!'});
          return state;

    case 'ERROR_CREAR_PROYECTO':
          console.log('Error al crear el proyecto', action.err);
          M.toast({html: 'Error al crear el proyecto'});
          return state;

   case 'GOT PROYECTS':
          return {
          ...state, proyects: action.proyectos
          }

   case 'CANT GET PROYECTS':
         M.toast({html: 'No se cargaron proyectos'});
         return {
         proyects: []
         }

    case 'GOT PROYECT BY ID':
        //  M.toast({html: 'GOT PROYECT'});
          return {
          ...state, unproyecto: action.unproyecto
          }

    case 'CANT GET PROYECT BY ID':
          return {
          ...state, unproyecto: []
          }

    case 'PROYECTO ELIMINADO':
          M.toast({html: 'Proyecto eliminado'+ action.deleteProyectId});
          return {
          ...state, proyects: action.updatedProyects
          }
    case 'NO SE ELIMINO':
          M.toast({html: 'No se pudo eliminar el proyecto'});
          return {
          ...state, proyects: []
          }

    case 'PROYECTO ACTUALIZADO':
          M.toast({html: 'Se ha actualizado correctamente'});
          return {
          ...state, unproyecto: action.updatedProyect
          }

    case 'ERROR AL ACTUALIZAR':
          M.toast({html: 'Hubo un problema al actualizar'});
          return {
          ...state
          }
    case 'ERROR AL AÑADIR USUARIO':
          M.toast({html: action.msg});
          return {
          ...state
          }

    default:
        return state;
  }
}

export default proyectReducer;
