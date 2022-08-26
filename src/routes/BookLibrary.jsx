
import React,{useState,useEffect} from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector,useDispatch} from "react-redux";
import {deleteRow} from "../Book-Library/bookLibraryReducer";


function BookLibrary() {
  const dispatch = useDispatch();
  const displayBookData = useSelector((state) => state.book.initialBookList);

  const [totalStudentData,setTotalStuentData]=useState([...displayBookData]);
 

  // search book
  const handleSearchBook =(e) =>{    
  const {value}=e.target;  
  const reqBook = displayBookData.filter((data)=>data.nameOfBook.includes(value));
  
  setTotalStuentData(reqBook); 
  }
  
  
  //pagination
  const [page,setPage]=useState(1);
  let A = page * 5; 
  let B = A - 5;

  useEffect(()=>{

  },[displayBookData])
  
  const clickPrev = () => {
    const pageCount = page >= 2 ? page - 1 : page;
    setPage(pageCount);
  };
  const clickNext = () => {
    const pageCount = page <= Math.ceil(totalStudentData.length / 5)-1 ? page + 1 : page;
    setPage(pageCount);
  }

  //delete
  const handleDelete = (rowId) =>{
    
   const newBookList=[...displayBookData];
   const index = newBookList.findIndex((deleteID)=>deleteID.id===rowId);
   newBookList.splice(index,1);
   
   dispatch(deleteRow(newBookList))
   
  }

  

  

  return (
    <div>
      <main style={{ paddingBottom: "1rem" }}>
        <h2>BOOKS AVAILABLE</h2>
        <Link style={{ margin: "1rem 0" }} to="/add-book">
          AddBook
        </Link>{' '}|{' '}
        <Link style={{ margin: "1rem 0" }} to="/issue-book">
          IssueBook
        </Link>
        <Outlet />
      </main>
      <label>SEARCH BOOK:</label>
      <input type='text' name='searchBar' placeholder='enter name of book...' onChange={handleSearchBook}></input>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name of book </th>
            <th>Name of the Author</th>
            <th>Subtitle</th>
            <th>Publishing</th>
            <th>Price</th>
            <th>Publisher</th>
            <th>Books remaning</th>
            <th>Remove</th>
          </tr>
        </thead>
        
        <tbody>
          {!!pageData.length && pageData.map((paginationData) => (
            <tr key={paginationData.id}>
              <td>{paginationData.id}</td>
              <td>{paginationData.nameOfBook} </td>
              <td>{paginationData.nameOfAuthor}</td>
              <td>{paginationData.subtitle}</td>
              <td>{paginationData.publishing}</td>
              <td>{paginationData.price}</td>
              <td>{paginationData.publisher}</td>
              <td>{paginationData.numberOfBooks}</td>
              <td><button onClick={()=>handleDelete(paginationData.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
       
        
      </table>
      <br />
    <button onClick={()=>clickPrev()}>prev</button>
    {page} of 10
    <button  onClick={()=>clickNext()}>next</button>
      
      
    </div>
  );
}

export default BookLibrary;
