import { ADDBOOK,SUBTRACTISSUEBOOK } from "./bookLibraryActions";
import BookData from '../routes/mockData.json';

// AcTIONS
export const addBookToLibrary = newBook =>{
    return{
        type: ADDBOOK,
        payload:newBook
    }
}
export const subtractBookQuantity = issuedData =>{
   
    
    return{
        type: SUBTRACTISSUEBOOK,
        payload: issuedData

    }
   
}

// FIRST STATE
const initialState={
    initialBookList:[...BookData]
}

export const bookLibraryReducer = (state=initialState, action) =>{
    switch(action.type){
        case ADDBOOK: return{
            ...state,
            initialBookList:[...state.initialBookList, action.payload]
        }
        case SUBTRACTISSUEBOOK:
            const chgContacts = [...BookData];
            const reqBook = chgContacts.find(
                (no) => no.nameOfBook === action.payload.nameOfBook
              );
              const tempBook = {
                ...reqBook,
                numberOfBooks:
                  reqBook.numberOfBooks - action.payload.issuedBookQuantity
              };
              const otherBooks = chgContacts.filter(
                (no) => no.nameOfBook !== action.payload.nameOfBook
              );
              const finalBooks = [...otherBooks, tempBook];
              
              const filteredFinalBook = finalBooks.sort((a, b) => a.id - b.id);
              
              
            return{
                ...state,
                initialBookList:filteredFinalBook

            }

        default: return state
    }
    
}