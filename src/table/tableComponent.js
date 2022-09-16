import React from "react";
import { Table, TableBody, TableHead, TableRow, TableCell, Button, TableContainer, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Barcode from "react-barcode";

function TableComponent(props) {

    return (

        <TableContainer component={Paper}>
            {!!props.data && !!props.data.length &&
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead >
                        <TableRow sx={{ fontSize: 18, bgcolor: 'text.disabled', color: 'background.paper' }}>
                            {!!props.HEADING && props.HEADING.map((d) => (
                                <TableCell sx={{ fontSize: 18, bgcolor: 'text.disabled', color: 'background.paper' }}>{d}</TableCell>
                            ))}
                            <TableCell sx={{ fontSize: 18, bgcolor: 'text.disabled', color: 'background.paper' }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.data.map((array, index) => (
                            <TableRow key={index}>
                                {props.HEADING.map((h) => (

                                    <TableCell>{array[h]}</TableCell>
                                ))}
                                {props.tableID === 'student' &&
                                    <TableCell>
                                        <Barcode value={array.barCode} renderer={"img"} height={30} width={1} fontSize={12}/>
                                    </TableCell>}
                                <TableCell>
                                    {props.tableID === 'book' ?
                                        <Button onClick={() => props.handleClickOpen(array.id)}
                                            variant="contained">Delete
                                            <DeleteIcon />
                                        </Button> : props.tableID === 'issueBook' ?
                                            <Button onClick={() => props.handelReturnBook(
                                                array.barCode,
                                                array.nameOfBook,
                                                array.issuedBookQuantity)}
                                                variant="contained">Return
                                            </Button> : []}
                                </TableCell>
                            </TableRow>

                        ))}

                    </TableBody>
                </Table>}
        </TableContainer>
    )
}
export default TableComponent