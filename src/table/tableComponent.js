import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,  
  TableContainer,
  Paper,
} from "@mui/material";

function TableComponent(props) {
  return (
    <TableContainer component={Paper}>
      {!!props.data && !!props.data.length && (
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow
              sx={{
                fontSize: 18,
                bgcolor: "text.disabled",
                color: "background.paper",
              }}
            >
              {!!props.HEADING &&
                props.HEADING.map((D) => (
                  <TableCell
                    sx={{
                      fontSize: 18,
                      bgcolor: "text.disabled",
                      color: "background.paper",
                    }}key={D.key}
                  >
                    {D.label}
                  </TableCell>
                ))}
              <TableCell
                sx={{
                  fontSize: 18,
                  bgcolor: "text.disabled",
                  color: "background.paper",
                }}
              ></TableCell>
              <TableCell
                sx={{
                  fontSize: 18,
                  bgcolor: "text.disabled",
                  color: "background.paper",
                }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((table_data, index) => (
              <TableRow key={index}>
                {props.HEADING.map((rowData) => {
                  return (
                    <TableCell key={rowData.key}>
                      {rowData.formatFunction(table_data[rowData.label])}
                    </TableCell>
                  );
                })}

                {props.otherData.map((otherRowData)=>{                  
                  return <TableCell key={otherRowData.key}>{otherRowData.render(table_data)}</TableCell>
                })}
                              
              </TableRow> 
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>    
  );
}
export default TableComponent;
