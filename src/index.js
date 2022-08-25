
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import StudentLibrary from "./routes/StudentLibrary.jsx"
import BookLibrary from "./routes/BookLibrary.jsx";
import IssueBook from "./routes/IssueBook.js";
import AddBook from "./routes/AddBook.js";
import { Provider } from "react-redux";
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(  
  <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >

      <Route path="book-library" element={<BookLibrary />} />
      <Route path="issue-book" element={<IssueBook />} />
      <Route path="add-book" element={<AddBook />} />
          

      <Route path="student-library" element={<StudentLibrary />} />
     </Route>
    </Routes>
  </BrowserRouter>
  </Provider>
  
);

