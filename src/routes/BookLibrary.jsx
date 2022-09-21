import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteRow } from "../Book-Library/bookLibraryReducer";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import TableComponent from "../table/tableComponent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Barcode from "react-barcode";
import { loginAuth } from "../loginAuthenticaton/loginAuthReducer";

function BookLibrary() {
  const dispatch = useDispatch();
  const displayBookData = useSelector((state) => state.book.initialBookList);
  const [totalBookData, setTotalBookData] = useState([...displayBookData]);
  const [open, setOpen] = React.useState(false);
  const [list, setList] = useState();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  React.useEffect(()=>{
    const value = JSON.parse(localStorage.getItem('loginValues'));
    if (value) {    
    dispatch(loginAuth(JSON.parse(localStorage.getItem('loginValues'))));   
   }
   },[]);

  // search book
  const handleSearchBook = (e) => {
    const { value } = e.target;
    const reqBook = displayBookData.filter((data) =>
      data.nameOfBook.includes(value)
    );

    setTotalBookData(reqBook);
  };

  //pagination
  const [page, setPage] = useState(1);
  let A = page * 5;
  let B = A - 5;
  let pageData = totalBookData.slice(B, A);

  useEffect(() => {
    setTotalBookData(displayBookData);
  }, [displayBookData]);

  const clickPrev = () => {
    const pageCount = page >= 2 ? page - 1 : page;
    setPage(pageCount);
  };
  const clickNext = () => {
    const pageCount =
      page <= Math.ceil(totalBookData.length / 5) - 1 ? page + 1 : page;
    setPage(pageCount);
  };

  //delete
  const handleDelete = () => {
    setOpen(false);
    dispatch(deleteRow(list));
  };

  // delete Dialogue message
  const handleClickOpen = (rowId) => {
    const newBookList = [...displayBookData];
    const index = newBookList.findIndex((deleteID) => deleteID.id === rowId);
    newBookList.splice(index, 1);  
    setList(newBookList);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const HEADING = [
    {
      key: 1,
      label: "nameOfBook",
      formatFunction: (value) => value,
    },
    {
      key: 2,
      label: "nameOfAuthor",
      formatFunction: (value) => value,
    },
    {
      key: 3,
      label: "subtitle",
      formatFunction: (value) => value,
    },
    {
      key: 4,
      label: "publisher",
      formatFunction: (value) => value,
    },
    {
      key: 5,
      label: "price",
      formatFunction: (value) => value,
    },
    {
      key: 6,
      label: "numberOfBooks",
      formatFunction: (value) => value,
    },
    {
      key: 7,
      label: "barCode",
      formatFunction: (value) => value,
    },
  ];

  const otherData = [
    {
      key: "1666",
      label: "barCode",
      render: (tableData) => {      
        return (
          <Barcode
            value={tableData.barCode}
            renderer={"img"}
            height={30}
            width={1}
            fontSize={12}
          />
        );
      },
    },
    {
      key: "17777",
      label: "deleteButton",
      render: (tableData) => {
        return (
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              handleClickOpen(
                tableData.id
              );
            }}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <main style={{ paddingBottom: "1rem", textAlign: "center" }}>
        <h2>BOOKS AVAILABLE</h2>
        <Link style={{ margin: "1rem 0" }} to="/add-book">
          AddBook
        </Link>{" "}
        |{" "}
        <Link style={{ margin: "1rem 0" }} to="/issue-book">
          IssueBook
        </Link>
        <Outlet />
      </main>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"DELETE BOOK?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Do you wantto delete this!!!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={handleDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container spacing={1}>
        <Grid xs={12} item>
          <TextField
            type="text"
            name="searchBar"
            placeholder="Search book..."
            onChange={handleSearchBook}
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
          />
        </Grid>

        <Grid xs={12} item>
          <TableComponent
            data={pageData}
            tableID="book"
            handleClickOpen={handleClickOpen}
            HEADING={HEADING}
            otherData={otherData}
          />
        </Grid>

        <Grid xs={12} item sx={{ textAlign: "center" }}>
          <Button onClick={() => clickPrev()} variant="contained">
            <ArrowBackIosIcon />
            prev
          </Button>
          {page} - {Math.ceil(totalBookData.length / 5)}
          <Button onClick={() => clickNext()} variant="contained">
            next
            <ArrowForwardIosIcon />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default BookLibrary;
