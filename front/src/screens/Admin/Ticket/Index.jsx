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
    console.log(data);
    setTickets(data);
  };
  useEffect(() => {
    getData();
  }, []);
  const deleteButtonHandler = async (id) => {
    await deleteTicket(id);
    await getData();
  };
  const printButtonHandler = (ticket) => {
    return 1;
    var html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
      crossorigin="anonymous"
    />
    <title>Document</title>
  </head>
  <body class="border">
    <div class="row p-5">
      <div class="col-4">Stadium Mohamed 5</div>
      <div class="col-4">Client email : ${ticket.userEmail}</div>
      <div class="col-4">Zone Name : ${ticket.zoneName}</div>
    </div>
    
  </body>
</html>
`;
    var win = window.open("about:blank", "_blank");
    win.document.write(html);
    win.print();
    //win.close();
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
                    onClick={() => printButtonHandler(t)}
                    color="warning"
                    aria-label="edit"
                    component="span"
                  >
                    <PrintIcon />
                  </IconButton>
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
