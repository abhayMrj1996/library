import React, { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { subtractBookQuantity } from "../Book-Library/bookLibraryReducer";
import { addIssueDataToStudent } from "../student-List/StudentListReducers";
import { addBookIssueDataInStudentList } from "../issueBookList/issueBookListReducer";

function IssueBook() {
  const dispatch = useDispatch();
  const {initialIssueBookDataArray}=useSelector((state) => state.issuedataArray)
  
  const [issuedData, setIssuedData] = useState({
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
  
  return (
    <div>
      <form onSubmit={handelFormSubmit}>
      <h2>Issue Book</h2>
      <input
        type="text"
        name="nameOfStudent"
        placeholder="enter student"
        onChange={handleFormChange}
        required
      ></input>
      <br />
      <br />
      <input
        type="text"
        name="nameOfBook"
        placeholder="enter book"
        onChange={handleFormChange}
        required
      ></input>
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
            <th>STUDENT</th>
            <th>ISSued book</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {initialIssueBookDataArray.map((data,index)=>(
            <tr key={index}>
              <td>{data.nameOfStudent}</td>
              <td>{data.nameOfBook}</td>
              <td>{data.issuedBookQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br />
      <h2>return book</h2>
      <label>STUDENT NAME:</label>
      
      <input></input>
      <br /><br />
      
      <label>STUDENT NAME:</label>
      <input></input>

    </div>
  );
}
export default IssueBook;
