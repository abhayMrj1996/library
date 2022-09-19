import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBookToLibrary } from "../Book-Library/bookLibraryReducer";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography,Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";


function AddBook() {
  const dispatch = useDispatch();
  const { initialBookList } = useSelector((state) => state.book);
  const [newBook, setNewBook] = useState({
    id: "",
    nameOfBook: "",
    nameOfAuthor: "",
    subtitle: "",
    publishing: "",
    publisher: "",
    price: "",
    numberOfBooks: "",
    barCode: ""
  });
  const handleAddFormChange = (e) => {
    const { name, value } = e.target;
    const EmptyInput = { ...newBook };
    EmptyInput[name] = value;
    console.log(initialBookList.length);
    EmptyInput.id = initialBookList.length + 1;
    EmptyInput.barCode = "book2022A" + EmptyInput.id;
    setNewBook(EmptyInput);

  }
  const handleAddFormSubmit = (e) => {
    e.preventDefault();

    dispatch(addBookToLibrary(newBook))

  }
  return (
    <div>
      <Card style={{ maxWidth: 450, margin: "0 auto", padding: "20px 5px" }}>
        <CardContent>
          <form onSubmit={handleAddFormSubmit}>
            <Typography variant="h4">Book entries</Typography>

            <Grid container spacing={1}>
              <Grid xs={12} item>
                <TextField
                  type="text"
                  name="nameOfBook"
                  placeholder="Name Of Book"
                  onChange={handleAddFormChange}
                  required
                  fullWidth
                ></TextField>
              </Grid>

              <Grid xs={12}  item>
                <TextField
                  type="text"
                  name="nameOfAuthor"
                  placeholder="Name of Author"
                  onChange={handleAddFormChange}
                  required
                  fullWidth
                ></TextField>
                </Grid>

              <Grid xs={12}  item>
                <TextField
                  type="text"
                  name="subtitle"
                  placeholder="Subtitle"
                  onChange={handleAddFormChange}
                  required
                  fullWidth
                ></TextField>
                </Grid>

              <Grid xs={12}  item>
                <TextField
                  type="text"
                  name="publishing"
                  placeholder="Publishing"
                  onChange={handleAddFormChange}
                  required
                  fullWidth
                ></TextField>
                </Grid>

                <Grid xs={12}  item>
                <TextField
                type="text"
                name="publisher"
                placeholder="Publisher"
                onChange={handleAddFormChange}
                required
                fullWidth
              ></TextField>
              </Grid>
              
              <Grid xs={12} sm={6} item>
                <TextField
                type="text"
                name="price"
                placeholder="Price"
                onChange={handleAddFormChange}
                required
              ></TextField>
              </Grid>             

              <Grid xs={12} sm={6} item>
                <TextField
                type="text"
                name="numberOfBooks"
                placeholder="Number of Books"
                onChange={handleAddFormChange}
                required
              ></TextField>
              </Grid>

              <Grid xs={12} item>
                <Button type="submit" variant="contained">Add book</Button>
                </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  )

}
export default AddBook