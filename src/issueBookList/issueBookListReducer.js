import { IssuebookArray, RETURNBOOK } from "./issueBookListActions";

//action
export const addBookIssueDataInStudentList = issuedData => {

    return {
        type: IssuebookArray,
        payload: issuedData,

    }
}
export const returnBook = return_data => {
    console.log("action", return_data)
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
            console.log(chgData,"student",action.payload.nameOfStudent,"book",action.payload.nameOfBook)
            const reqIssuedData = chgData.filter((data) => data.nameOfStudent!==action.payload.nameOfStudent && data.nameOfBook !== action.payload.nameOfBook && data.issuedBookQuantity !== action.payload.nameOfBook)
            return {
                ...state,
                initialIssueBookDataArray: reqIssuedData
            }
        default: return state
    }
}