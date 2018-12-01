import M from "materialize-css/dist/js/materialize.min.js";

const initState = {

  proyects: [
    {id: '1', title: 'do smth', content:'dododododo'},
    {id: '2', title: 'do other smth', content:'dododododo'},
    {id: '3', title: 'do nothing', content:'dododododo'},
    {id: '35', title: '353535', content:'xdd'}
  ]

}

const proyectReducer = (state = initState , action) => {
  switch (action.type){
    case 'CREAR_PROYECTO': console.log("Proyecto creado", action.proyect);
          M.toast({html: 'Proyecto creado!'});
          return state;

    case 'ERROR_CREAR_PROYECTO':
          console.log('Error al crear el proyecto', action.err);
          return state;

    default:
        return state;
  }
}

export default proyectReducer;
