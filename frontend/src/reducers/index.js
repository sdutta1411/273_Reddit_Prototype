import { combineReducers } from 'redux';
import signupReducer from './signUpReducer';
import loginReducer from './loginReducer';

export default combineReducers({

    signup: signupReducer,
    login: loginReducer,

});