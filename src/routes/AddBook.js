import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {addBookToLibrary} from "../Book-Library/bookLibraryReducer";


function AddBook(){
  const dispatch = useDispatch();
  const [newBook,setNewBook]=useState({
        id: 18,
        nameOfBook: "",
        nameOfAuthor: "",
        subtitle: "",
        publishing:"",
        publisher: "",
        price: "",
        numberOfBooks:""
});
    const handleAddFormChange = (e) => {
    const { name, value } = e.target;
    const EmptyInput = { ...newBook };
    EmptyInput[name] = value;
    setNewBook(EmptyInput);

    }
    const handleAddFormSubmit = (e)=>{
      e.preventDefault();

      dispatch(addBookToLibrary(newBook))

    }
    return(
        <div>
     <form onSubmit={handleAddFormSubmit}>
      <h2 class="font-extrabold text-center">Book entries</h2>
      
        <input
          type="text"
          name="id"
          placeholder="ID"
          onChange={handleAddFormChange}
          required
        ></input>
        <br />
        <br />
        <input
          type="text"
          name="nameOfBook"
          placeholder="Name Of Book"
          onChange={handleAddFormChange}
          required
        ></input>
 <br /><br />
        <input
          type="text"
          name="nameOfAuthor"
          placeholder="Name of Author"
          onChange={handleAddFormChange}
          required
        ></input>
 <br /><br />
        <input
          type="text"
          name="subtitle"
          placeholder="Subtitle"
          onChange={handleAddFormChange}
          required
        ></input>
 <br /><br />
        <input
          type="text"
          name="publishing"
          placeholder="Publishing"
          onChange={handleAddFormChange}
          required
        ></input>
 <br /><br />
        <input
          type="text"
          name="price"
          placeholder="Price"
          onChange={handleAddFormChange}
          required
        ></input>
 <br /><br />
        <input
          type="text"
          name="publisher"
          placeholder="Publisher"
          onChange={handleAddFormChange}
          required
        ></input>
 <br /><br />
        <input
          type="text"
          name="numberOfBooks"
          placeholder="Number of Books"
          onChange={handleAddFormChange}
          required
        ></input>
 <br /><br />
        <button type="submit">Add book</button>
      </form>
        </div>
    )

}
export default AddBook