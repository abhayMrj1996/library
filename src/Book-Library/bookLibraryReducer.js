import { ADDBOOK,SUBTRACTISSUEBOOK,RETURNDATA,DELETEROW } from "./bookLibraryActions";
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
export const returnBookToLibrary = returnData =>{
     return {
        type: RETURNDATA,
        payload: returnData

    }

}
export const deleteRow = newBookList =>{
    return {
        type: DELETEROW,
        payload: newBookList
    }

}

// FIRST STATE
const initialState={
    initialBookList:[...BookData]
}

export const bookLibraryReducer = (state=initialState, action) =>{
    console.log(action)

    switch(action.type){
        case ADDBOOK: return{
            ...state,
            initialBookList:[...state.initialBookList, action.payload]
        }
        case DELETEROW:
        console.log(action)    
        return{
            ...state,
            initialBookList: action.payload
            
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
            case RETURNDATA:
                const chgDataReturn = [...BookData];
                const reqBookReturn = chgContacts.find(
                    (no) => no.nameOfBook === action.payload.nameOfBook
                  );
                  const tempBookToReturn = {
                    ...reqBookReturn,
                    numberOfBooks:
                    reqBookReturn.numberOfBooks + action.payload.issuedBookQuantity
                  };
                  const otherBooksAvailable = chgDataReturn.filter(
                    (no) => no.nameOfBook !== action.payload.nameOfBook
                  );
                  const bookListAfterReturn = [...otherBooksAvailable, tempBookToReturn];
                  
                  const filteredListAfterReturn = bookListAfterReturn.sort((a, b) => a.id - b.id);
                      
            return{
                ...state,
                initialBookList:filteredListAfterReturn

            }
        default: return state
    }
    
}