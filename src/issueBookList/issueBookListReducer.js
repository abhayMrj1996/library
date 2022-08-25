import { IssuebookArray } from "./issueBookListActions";

//action
export const addBookIssueDataInStudentList = issuedData =>{
    return{
        type:IssuebookArray,
        payload:issuedData
    }
}

//first state
const initialState={
    initialIssueBookDataArray:[]
}

// reducer
export const issueBookArrayReducer = (state=initialState, action)=>{
     switch(action.type){
        case IssuebookArray: return{
            ...state,
            initialIssueBookDataArray:[...state.initialIssueBookDataArray,action.payload]

        }
        default: return state
     }
}