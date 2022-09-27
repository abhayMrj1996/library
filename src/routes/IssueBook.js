import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  subtractBookQuantity,
} from "../Book-Library/bookLibraryReducer";
import {
  addIssueDataToStudent,
} from "../student-List/StudentListReducers";
import Button from "@mui/material/Button";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from "@mui/material";
import Barcode from "react-barcode";


function IssueBook() {
  const dispatch = useDispatch();
  const { initialStudentData } = useSelector((state) => state.student);
  const { initialBookList } = useSelector((state) => state.book);

  const [issuedData, setIssuedData] = useState({
    barCode: "",
    book_barcode: "",
  });

  const [dataBarCode, setDataBarCode] = useState();
  const [buttonState, setButtonState] = useState(true);
  const [displayIssueBooks, setDisplayIssueBooks] = useState([]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    const EmptyInput = { ...issuedData };
    EmptyInput[name] = value;
    setIssuedData(EmptyInput);

    // dispaly studentinfo
    const reqData = initialStudentData && initialStudentData.length && initialStudentData.find(
      (data) => data.barCode === e.target.value
    );
    if (Object.keys(reqData).length) {
      setDataBarCode([reqData]);
    }
  };

  const handelFormSubmit = (e) => {
    e.preventDefault();
    dispatch(subtractBookQuantity(displayIssueBooks));
    dispatch(addIssueDataToStudent(displayIssueBooks));
    setDisplayIssueBooks([]);
  };

  //Delete
  const handleCancel = (studentBarcode, bookBarcode) => {
    const filteredDisplayData = displayIssueBooks.filter(
      (data) =>
        data.barCode !== studentBarcode || data.issued_Books !== bookBarcode
    );
    setDisplayIssueBooks(filteredDisplayData);
  };

  useEffect(() => {
    if (!!displayIssueBooks.length) {
      setButtonState(false);
    } else {
      setButtonState(true);
    }
  }, [issuedData]);

  useEffect(() => {
    if (!!issuedData.barCode && !!issuedData.book_barcode) {

      const dataPresent = displayIssueBooks.find(
        //check if the input book is already present in array to be dispatched(displayIssuedBooks)??
        (data) =>
          data.barCode === issuedData.barCode &&
          data.issued_Books === issuedData.book_barcode
      );

      if (!dataPresent) {
        // if not present

        let checkBook = initialBookList.find(
          // check if the book is present in the book list
          (data) => data.barCode === issuedData.book_barcode
        );

        if (!!checkBook) {
          // if book is present in book list , set the data in displayIssuedBooks
          setDisplayIssueBooks([
            ...displayIssueBooks,
            {
              barCode: issuedData.barCode,
              nameOfBook: checkBook.nameOfBook,
              issued_Books: issuedData.book_barcode,
            },
          ]);
          setTimeout(
            () => setIssuedData({ ...issuedData, book_barcode: "" }), //clear input book barcode after 5 seconds
            1000
          );
        }
      }
    }
  }, [issuedData.book_barcode]);

  console.log("formChange", issuedData);
  console.log("data to dispatch!!", displayIssueBooks);

  return (
    <div>
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
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  fullWidth
                ></TextValidator>
              </Grid>

              <Grid xs={12} item>
                <TextValidator
                  type="text"
                  name="book_barcode"
                  label="book id"
                  value={issuedData.book_barcode}
                  onChange={handleFormChange}
                  fullWidth
                />
              </Grid>

              <Grid xs={12} item>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={buttonState}
                >
                  Issue
                </Button>
              </Grid>
            </Grid>
          </ValidatorForm>
        </CardContent>
      </Card>
      <br />

      <ul>
        {!!dataBarCode ? (
          dataBarCode.map((data) => (
            <>
              <Typography variant="h5">Student Information</Typography>
              <Typography variant="h6">id :{data.id}</Typography>
              <Typography variant="h6">Name:{data.first_name} {data.last_name}</Typography>
              <Typography variant="h6">Email:{data.email}</Typography>
              <Typography variant="h6">barCode:{data.barCode}</Typography>
            </>
          ))
        ) : (
          <div></div>
        )}
      </ul>


      {!!displayIssueBooks && displayIssueBooks.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow
                sx={{
                  fontSize: 18,
                  bgcolor: "text.disabled",
                  color: "background.paper",
                }}
              >
                <TableCell
                  sx={{
                    fontSize: 18,
                    bgcolor: "text.disabled",
                    color: "background.paper",
                  }}
                >
                  Student code
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: 18,
                    bgcolor: "text.disabled",
                    color: "background.paper",
                  }}
                >
                  Book
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: 18,
                    bgcolor: "text.disabled",
                    color: "background.paper",
                  }}
                >
                  Book Barcode
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: 18,
                    bgcolor: "text.disabled",
                    color: "background.paper",
                  }}
                >
                  Cancel
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayIssueBooks.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>{data.barCode}</TableCell>
                  <TableCell>{data.nameOfBook}</TableCell>
                  <TableCell><Barcode
                    value={data.issued_Books}
                    renderer={"img"}
                    height={30}
                    width={1}
                    fontSize={12}
                  /></TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleCancel(data.barCode, data.issued_Books)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h1>please scan the barcode</h1>
      )}
    </div>
  );
}
export default IssueBook;
