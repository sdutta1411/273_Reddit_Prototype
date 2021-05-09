import { USER_SIGNUP } from "./types";
import ApiRequest from "../backendRequestApi"
import axios from "axios";

export const  userSignup = (userData) =>async dispatch => {
    axios.defaults.withCredentials = true;
    console.log(userData)
    await axios.post(`${ApiRequest}/api/user/register`, userData)
        .then(response => dispatch({
            type: USER_SIGNUP,
            payload: response.data
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: USER_SIGNUP,
                    payload: error.response.data
                });
            }
            return;
        });
}