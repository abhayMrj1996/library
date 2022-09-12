
import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteRow } from "../Book-Library/bookLibraryReducer";
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Table from "@mui/material/Table";
import TableHead from '@mui/material/TableHead';
import TableBody from "@mui/material/TableBody";
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TextField } from "@mui/material";
import Grid from '@mui/material/Grid'
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import TableComponent from "../table/tableComponent";

function BookLibrary() {
  const dispatch = useDispatch();
  const displayBookData = useSelector((state) => state.book.initialBookList);
  const [totalBookData, setTotalBookData] = useState([...displayBookData]);


  // search book
  const handleSearchBook = (e) => {
    const { value } = e.target;
    const reqBook = displayBookData.filter((data) => data.nameOfBook.includes(value));

    setTotalBookData(reqBook);
  }


  //pagination
  const [page, setPage] = useState(1);
  let A = page * 5;
  let B = A - 5;
  let pageData = totalBookData.slice(B, A);


  useEffect(() => {

    setTotalBookData(displayBookData)
  }, [displayBookData])

  const clickPrev = () => {
    const pageCount = page >= 2 ? page - 1 : page;
    setPage(pageCount);
  };
  const clickNext = () => {
    const pageCount = page <= Math.ceil(totalBookData.length / 5) - 1 ? page + 1 : page;
    setPage(pageCount);
  }

  //delete
  const handleDelete = (rowId) => {
    const newBookList = [...displayBookData];
    const index = newBookList.findIndex((deleteID) => deleteID.id === rowId);
    newBookList.splice(index, 1);
    dispatch(deleteRow(newBookList))

  }
  const HEADING = Object.keys(pageData[0])

  return (
    <div>
      <main style={{ paddingBottom: "1rem", textAlign: 'center' }}>
        <h2>BOOKS AVAILABLE</h2>
        <Link style={{ margin: "1rem 0" }} to="/add-book">
          AddBook
        </Link>{' '}|{' '}
        <Link style={{ margin: "1rem 0" }} to="/issue-book">
          IssueBook
        </Link>
        <Outlet />
      </main>
      <Grid container spacing={1}>
        <Grid xs={12} item>
          <TextField
            type='text'
            name='searchBar'
            placeholder='Search book...'
            onChange={handleSearchBook}
            size='small'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              )
            }} />
        </Grid>
        
        <Grid xs={12} item>
          {/* <TableComponent
            data={pageData}
            tableID='book'
            handleDelete={handleDelete}
            HEADING={HEADING} /> */}
        </Grid>

        <Grid xs={12} item sx={{ textAlign: 'center', }}>
          <Button onClick={() => clickPrev()}
            variant="contained">
            <ArrowBackIosIcon />prev</Button>
          {page} - {Math.ceil(totalBookData.length / 5)}
          <Button onClick={() => clickNext()}
            variant="contained">
            next<ArrowForwardIosIcon /></Button>
        </Grid>
      </Grid>

    </div>
  );
}

export default BookLibrary;
