export const createProyect = (proyect) =>{

  return (dispatch, getState) => {
      //async call to post data
      fetch('http://localhost:3001/api/crearproyecto', {
            method: 'POST',
            body: JSON.stringify(proyect),
            headers: {'Content-Type' : 'application/json', 'Accept': 'application/json'}

      })
        .then(res=> res.json()).then(data => console.log(data)).then(() => dispatch({type: 'CREAR_PROYECTO', proyect}))
        .catch(err=> dispatch({type: 'ERROR_CREAR_PROYECTO', err}));
  }
};
