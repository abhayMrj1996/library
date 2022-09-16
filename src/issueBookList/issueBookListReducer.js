import { IssuebookArray, RETURNBOOK } from "./issueBookListActions";

//action
export const addBookIssueDataInStudentList = issuedData => {

    return {
        type: IssuebookArray,
        payload: issuedData,

    }
}
export const returnBook = return_data => {
    
    return {
        type: RETURNBOOK,
        payload: return_data
    }
}

//first state
const initialState = {
    initialIssueBookDataArray: []
}

// reducer
export const issueBookArrayReducer = (state = initialState, action) => {
    switch (action.type) {
        case IssuebookArray: return {
            ...state,
            initialIssueBookDataArray: [...state.initialIssueBookDataArray, action.payload]

        }
        case RETURNBOOK:
            const chgData = [...state.initialIssueBookDataArray];
            const reqIssuedData = chgData.filter((data) =>
            data.barCode!==action.payload.barCode || 
            data.nameOfBook!==action.payload.nameOfBook || 
            data.issuedBookQuantity!==action.payload.issuedBookQuantity
            )
            
            return {
                ...state,
                initialIssueBookDataArray: reqIssuedData
            }
        default: return state
    }
}