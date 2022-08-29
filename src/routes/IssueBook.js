import React, { useState, } from "react";
import { useDispatch,useSelector } from "react-redux";
import { addReturnedBook, subtractBookQuantity } from "../Book-Library/bookLibraryReducer";
import { addIssueDataToStudent } from "../student-List/StudentListReducers";
import { addBookIssueDataInStudentList } from "../issueBookList/issueBookListReducer";
import { returnBook } from "../issueBookList/issueBookListReducer";

function IssueBook() {
  const dispatch = useDispatch();
  const {initialIssueBookDataArray}=useSelector((state) => state.issuedataArray);
  const {initialStudentData}=useSelector((state) => state.student);
  const {initialBookList} = useSelector((state)=> state.book);
  
  const [issuedData, setIssuedData] = useState({
    id:"",
    nameOfStudent: "",
    nameOfBook: "",
    issuedBookQuantity: "",
  });
  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    const EmptyInput = { ...issuedData };
    EmptyInput[name] = value;  
    setIssuedData(EmptyInput);
  }
  

    const handelFormSubmit = (e) => {
        e.preventDefault();
      dispatch(subtractBookQuantity(issuedData));
      dispatch(addIssueDataToStudent(issuedData));
      dispatch(addBookIssueDataInStudentList(issuedData));
    };
    const handelReturnBook=(student_name,book_name,book_quantity)=>{
      
      
      const return_data={
        nameOfStudent: student_name,
        nameOfBook: book_name,
        issuedBookQuantity: book_quantity
      }
      console.log(return_data);
      dispatch(returnBook(return_data));
      dispatch(addReturnedBook(return_data));

    }
    
  
  return (
    <div>
      <form onSubmit={handelFormSubmit}>
      <h2>Issue Book</h2>
      <select type="text" name="nameOfStudent" onChange={handleFormChange} required>
        <option></option>
        {initialStudentData.map((data) =>(
        <option key={data.id}>
          {data.first_name} {data.last_name}
        </option>))}
      </select>
      
      <br />
      <br />
      <select
        type="text"
        name="nameOfBook"
        placeholder="enter book"
        onChange={handleFormChange}
        required>
          <option></option>
        {initialBookList.map((data)=>(
          <option key={data.id}>{data.nameOfBook}</option>
        ))}
      </select>
      <br />
      <br />
      <input
        type="number"
        name="issuedBookQuantity"
        placeholder="issue quantity"
        onChange={handleFormChange}
        required
      ></input>
      <br />
      <br />
      <button type="submit">Issue</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>STUDENT</th>
            <th>ISSued book</th>
            <th>Quantity</th>
            <th>RETURN BOOK</th>
          </tr>
        </thead>
        <tbody>
          {initialIssueBookDataArray.map((data,index)=>(
            <tr key={index}>
              <td>{index+1}</td>
              <td>{data.nameOfStudent}</td>
              <td>{data.nameOfBook}</td>
              <td>{data.issuedBookQuantity}</td>
              <td><button onClick={()=>handelReturnBook(data.nameOfStudent,data.nameOfBook,data.issuedBookQuantity)}>return</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br />
      
    </div>
  );
}
export default IssueBook;
