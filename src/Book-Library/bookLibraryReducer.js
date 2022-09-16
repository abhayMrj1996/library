import { ADDBOOK, SUBTRACTISSUEBOOK, RETURNDATA, DELETEROW, ADD_RETURN_BOOK } from "./bookLibraryActions";
import BookData from '../routes/mockData.json';

// AcTIONS
export const addBookToLibrary = newBook => {
    return {
        type: ADDBOOK,
        payload: newBook
    }
}
export const subtractBookQuantity = issuedData => {
    return {
        type: SUBTRACTISSUEBOOK,
        payload: issuedData

    }

}
export const returnBookToLibrary = returnData => {
    return {
        type: RETURNDATA,
        payload: returnData

    }

}
export const deleteRow = newBookList => {
    return {
        type: DELETEROW,
        payload: newBookList
    }

}
export const addReturnedBook = return_data => {
    
    return {
        type: ADD_RETURN_BOOK,
        payload: return_data

    }
}


// FIRST STATE
const initialState = {
    initialBookList: [...BookData]
}

export const bookLibraryReducer = (state = initialState, action) => {


    switch (action.type) {
        case ADDBOOK: return {
            ...state,
            initialBookList: [...state.initialBookList, action.payload]
        }
        case DELETEROW:            
            return {
                ...state,
                initialBookList: action.payload

            }
        case SUBTRACTISSUEBOOK:
            const chgContacts = [...state.initialBookList];
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


            return {
                ...state,
                initialBookList: filteredFinalBook

            }
        
        case ADD_RETURN_BOOK:
            const returnDataToLibraty = [...state.initialBookList];
            const reqRowData = returnDataToLibraty.find(
                (no) => no.nameOfBook === action.payload.nameOfBook
            );
            const tempAddedBook = {
                ...reqRowData,
                numberOfBooks:
                    parseInt(reqRowData.numberOfBooks) + parseInt(action.payload.issuedBookQuantity)
            };
            const otherUnChangedBooks = returnDataToLibraty.filter(
                (no) => no.nameOfBook !== action.payload.nameOfBook
            );
            const finalBookList = [...otherUnChangedBooks, tempAddedBook];
            const filteredFinalBookList = finalBookList.sort((a, b) => a.id - b.id);
            
               return{
                ...state,
                initialBookList:filteredFinalBookList

        }
        default: return state
    }

}