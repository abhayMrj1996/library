import React, { useState } from "react";
import { useSelector, } from "react-redux";

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
    console.log("1",reqStudent)
    setTotalStuentData(reqStudent); }
    
    else{
    const reqStudent = displayStudentData.filter((data) =>
     data.first_name.toLowerCase().includes(splitName[0].toLowerCase()) 
     &&
     data.last_name.toLowerCase().includes(splitName[1].toLowerCase()));
    console.log("2",reqStudent);
    setTotalStuentData(reqStudent);
  }
    
  }
  console.log("total",totalStudentData);
  

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

  return (
    <div>
      <main style={{ padding: "1rem 0" }}>
        <h2>STUDENT LIST</h2>
      </main>
      <label>search</label>
      <input onChange={handleSearchStudent}></input>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name </th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>ISSUED BOOK</th>
            <th>QUANTITY OF TOTAL BOOK</th>
          </tr>
        </thead>
        <tbody>
          {pageData.map((paginationData) => (
            <tr key={paginationData.id}>
              <td>{paginationData.id}</td>
              <td>{paginationData.first_name} </td>
              <td>{paginationData.last_name}</td>
              <td>{paginationData.email}</td>
              <td>{paginationData.gender}</td>
              <td>{paginationData.totalBookIssuedTo}</td>
              <td>{paginationData.totalbooknameIssuedTo}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <button onClick={() => clickPrev()}>prev</button>
      {page} of 10
      <button onClick={() => clickNext()}>next</button>
      <br />
      <br />
      

    </div>
  );
}

export default StudentLibrary;
