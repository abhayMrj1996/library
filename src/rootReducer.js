import { combineReducers } from "redux";
import { BookLibraryReducer } from "./Book-Library/bookLibraryReducer";
import { studentListReducer } from "./student-List/StudentListReducers";
import { issueBookArrayReducer } from "./issueBookList/issueBookListReducer";
import { authentication } from './loginAuthenticaton/loginAuthReducer'


 const rootReducer = combineReducers({
    book: BookLibraryReducer,
    student: studentListReducer,
    issuedataArray: issueBookArrayReducer,
    loginAuth: authentication
    
})
export default rootReducer