import { BOOKISSUECHECK, TOTALISSUEDATAINSTUDENT } from "./studentActions";
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

// first state
const initialState = {
    initialStudentData: [...DataStudent]
}

// reducer
export const studentListReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOTALISSUEDATAINSTUDENT:
            const chgDataStudent = [...DataStudent];
            const studentSplitname = action.payload.nameOfStudent.split("\t");
            const reqStudent = chgDataStudent.find((data)=>data.first_name===studentSplitname[0] && data.last_name===studentSplitname[1]);
            const tempStudent = {
                ...reqStudent,
                totalBookIssuedTo: parseFloat(reqStudent.totalBookIssuedTo) + parseFloat(action.payload.issuedBookQuantity),
                totalbooknameIssuedTo: reqStudent.totalbooknameIssuedTo +" "+action.payload.nameOfBook
            }
            console.log(tempStudent);
            const otherStudent = chgDataStudent.filter(
                (data) => data.first_name!==studentSplitname[0] && data.last_name!==studentSplitname[1]
              );
              console.log(otherStudent)
            const finalStudentList=[...otherStudent,tempStudent];
            const sortList = finalStudentList.sort((a, b) => a.id - b.id);
            return {
                ...state,
                initialStudentData:sortList

            }
        default: return state
    }

}