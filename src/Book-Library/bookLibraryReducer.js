import { ADDBOOK, SUBTRACTISSUEBOOK, RETURNDATA, DELETEROW, ADD_RETURN_BOOK } from "./bookLibraryActions";
import BookData from '../routes/mockData.json';



// AcTIONS
export const addBookToLibrary = newBook => {
    return {
        type: ADDBOOK,
        payload: newBook
    }
}
export const subtractBookQuantity = displayIssueBooks => {
    console.log("dispatched issue book",displayIssueBooks)
    return {
        type: SUBTRACTISSUEBOOK,
        payload: displayIssueBooks

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
export const addReturnedBook = dataToDispatch => {
    
    return {
        type: ADD_RETURN_BOOK,
        payload: dataToDispatch

    }
}


// FIRST STATE
const initialState = {
    initialBookList: [...BookData]
}

export const BookLibraryReducer = (state = initialState, action) => {
    


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
            let filteredFinalBook;
            action.payload.forEach((issue_Entry) => {
                let find_book = chgContacts.find((data)=>data.barCode===issue_Entry.issued_Books);
                console.log("find_book",find_book)
                if(find_book){
                    find_book.numberOfBooks=find_book.numberOfBooks - 1
                };
                let unSubtractedList=chgContacts.filter((data)=>data.barCode !== issue_Entry.issued_Books);
                console.log("unSubtractedList",unSubtractedList)
                let finalBooks=[...unSubtractedList,find_book];
                console.log("finalBooks",finalBooks)
                filteredFinalBook = finalBooks.sort((a, b) => a.id - b.id);
                console.log('filteredFinalBook',filteredFinalBook)
            
            })
            return {
                ...state,
                initialBookList: filteredFinalBook

            }
        

            
        case ADD_RETURN_BOOK:
            const returnDataToLibraty = [...state.initialBookList];
            let finalBookList
            action.payload.totalbooknameIssuedTo.forEach((book) => {
                let find_book_in_list = returnDataToLibraty.find((data)=>data.barCode === book);
                if(find_book_in_list){
                    find_book_in_list.numberOfBooks = parseInt(find_book_in_list.numberOfBooks) + 1
                }
                const otherUnChangedBooks = returnDataToLibraty.filter(
                    (no) => no.barCode !== find_book_in_list.barCode
                );
                 finalBookList = [...otherUnChangedBooks, find_book_in_list];
            });          
            
            
            const filteredFinalBookList = finalBookList.sort((a, b) => a.id - b.id);
            
               return{
                ...state,
                initialBookList:filteredFinalBookList

        }
        default: return state
    }

}