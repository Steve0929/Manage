export const authCheck = (credenciales) =>{

  return (dispatch, getState) =>{
    fetch('http://localhost:3001/api/isauth', {
        method: 'POST',
        body: JSON.stringify(credenciales),
        headers: {'Content-Type' : 'application/json', 'Accept': 'application/json'},
        credentials: "include",
    })
    .then(res => res.json())
    .then((res) => {
          console.log(res.logged);
          console.log(res.loggedUser);
          if(res.logged){
            dispatch({type: 'LOGGED'});
          }
          else{
            dispatch({type: 'NOT LOGGED'});
          }

        });
  }
}
