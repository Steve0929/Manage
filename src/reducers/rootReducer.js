import loginReducer from './loginReducer'
import proyectReducer from './proyectReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
      login: loginReducer,
      proyect: proyectReducer
})

export default rootReducer;
