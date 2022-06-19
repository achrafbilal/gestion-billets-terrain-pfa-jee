import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getClientTickets } from "../../services/TicketService";

function createData(id, zoneName, purchaseDate) {
  return { id, zoneName, purchaseDate };
}

const rows = [
  createData(1, "email1@mail.com", new Date()),
  createData(2, "email1@mail.com", new Date()),
  createData(3, "email1@mail.com", new Date()),
];

export default function Home({ auth }) {
  const [tickets, setTickets] = useState([...rows]);
  useEffect(() => {
    console.log(auth.id);
    const getData = async () => {
      const data = await getClientTickets(Number(auth.id));
      console.log(data);
      setTickets(data);
    };
    getData();
  }, []);
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
