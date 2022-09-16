import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MenuItem, Select, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TableComponent from "../table/tableComponent";
import Barcode from "react-barcode";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import {addReturnedBook } from "../Book-Library/bookLibraryReducer";
import {removeReturnDataFromStudentList} from "../student-List/StudentListReducers";

function StudentLibrary() {
  const dispatch=useDispatch();
  const displayStudentData = useSelector(
    (state) => state.student.initialStudentData
  );
  const [totalStudentData, setTotalStuentData] = useState(displayStudentData);
  const [page, setPage] = useState(1);
  const [open, setOpen] = React.useState(false);
  const [issuedBooks, setIssuedBooks] = useState({
    first_name: "",
    last_name: "",
    barCode: "",
    totalbooknameIssuedTo: [],
  });
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [dataToDispatch, setDataToDispatch] = useState({
    first_name: "",
    last_name: "",
    barCode: "",
    totalbooknameIssuedTo: []
  });
  
  // search for student
  const handleSearchStudent = (e) => {
    const { value } = e.target;
    const splitName = value.split(" ");
    if (splitName.length <= 1) {
      const reqStudent = displayStudentData.filter((data) =>
        data.first_name.toLowerCase().includes(splitName[0].toLowerCase())
      );
      setTotalStuentData(reqStudent);
    } else {
      const reqStudent = displayStudentData.filter(
        (data) =>
          data.first_name.toLowerCase().includes(splitName[0].toLowerCase()) &&
          data.last_name.toLowerCase().includes(splitName[1].toLowerCase())
      );
      setTotalStuentData(reqStudent);
    }
  };

  // pagination

  let A = page * 5;
  let B = A - 5;
  const pageData = totalStudentData.slice(B, A);

  const clickPrev = () => {
    const pageCount = page >= 2 ? page - 1 : page;
    setPage(pageCount);
  };

  const clickNext = () => {
    const pageCount =
      page <= Math.ceil(totalStudentData.length / 5) - 1 ? page + 1 : page;
    setPage(pageCount);
  };

  // return book
  const handleClickOpen = (
    TotalbooknameIssuedTo,
    BarCode,
    First_name,
    Last_name
  ) => {
   
    setIssuedBooks({
      ...issuedBooks,
      first_name: First_name,
      last_name: Last_name,
      barCode: BarCode,
      totalbooknameIssuedTo: TotalbooknameIssuedTo,
    });
    setDataToDispatch({
      ...dataToDispatch,
      first_name: First_name,
      last_name: Last_name,
      barCode: BarCode,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBooks([]);
    setDataToDispatch({first_name: "",
    last_name: "",
    barCode: "",
    totalbooknameIssuedTo: []
  })
  };
  
  const handleBookSelect = (e) => {
    setSelectedBooks([...selectedBooks, e.target.value]);
    setDataToDispatch({
      ...dataToDispatch,
      totalbooknameIssuedTo: [...dataToDispatch.totalbooknameIssuedTo, e.target.value],
    });
  };
  const handelReturnBook = () => {
    
    dispatch(addReturnedBook(dataToDispatch));
    dispatch(removeReturnDataFromStudentList(dataToDispatch))
  };

  //Heading
  const HEADING = Object.keys(pageData[0]);
  

  return (
    <div>
      <main style={{ padding: "1rem 0" }}>
        <h2>STUDENT LIST</h2>
      </main>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"RETURN BOOK?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography>First name: {issuedBooks.first_name}</Typography>
            <Typography>Last Name: {issuedBooks.last_name}</Typography>
            <Typography>Barcode: {issuedBooks.barCode}</Typography>
            <Typography>
              Selected Books:
              {!!selectedBooks &&
                selectedBooks.map((data) => (
                  <Typography value={data}>{data}</Typography>
                ))}
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
              <InputLabel id="demo-select-small">Select Book</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                label="Select book"
                onChange={handleBookSelect}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {!!issuedBooks &&
                  issuedBooks.totalbooknameIssuedTo.map((data) => (
                    <MenuItem value={data}>{data}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handelReturnBook}>Return</Button>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Grid container spacing={1}>
        <Grid xs={12} item>
          <TextField
            onChange={handleSearchStudent}
            placeholder="Search student..."
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Grid>
        <Grid xs={12} item>
          <TableComponent
            data={pageData}
            tableID="student"
            HEADING={HEADING}
            handleClickOpen={handleClickOpen}
          />
        </Grid>
        <Grid xs={12} sx={{ textAlign: "center" }} item>
          <Button onClick={() => clickPrev()} variant="contained">
            <ArrowBackIosIcon />
            prev
          </Button>
          {page} - 10
          <Button onClick={() => clickNext()} variant="contained">
            next
            <ArrowForwardIosIcon />
          </Button>
        </Grid>
      </Grid>
      <Barcode value={"student2022A1"} renderer={"img"} height={30} width={1} />
    </div>
  );
}

export default StudentLibrary;
