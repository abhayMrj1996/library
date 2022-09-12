
import React from 'react';
import NavBar from "./routes/NavBar";
import { Outlet, Routes, Route } from "react-router-dom";
import StudentLibrary from "./routes/StudentLibrary.jsx"
import BookLibrary from "./routes/BookLibrary.jsx";
import IssueBook from "./routes/IssueBook.js";
import AddBook from "./routes/AddBook.js";
import LoginPage from './routes/LoginPage';
import { useSelector, } from "react-redux";
import ProtectedRoutes from './routes/ProtectedRoutes';


function App() {    
    const initialLogIn=useSelector((state) => state.loginAuth.initialLogIn);
    console.log("loginSTATE",initialLogIn)
  return (

    <div className="App">
      <NavBar />
      <Routes>
          <Route path="/" element={<LoginPage /> }/>
          <Route path="book-library" element={<ProtectedRoutes Components={BookLibrary} />} />
          <Route path="issue-book" element={<ProtectedRoutes Components={IssueBook}/>} />
          <Route path="add-book" element={<ProtectedRoutes Components={AddBook}/>} />
          <Route path="student-library" element={<ProtectedRoutes Components={StudentLibrary}/>} />
      </Routes>

      <Outlet />

    </div>
  );
}

export default App;



