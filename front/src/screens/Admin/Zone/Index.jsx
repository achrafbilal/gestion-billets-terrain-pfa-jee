import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { Col, Container, Row } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function createData(id, email, fullname, role) {
  return { id, email, fullname, role };
}

const rows = [
  createData(1, "email1@mail.com", "Achraf bilal", "Manager"),
  createData(2, "email1@mail.com", "Achraf bilal", "Seller"),
  createData(3, "email1@mail.com", "Achraf bilal", "Client"),
];

export default function IndexZone() {
  return (
    <TableContainer component={Paper}>
      <Container>
        <Row>
          <Col>
            <IconButton color="success" aria-label="add" component="span">
              <AddIcon />
            </IconButton>
          </Col>
        </Row>
      </Container>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Fullname</TableCell>
            <TableCell>Role</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.email}
              </TableCell>
              <TableCell scope="row">{row.fullname}</TableCell>
              <TableCell scope="row">{row.role}</TableCell>
              <TableCell align="right">
                <Container>
                  <IconButton
                    color="warning"
                    aria-label="edit"
                    component="span"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
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
