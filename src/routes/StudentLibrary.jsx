import React, { useState } from "react";
import { useSelector, } from "react-redux";
import { TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TableComponent from "../table/tableComponent";

function StudentLibrary() {
  const displayStudentData = useSelector(
    (state) => state.student.initialStudentData
  );
  const [totalStudentData, setTotalStuentData] = useState(displayStudentData);
  const handleSearchStudent = (e) => {
    const { value } = e.target;
    const splitName = value.split(" ");
    if(splitName.length<=1){
      const reqStudent = displayStudentData.filter((data) =>
     data.first_name.toLowerCase().includes(splitName[0].toLowerCase()))
     setTotalStuentData(reqStudent); 
    }    
    else{
    const reqStudent = displayStudentData.filter((data) =>
     data.first_name.toLowerCase().includes(splitName[0].toLowerCase()) 
     &&
     data.last_name.toLowerCase().includes(splitName[1].toLowerCase()));
     setTotalStuentData(reqStudent);
  }
    
  } 

  const [page, setPage] = useState(1);

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
  const HEADING = Object.keys(pageData[0])

  return (
    <div>
      <main style={{ padding: "1rem 0" }}>
        <h2>STUDENT LIST</h2>
      </main>
 
      <Grid container spacing={1}>
      <Grid xs={12} item>
      <TextField
       onChange={handleSearchStudent} 
       placeholder='Search student...'
       size='small'
       InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        )
      }}></TextField>
      </Grid>
      <Grid xs={12} item>             
      <TableComponent
            data={pageData}
            tableID='student'
            HEADING={HEADING} />
      </Grid>
      <Grid xs={12} sx={{textAlign:'center'}} item>
      
      <Button onClick={() => clickPrev()} variant="contained"><ArrowBackIosIcon />prev</Button>
      {page} - 10
      <Button onClick={() => clickNext()} variant="contained">next<ArrowForwardIosIcon /></Button>
      </Grid>
      </Grid>
      </div>
  );
}

export default StudentLibrary;
