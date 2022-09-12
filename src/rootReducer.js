import { combineReducers } from "redux";
import { bookLibraryReducer } from "./Book-Library/bookLibraryReducer";
import { studentListReducer } from "./student-List/StudentListReducers";
import { issueBookArrayReducer } from "./issueBookList/issueBookListReducer";
import { authentication } from './loginAuthenticaton/loginAuthReducer'


 const rootReducer = combineReducers({
    book: bookLibraryReducer,
    student: studentListReducer,
    issuedataArray: issueBookArrayReducer,
    loginAuth: authentication
    
})
export default rootReducer