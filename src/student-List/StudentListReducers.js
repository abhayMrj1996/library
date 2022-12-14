import { BOOKISSUECHECK, TOTALISSUEDATAINSTUDENT, REMOVE_RETURNED_BOOK_DATA_STUDENTLIST,ADD_STUDENT } from "./studentActions";
import DataStudent from "../routes/studentData.json";


// aCTIONS
export const addStudentToList = newStudent =>{
    return{
        type: ADD_STUDENT,
        payload: newStudent
    }
}
export const searchForIssuedBookAndStudent = () => {
    return {
        type: BOOKISSUECHECK
    }
}
export const addIssueDataToStudent = displayIssueBooks => {
    
    return {
        type: TOTALISSUEDATAINSTUDENT,
        payload: displayIssueBooks
    }
}
export const removeReturnDataFromStudentList = dataToDispatch =>{
    console.log("dispatched here",dataToDispatch)
    return{
        type:REMOVE_RETURNED_BOOK_DATA_STUDENTLIST,
        payload: dataToDispatch
    }
}


// first state
const initialState = {
    initialStudentData: [...DataStudent]
}

// reducer
export const studentListReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_STUDENT: return {
            ...state,
            initialStudentData: [...state.initialStudentData, action.payload]
        }
        case TOTALISSUEDATAINSTUDENT:
            const chgDataStudent = [...state.initialStudentData];  
            let sortList    
            action.payload.forEach((issue_Entry) =>{
                let find_student = chgDataStudent.find((data)=>data.barCode===issue_Entry.barCode);
                if(find_student){
                    find_student.totalBookIssuedTo = parseFloat(find_student.totalBookIssuedTo) + 1;
                    find_student.totalbooknameIssuedTo = [...find_student.totalbooknameIssuedTo, issue_Entry.issued_Books]
                }
                const otherStudent = chgDataStudent.filter(
                    (data) => data.barCode !== issue_Entry.barCode
                );
               
                const finalStudentList = [...otherStudent, find_student];
                 sortList = finalStudentList.sort((a, b) => a.id - b.id);

            })      
            
            
            return {
                ...state,
                initialStudentData: sortList

            }
            case REMOVE_RETURNED_BOOK_DATA_STUDENTLIST:
                const chgAddReturnedBook=[...state.initialStudentData];                 
                let  finalStudentListAfterReturn ;

                action.payload.totalbooknameIssuedTo.forEach((returned_book)=>{
                    let find_student=chgAddReturnedBook.find((data)=>data.barCode===action.payload.barCode);
                    
                    if(find_student){
                       const removed_book_array = find_student.totalbooknameIssuedTo.filter((data)=>data!==returned_book);
                        
                       find_student.totalbooknameIssuedTo = removed_book_array;

                        find_student.totalBookIssuedTo = parseInt(find_student.totalBookIssuedTo) - 1 ;                      

                    }
                     

                    const otherNonRetuenStudent = chgAddReturnedBook.filter(
                        (data) => data.barCode !== find_student.barCode);
                    console.log("otherNonRetuenStudent",otherNonRetuenStudent)

                    finalStudentListAfterReturn = [...otherNonRetuenStudent, find_student]; 
                    console.log("finalStudentListAfterReturn",finalStudentListAfterReturn)
                });              
                 
                const sortListOfReturned = finalStudentListAfterReturn.sort((a, b) => a.id - b.id);
              
                return{
                    ...state,
                    initialStudentData: sortListOfReturned
                }
        
            
        default: return state
    }

}