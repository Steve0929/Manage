const initState = {
  auth: null,
  user: null
}

const authReducer = (state = initState , action) => {
  switch(action.type){
    case 'NOT LOGGED':
        return {
          ...state, auth: false, user: null
        }
    case 'LOGGED':
      console.log('LOGIN SUCCES');
      return {
        ...state, auth: true, user: action.user
      }

    case 'SALIO':
      return {
        ...state, auth: false, user: null
      }


    default:
      return state;

  }
}

export default authReducer;
