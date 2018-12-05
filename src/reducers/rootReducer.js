import proyectReducer from './proyectReducer'
import authReducer from './authReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
      proyect: proyectReducer,
      auth: authReducer
})

export default rootReducer;
