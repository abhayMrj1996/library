import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
  TableContainer,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Barcode from "react-barcode";

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
                  console.log(table_data.barCode)
                  return <TableCell key={otherRowData.key}>{otherRowData.render(table_data)}</TableCell>
                })}
                
                {/* {props.tableID === "student" && (
                  <>
                    <TableCell>
                      <Barcode
                        value={table_data.barCode}
                        renderer={"img"}
                        height={30}
                        width={1}
                        fontSize={12}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() =>
                          props.handleClickOpen(
                            table_data.totalbooknameIssuedTo,
                            table_data.barCode,
                            table_data.first_name,
                            table_data.last_name
                          )
                        }
                      >
                        {" "}
                        Return book
                      </Button>
                    </TableCell>
                  </>
                )} */}

                {/* {props.tableID === "book" ? (
                  <>
                    <TableCell>
                      <Barcode
                        value={table_data.barCode}
                        renderer={"img"}
                        height={30}
                        width={1}
                        fontSize={12}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => props.handleClickOpen(table_data.id)}
                        variant="contained"
                      >
                        Delete
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </>
                ) : (
                  []
                )}*/}
              </TableRow> 
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
    // {props.BUTTON.map((data)=><TableCell>{data.formatFunction()}</TableCell>)}
  );
}
export default TableComponent;
