
import React from 'react';
import NavBar from "./routes/NavBar";
import { Outlet, Routes, Route } from "react-router-dom";
import StudentLibrary from "./routes/StudentLibrary.jsx"
import BookLibrary from "./routes/BookLibrary.jsx";
import IssueBook from "./routes/IssueBook.js";
import AddBook from "./routes/AddBook.js";
import LoginPage from './routes/LoginPage';
import ProtectedRoutes from './routes/ProtectedRoutes';
import AddStudent from './routes/AddStudent';


function App() {    
   
  return (

    <div className="App">
      <NavBar />
      <Routes>
          <Route path="/" element={<LoginPage /> }/>
          <Route path="book-library" element={<ProtectedRoutes Components={BookLibrary} />} />
          <Route path="issue-book" element={<ProtectedRoutes Components={IssueBook}/>} />
          <Route path="add-book" element={<ProtectedRoutes Components={AddBook}/>} />
          <Route path="student-library" element={<ProtectedRoutes Components={StudentLibrary}/>} />
          <Route path="add-student" element={<ProtectedRoutes Components={AddStudent}/>} />
      </Routes>

      <Outlet />

    </div>
  );
}

export default App;



