import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStudentToList } from "../student-List/StudentListReducers";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography,Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

function AddStudent() {
    const dispatch = useDispatch();
    const { initialStudentData } = useSelector((state) => state.student);
    console.log("studentlist",initialStudentData)
    const [newStudent, setNewStudent] = useState({
        id: "",
        first_name: "",
        last_name: "",
        email: "",
        totalBookIssuedTo: "0",
        totalbooknameIssuedTo: [],
        barCode: ""
    });
    const handleAddFormChange = (e) => {
      const { name, value } = e.target;
      const EmptyInput = { ...newStudent };
      EmptyInput[name] = value;      
      EmptyInput.id = initialStudentData.length + 1;
      EmptyInput.barCode = "student2022A" + EmptyInput.id;
      setNewStudent(EmptyInput);
  
    }
    const handleAddFormSubmit = (e) => {
      e.preventDefault();
  
      dispatch(addStudentToList(newStudent))
  
    }
    console.log("!!!!",newStudent)
    return (
      <div>
        <Card style={{ maxWidth: 450, margin: "0 auto", padding: "20px 5px" }}>
          <CardContent>
            <form onSubmit={handleAddFormSubmit}>
              <Typography variant="h4">Student entries</Typography>
  
              <Grid container spacing={1}>
                <Grid xs={12} item>
                  <TextField
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    onChange={handleAddFormChange}
                    required
                    fullWidth
                  ></TextField>
                </Grid>
  
                <Grid xs={12}  item>
                  <TextField
                    type="text"
                    name="last_name"
                    placeholder="Second Name"
                    onChange={handleAddFormChange}
                    required
                    fullWidth
                  ></TextField>
                  </Grid>
  
                <Grid xs={12}  item>
                  <TextField
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={handleAddFormChange}
                    required
                    fullWidth
                  ></TextField>
                  </Grid>
                <Grid xs={12} item>
                  <Button type="submit" variant="contained">Add Student</Button>
                  </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  
  }
  export default AddStudent