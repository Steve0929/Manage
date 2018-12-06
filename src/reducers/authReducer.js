const initState = {
  auth: null
}

const authReducer = (state = initState , action) => {
  switch(action.type){
    case 'NOT LOGGED':
        return {
          ...state, auth: 'false'
        }
    case 'LOGGED':
      console.log('LOGIN SUCCES')
      return {
        ...state, auth: 'true'
      }

    default:
      return state;

  }
}

export default authReducer;
