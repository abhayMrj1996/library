import { BOOKISSUECHECK,TOTALISSUEDATAINSTUDENT } from "./studentActions";
import DataStudent from "../routes/studentData.json";


// aCTIONS
export const searchForIssuedBookAndStudent= () =>{
    return{
        type:BOOKISSUECHECK
    }
}
export const addIssueDataToStudent= issuedData =>{
    return{
        type:TOTALISSUEDATAINSTUDENT,
        payload: issuedData
    }
}

// first state
 const initialState ={
  initialStudentData:[...DataStudent]
} 

// reducer
export const studentListReducer=(state=initialState,action)=>{
    switch(action.type){
        case BOOKISSUECHECK: return{

        }
        case TOTALISSUEDATAINSTUDENT: 
        // const nameOfStudentIssuedTo = [action.payload.nameOfStudent];
        return{

        }
        default: return state
    }

}