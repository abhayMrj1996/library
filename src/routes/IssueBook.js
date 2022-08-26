import React, { useState, } from "react";
import { useDispatch,useSelector } from "react-redux";
import { subtractBookQuantity } from "../Book-Library/bookLibraryReducer";
import { addIssueDataToStudent } from "../student-List/StudentListReducers";
import { addBookIssueDataInStudentList } from "../issueBookList/issueBookListReducer";
// import { returnBookToLibrary } from "../Book-Library/bookLibraryReducer"

function IssueBook() {
  const dispatch = useDispatch();
  const {initialIssueBookDataArray}=useSelector((state) => state.issuedataArray)
  
  const [issuedData, setIssuedData] = useState({
    nameOfStudent: "",
    nameOfBook: "",
    issuedBookQuantity: "",
  });
  const [returnData, setReturnData] = useState({
    nameOfStudent: "",
    nameOfBook: ""
  })

  // const handleReturnData =(e)=>{
  //   const { name, value } = e.target;
  //   const EmptyInput = { ...returnData };
  //   EmptyInput[name] = value;
  //   setReturnData(EmptyInput);

  // }

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
    // const handleReturnSubmit=(e)=>{
    //   e.preventDefault();
    //   dispatch(returnBookToLibrary(returnData));
    // }
  
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
            <th>RETURN BOOK</th>
          </tr>
        </thead>
        <tbody>
          {initialIssueBookDataArray.map((data,index)=>(
            <tr key={index}>
              <td>{data.nameOfStudent}</td>
              <td>{data.nameOfBook}</td>
              <td>{data.issuedBookQuantity}</td>
              <td><button>return</button></td>
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
