import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { Container } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import { getTickets, deleteTicket } from "../../../services/TicketService";
import PrintIcon from "@mui/icons-material/Print";

export default function IndexTicket() {
  const [tickets, setTickets] = useState([]);
  const getData = async () => {
    const data = await getTickets();
    setTickets(data);
  };
  useEffect(() => {
    getData();
  }, []);
  const deleteButtonHandler = async (id) => {
    if (window.confirm("Confirm deleting ticket ")) {
      await deleteTicket(id);
      await getData();
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Zone Name</TableCell>
            <TableCell align="center">Purchase Date</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.map((t) => (
            <TableRow
              key={t.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{t.id}</TableCell>
              <TableCell align="center">{t.zoneName}</TableCell>
              <TableCell align="center">
                {new Date(t.purchaseDate).toLocaleString()}
              </TableCell>
              <TableCell align="right">
                <Container>
                  <IconButton
                    onClick={() => deleteButtonHandler(t.id)}
                    color="error"
                    aria-label="delete"
                    component="span"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Container>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
