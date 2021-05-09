import { USER_SIGNUP } from "../actions/types";

const initialState = {
  user: {}
};

// eslint-disable-next-line import/no-anonymous-default-export
 const signupReducer = (state = initialState, action)=> {
  switch (action.type) {
    case USER_SIGNUP:
      console.log(action.payload)
      return {
        ...state,
        user: action.payload
      };
   
    default:
      return state;
  }
}
export default signupReducer;