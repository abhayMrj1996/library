import { AUTHENTICATION, CLICK_LOGOUT } from "./loginAuthActions";
import UserAuth from "./userAuthentication.json";

export const loginAuth = values => {   
    return {
        type: AUTHENTICATION,
        payload: values,
    }
}

export const clickLogout = logout_state => {
    return {
        type: CLICK_LOGOUT,
        payload: logout_state,
    }
}

const initialState = {
    initialLogIn: {}
}
console.log("****",initialState)

export const authentication = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATION: {
            const newAuthntication = [...UserAuth];
            const checkAuthtication = newAuthntication.find((data) =>
                data.userId === action.payload.userId &&
                data.password === action.payload.password)    
                
            if(checkAuthtication){
                localStorage.setItem('loginValues', JSON.stringify(action.payload));
                console.log("****",state)
            }    
            const checklocalStorage = JSON.parse(localStorage.getItem('loginValues'));
            console.log("local storage",checklocalStorage);
            return {
                ...state,
                initialLogIn: checkAuthtication ? {...action.payload, loginState:true} : {}
            }
        }

        case CLICK_LOGOUT: {
            return action.payload === true ? {
                ...state,
                initialLogIn: false

            } : {
                ...state,
                initialLogIn: true
            }
        }

        default: return state
    }
}