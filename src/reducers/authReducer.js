const initState = {
  error: null

}

const authReducer = (state = initState , action) => {
  switch(action.type){
    case 'NOT LOGGED':
        return {
          ...state, error: 'error'
        }
    case 'LOGGED':
      console.log('LOGIN SUCCES')
      return {
        ...state, error: 'null'
      }

    default:
      return state;

  }
}

export default authReducer;
