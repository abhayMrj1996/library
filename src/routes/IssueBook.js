import React, { useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReturnedBook, subtractBookQuantity } from "../Book-Library/bookLibraryReducer";
import { addIssueDataToStudent, removeReturnDataFromStudentList } from "../student-List/StudentListReducers";
import { addBookIssueDataInStudentList } from "../issueBookList/issueBookListReducer";
import { returnBook } from "../issueBookList/issueBookListReducer";
import { MenuItem, Select } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import { Card, CardContent,Typography,Grid } from "@mui/material";
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Table from "@mui/material/Table";
import TableHead from '@mui/material/TableHead';
import TableBody from "@mui/material/TableBody";
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableComponent from "../table/tableComponent";


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
  const HEADING=Object.keys(issuedData);
  console.log(HEADING);
  
  return (
    <div >
      
      <Card style={{ maxWidth: 450, margin: "0 auto", padding: "20px 5px" }}>
        <CardContent>
          <form onSubmit={handelFormSubmit}>
          <Typography variant="h4">Issue book</Typography>
          <Grid container spacing={1}>
          <Grid xs={12} item>
              <Select
                type="text"
                name="nameOfStudent"
                onChange={handleFormChange}
                required
                fullWidth>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {initialStudentData.map((data) => (
                  <MenuItem key={data.id} value={`${data.first_name} ${data.last_name}`}>
                    {data.first_name} {data.last_name}
                  </MenuItem>))}
              </Select></Grid>

              <Grid xs={12} item>
              <Select
                type="text"
                name="nameOfBook"
                onChange={handleFormChange}
                required
                fullWidth>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {initialBookList.map((data) => (
                  <MenuItem key={data.id} value={data.nameOfBook}>{data.nameOfBook}</MenuItem>
                ))}
              </Select></Grid>
              
              <Grid xs={12} item>
              <TextField label="enter bookQuantity" 
              variant="outlined" 
              name="issuedBookQuantity" 
              onChange={handleFormChange} 
              type="number"
              fullWidth />
              </Grid>
              <Grid xs={12} item>
              <Button type="submit" variant='contained'>Issue</Button>
              </Grid>
              </Grid>
            </form>
        </CardContent>
      </Card>
      {/* <br/>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead sx={{ bgcolor: 'primary.main' }}>
          <TableRow>
            <TableCell sx={{fontSize:18}}>ID</TableCell>
            <TableCell sx={{fontSize:18}}>STUDENT</TableCell>
            <TableCell sx={{fontSize:18}}>ISSued book</TableCell>
            <TableCell sx={{fontSize:18}}>Quantity</TableCell>
            <TableCell sx={{fontSize:18}}>RETURN BOOK</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {initialIssueBookDataArray.map((data, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{data.nameOfStudent}</TableCell>
              <TableCell>{data.nameOfBook}</TableCell>
              <TableCell>{data.issuedBookQuantity}</TableCell>
              <TableCell>
                <button onClick={() => handelReturnBook(data.nameOfStudent, data.nameOfBook, data.issuedBookQuantity)}>
                  return
                </button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer> */}
      <TableComponent 
      data={initialIssueBookDataArray}
      HEADING={HEADING}
      handelReturnBook={handelReturnBook}
      tableID='issueBook'
      />

    </div>
  );
}
export default IssueBook;
