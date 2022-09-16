import { BOOKISSUECHECK, TOTALISSUEDATAINSTUDENT, REMOVE_RETURNED_BOOK_DATA_STUDENTLIST } from "./studentActions";
import DataStudent from "../routes/studentData.json";


// aCTIONS
export const searchForIssuedBookAndStudent = () => {
    return {
        type: BOOKISSUECHECK
    }
}
export const addIssueDataToStudent = issuedData => {
    return {
        type: TOTALISSUEDATAINSTUDENT,
        payload: issuedData
    }
}
export const removeReturnDataFromStudentList = return_data =>{
    console.log("return###",return_data)
    return{
        type:REMOVE_RETURNED_BOOK_DATA_STUDENTLIST,
        payload: return_data
    }
}


// first state
const initialState = {
    initialStudentData: [...DataStudent]
}

// reducer
export const studentListReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOTALISSUEDATAINSTUDENT:
            const chgDataStudent = [...state.initialStudentData];            
            const reqStudent = chgDataStudent.find((data) => data.barCode === action.payload.barCode);
            const tempStudent = {
                ...reqStudent,
                totalBookIssuedTo: parseFloat(reqStudent.totalBookIssuedTo) + parseFloat(action.payload.issuedBookQuantity),
                totalbooknameIssuedTo:[...reqStudent.totalbooknameIssuedTo,action.payload.nameOfBook]
            }
            const otherStudent = chgDataStudent.filter(
                (data) => data.barCode !== action.payload.barCode
            );
           
            const finalStudentList = [...otherStudent, tempStudent];
            const sortList = finalStudentList.sort((a, b) => a.id - b.id);
            return {
                ...state,
                initialStudentData: sortList

            }
            case REMOVE_RETURNED_BOOK_DATA_STUDENTLIST:
                const chgAddReturnedBook=[...state.initialStudentData]; 
                console.log("student data",chgAddReturnedBook)              
                const reqReturnBookStudent = chgAddReturnedBook.find((data) => data.barCode === action.payload.barCode);
                console.log("@@@",reqReturnBookStudent);
                const returnBookToLibraryFromStudentList = reqReturnBookStudent.totalbooknameIssuedTo.filter(book=>book!==action.payload.nameOfBook)
                const tempReqReturnBookStudent = {
                    ...reqReturnBookStudent,
                    totalBookIssuedTo: parseFloat(reqReturnBookStudent.totalBookIssuedTo)- parseFloat(action.payload.issuedBookQuantity),
                    totalbooknameIssuedTo: returnBookToLibraryFromStudentList
                } 
                const otherNonRetuenStudent = chgAddReturnedBook.filter(
                    (data) => data.barCode !== reqReturnBookStudent.barCode
                ); 
                const finalStudentListAfterReturn = [...otherNonRetuenStudent, tempReqReturnBookStudent];
                const sortListOfReturned = finalStudentListAfterReturn.sort((a, b) => a.id - b.id);
              
                return{
                    ...state,
                    initialStudentData: sortListOfReturned
                }
        
            
        default: return state
    }

}