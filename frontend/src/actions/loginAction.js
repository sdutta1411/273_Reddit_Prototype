import { USER_LOGIN, USER_LOGOUT } from "./types";
// import ApiRequest from "../backendRequestAPI"
import axios from "axios";

export const userLogin = (Data) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log(Data)
    axios.post(`http://localhost:3001/api/user/login`, Data)
        .then(response =>{ dispatch({
            type: USER_LOGIN,
            payload: response.data
        }) 
        console.log(response.data)})
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: USER_LOGIN,
                    payload: error.response.data
                });
            }
        });
}

export const userLogout = () => dispatch => dispatch({type: USER_LOGOUT});