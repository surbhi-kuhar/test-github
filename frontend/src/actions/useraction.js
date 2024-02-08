import axios from "axios"
import { LOGIN_USER_FAIL, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS } from "../constants/userConstant"
import { server } from "../FixedUrl";
export const login = (email, password) => async (dispatch) => {
    try{
        dispatch({type:LOGIN_USER_REQUEST});
        const {data}=await axios.get(`${server}/user/get/654e3bec8e80bf2a11d647b1`);
        dispatch({type:LOGIN_USER_SUCCESS,payload:data.user,isAuthenticated:true,loading:true});
    }
    catch(err){
        dispatch({type:LOGIN_USER_FAIL,isAuthenticated:false,loading:false});
    }
}