import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getClientTickets } from "../../services/TicketService";
import IconButton from "@mui/material/IconButton";
import PrintIcon from "@mui/icons-material/Print";

export default function Home({ auth }) {
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await getClientTickets(Number(auth.id));
      setTickets(data);
    };
    getData();
  }, []);
  const printButtonHandler = (ticket) => {
    console.log(ticket);
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
  <body
    class="border d-flex justify-content-center align-items-center text-dark"
  >
    <div
      class="row p-5 d-flex w-100"
      style="background-image: linear-gradient(to right, #6C6464, #CAC1C1)"
    >
      <div
        class="col-4 border justify-content-center align-items-center text-center d-flex"
      >
        Stadium Mohamed 5
      </div>
      <div class="col-8">
        <div class="row border justify-content-center" style="height: 90px">
          <div
            class="col-10 mx-1 justify-content-center align-items-center text-center d-flex"
          >
            Client email : ${ticket.userEmail}
          </div>
        </div>
        <div class="row border justify-content-center" style="height: 90px">
          <div
            class="col-10 mx-1 justify-content-center align-items-center text-center d-flex"
          >
            Zone Name : ${ticket.zoneName}
          </div>
        </div>
      </div>
    </div>

    <script>
      window.print();
    </script>
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
            <TableCell align="center">
              <h4>Ticket ID</h4>
            </TableCell>
            <TableCell align="center">
              <h4>Zone</h4>
            </TableCell>
            <TableCell align="center">
              <h4>Purchase Date</h4>
            </TableCell>
            <TableCell align="right">
              <h4>Actions</h4>
            </TableCell>
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
                <IconButton
                  onClick={() => printButtonHandler(t)}
                  color="warning"
                  aria-label="edit"
                  component="span"
                >
                  <PrintIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
