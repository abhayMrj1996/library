import React, { useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReturnedBook, subtractBookQuantity } from "../Book-Library/bookLibraryReducer";
import { addIssueDataToStudent, removeReturnDataFromStudentList } from "../student-List/StudentListReducers";
import { addBookIssueDataInStudentList } from "../issueBookList/issueBookListReducer";
import { returnBook } from "../issueBookList/issueBookListReducer";
import FormControl from "@mui/material/FormControl";
import { Box, MenuItem, Select } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Input from '@mui/material/Input'; 
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';

function IssueBook() {
  const dispatch = useDispatch();
  const { initialIssueBookDataArray } = useSelector((state) => state.issuedataArray);
  const { initialStudentData } = useSelector((state) => state.student);
  const { initialBookList } = useSelector((state) => state.book);

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
    console.log(issuedData)
  };
  const handelReturnBook = (student_name, book_name, book_quantity) => {


    const return_data = {
      nameOfStudent: student_name,
      nameOfBook: book_name,
      issuedBookQuantity: book_quantity
    }

    dispatch(returnBook(return_data));
    dispatch(addReturnedBook(return_data));
    dispatch(removeReturnDataFromStudentList(return_data))


  }


  return (
    <div >
      <h3>Issue book</h3>
      <br />
      

        <form onSubmit={handelFormSubmit}>
    <Box sx={{ minWidth: 130 }}>
      <FormControl>        
        <Select 
        type="text" 
        name="nameOfStudent" 
        onChange={handleFormChange} 
        required>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {initialStudentData.map((data) => (
            <MenuItem key={data.id} value={`${data.first_name} ${data.last_name}`}>
              {data.first_name} {data.last_name}
            </MenuItem>))}
        </Select>        
        <br />                 
        <Select
          type="text"
          name="nameOfBook"
          onChange={handleFormChange}
          required>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {initialBookList.map((data) => (
            <MenuItem key={data.id} value={data.nameOfBook}>{data.nameOfBook}</MenuItem>
          ))}
        </Select>
        <br />
             
        <TextField label="enter bookQuantity" variant="outlined" name="issuedBookQuantity"onChange={handleFormChange} type="number"/>
        <br />
        <Button type="submit" variant='contained'>Issue</Button>
 
      </FormControl>
    </Box>
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
          {initialIssueBookDataArray.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.nameOfStudent}</td>
              <td>{data.nameOfBook}</td>
              <td>{data.issuedBookQuantity}</td>
              <td><button onClick={() => handelReturnBook(data.nameOfStudent, data.nameOfBook, data.issuedBookQuantity)}>return</button></td>
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
