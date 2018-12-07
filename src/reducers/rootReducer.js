import proyectReducer from './proyectReducer'
import authReducer from './authReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
      proyects: proyectReducer,
      auth: authReducer
})

export default rootReducer;
