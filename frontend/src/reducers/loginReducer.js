import { USER_LOGIN, USER_LOGOUT } from '../actions/types';

 const initialState = {
     user: {}
 };

 // eslint-disable-next-line import/no-anonymous-default-export
 const loginReducer= (state = initialState, action)=>{
   
    switch(action.type){
        case USER_LOGIN:
            console.log(action.payload)
            return {
                ...state,
                user: action.payload
            };
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
 };

 export default loginReducer;