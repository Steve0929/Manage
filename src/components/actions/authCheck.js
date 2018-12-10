import M from "materialize-css/dist/js/materialize.min.js";

export const ingresar = (credenciales) =>{
  return (dispatch, getState) =>{
    fetch('http://localhost:3001/api/users/ingresar', {
          method: 'POST',
          body: JSON.stringify(credenciales),
          headers: {'Content-Type' : 'application/json', 'Accept': 'application/json'},
    })
    .then(res => res.json())
    .then((res) => {
          console.log('Respuesta server'+res);
          M.toast({html: res.msg}); //res.msg
          if(res.auth === 'true' && res.user){
              sessionStorage.setItem('accesToken', res.token); //Save token
              var user = res.user;
              dispatch({type: 'LOGGED', user});
          }
          else{
            dispatch({type: 'NOT LOGGED'});
          }
        });

  }
}

export const logOut = () =>{
  return (dispatch, getState) =>{
    sessionStorage.removeItem("accesToken");
    console.log('salioo');
    M.toast({html: 'Has salido de tu cuenta'});
    dispatch({type: 'SALIO'});
  }
}
