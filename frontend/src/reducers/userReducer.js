import { LOGIN_USER_FAIL, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS } from "../constants/userConstant"

export const userReducer=(state={user:{}},action)=>{
    if(action.type==LOGIN_USER_REQUEST){
        return {
            ...state,
        }
    }
    else if(action.tyep==LOGIN_USER_SUCCESS){
        return {
            ...state,
            user:action.payload
        }
    }
    else if(action.tyep==LOGIN_USER_FAIL){
        return {
            ...state,
        }
    }
    else{
        return {
            ...state
        }
    }

}