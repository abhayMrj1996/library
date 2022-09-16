import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReturnedBook, subtractBookQuantity } from "../Book-Library/bookLibraryReducer";
import { addIssueDataToStudent, removeReturnDataFromStudentList } from "../student-List/StudentListReducers";
import { addBookIssueDataInStudentList } from "../issueBookList/issueBookListReducer";
import { returnBook } from "../issueBookList/issueBookListReducer";
import { MenuItem, Select, TableBody, TableCell } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import { Card, CardContent, Typography, Grid } from "@mui/material";
import TableComponent from "../table/tableComponent";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


function IssueBook() {
  const dispatch = useDispatch();
  const { initialIssueBookDataArray } = useSelector((state) => state.issuedataArray);
  const { initialStudentData } = useSelector((state) => state.student);
  const { initialBookList } = useSelector((state) => state.book);

  const [issuedData, setIssuedData] = useState({
    barCode: "",
    nameOfBook: "",
    // issuedBookQuantity: "",
  });

  const [dataBarCode, setDataBarCode] = useState();
  const [bookReqData, setBookReqData] = useState();
  const [buttonState, setButtonState] = useState(true);
  const [displayIssueBooks, setDisplayIssueBooks] = useState([]);


  const handleFormChange = (e) => {
    const { name, value } = e.target;
    const EmptyInput = { ...issuedData };
    EmptyInput[name] = value;
    setIssuedData(EmptyInput);

    //dispaly studentinfo
    // const reqData = initialStudentData.find((data) =>
    //   data.barCode === e.target.value)
    // if (reqData) { setDataBarCode([reqData]) }


    // //find number of book for comparision
    // if (name === 'nameOfBook') {
    //   const issueBookLimitComparision = initialBookList.find((data) =>
    //     data.nameOfBook === value)
    //  if (issueBookLimitComparision) {setBookReqData(issueBookLimitComparision)}
    // }


  }



  const handelFormSubmit = (e) => {
    e.preventDefault();
    // dispatch(subtractBookQuantity(issuedData));
    // dispatch(addIssueDataToStudent(issuedData));
    // dispatch(addBookIssueDataInStudentList(issuedData));

  };
  const handelReturnBook = (student_barCode, book_name, book_quantity) => {
    const return_data = {
      barCode: student_barCode,
      nameOfBook: book_name,
      issuedBookQuantity: book_quantity
    }
    // dispatch(returnBook(return_data));
    // dispatch(addReturnedBook(return_data));
    // dispatch(removeReturnDataFromStudentList(return_data))
  }
  const HEADING = Object.keys(issuedData); 
  
  useEffect(() => {
    ValidatorForm.addValidationRule('limitCheck', (value) => {      
      if (value > bookReqData.numberOfBooks) {
        return false;
      }
      return true;
    });    
  }, [issuedData])

  useEffect(() => {
    if (!!issuedData.issuedBookQuantity && !!issuedData.barCode && !!issuedData.nameOfBook && (issuedData.issuedBookQuantity < bookReqData.numberOfBooks)) {
      setButtonState(false)
    } else {
      setButtonState(true)
    }
  }, [issuedData])

  useEffect(()=>{
    if(!!issuedData.barCode && !!issuedData.nameOfBook){
      let books=issuedData.nameOfBook.split(',');
      for(let i=0; i < books.length; i++){
        let checkBook=initialBookList.find((data)=>data.nameOfBook === books[i])
        console.log("###",i,books[i],"checkBook=",checkBook);
        if (!!checkBook && books[i]===checkBook.nameOfBook){
          console.log('set_data');
          setIssuedData({...issuedData, nameOfBook:''})
          
          setDisplayIssueBooks([...displayIssueBooks,{barCode:issuedData.barCode ,issued_Books:books[i]}])
        }
      }
    }
  },[issuedData.nameOfBook])

  console.log(displayIssueBooks)

  return (
    <div >

      <Card style={{ maxWidth: 450, margin: "0 auto", padding: "20px 5px" }}>
        <CardContent>
          <ValidatorForm onSubmit={handelFormSubmit}>
            <Typography variant="h4">Issue book</Typography>
            <Grid container spacing={1}>
              <Grid xs={12} item>
                <TextValidator
                  type="text"
                  label="user id"
                  name="barCode"
                  value={issuedData.barCode}
                  onChange={handleFormChange}
                  validators={['required']}
                  errorMessages={['this field is required']}
                  fullWidth>
                </TextValidator></Grid>

              <Grid xs={12} item>
                <TextValidator
                  type="text"
                  name="nameOfBook"
                  label="book id"
                  value={issuedData.nameOfBook}
                  onChange={handleFormChange}
                  validators={['required']}
                  errorMessages={['this field is required']}
                  fullWidth />
              </Grid>

              {/* <Grid xs={12} item>
                <TextValidator
                  label="enter bookQuantity"
                  variant="outlined"
                  name="issuedBookQuantity"
                  value={issuedData.issuedBookQuantity}
                  onChange={handleFormChange}
                  type="number"
                  validators={['limitCheck', 'required']}
                  errorMessages={['limit exceeded', 'this field is required']}
                  fullWidth />
              </Grid> */}
              <Grid xs={12} item>
                <Button type="submit" variant='contained' disabled={buttonState}>Issue</Button>
              </Grid>
            </Grid>
          </ValidatorForm>
        </CardContent>
      </Card>

      <ul>
        {!!dataBarCode ? dataBarCode.map((data) => (
          <>
            <div>Student InFo</div>
            <div>id :{data.id}</div>
            <div>First name:{data.first_name}</div>
            <div>Last name:{data.last_name}</div>
            <div>Gender:{data.gender}</div>
            <div>Email:{data.email}</div>
            <div>barCode:{data.barCode}</div>
          </>
        )) : <div></div>}
      </ul>


      <TableComponent
        data={initialIssueBookDataArray}
        HEADING={HEADING}
        handelReturnBook={handelReturnBook}
        tableID='issueBook'
      />
      {/* {!!displayIssueBooks ?console.log("works",displayIssueBooks):console.log('no work')} */}
     

      
    </div>
  );
}
export default IssueBook;
