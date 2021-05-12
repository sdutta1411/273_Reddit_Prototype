import { combineReducers } from 'redux';
import signupReducer from './signUpReducer';
import loginReducer from './loginReducer';
/* import searchReducer from './searchReducer'; */
export default combineReducers({

    signup: signupReducer,
    login: loginReducer,
    
});