import { AUTHENTICATION, CLICK_LOGOUT } from "./loginAuthActions";
import UserAuth from "./userAuthentication.json";

export const loginAuth = values => {
    console.log("dispatched", values)
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
console.log("users", UserAuth)

const initialState = {
    initialLogIn: false
}

export const authentication = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATION: {
            const newAuthntication = [...UserAuth];
            const checkAuthtication = newAuthntication.find((data) =>
                data.userId === action.payload.userId &&
                data.password === action.payload.password)
            console.log('-----', checkAuthtication);
            
            return {
                ...state,
                initialLogIn: !checkAuthtication ? false : true
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