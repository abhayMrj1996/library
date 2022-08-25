import { Outlet, Link } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>BOOK LIBRARY</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/book-library">Book-Library</Link> |{" "}
        <Link to="/student-library">Student-Library</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
