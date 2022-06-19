import React, { useState, useEffect } from "react";
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
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function createData(id, email, fullname, role) {
  return { id, email, fullname, role };
}

const users = [
  createData(1, "email1@mail.com", "Achraf bilal", "Manager"),
  createData(2, "email1@mail.com", "Achraf bilal", "Seller"),
  createData(3, "email1@mail.com", "Achraf bilal", "Client"),
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function IndexUser() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(-1);
  const handleClose = (mode) => {
    setOpen(mode);
  };
  const editButtonHandler = (user) => {
    setUser(user);
    handleClose(true);
  };
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
          {users.map((u) => (
            <TableRow
              key={u.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {u.email}
              </TableCell>
              <TableCell scope="row">{u.fullname}</TableCell>
              <TableCell scope="row">{u.role}</TableCell>
              <TableCell align="right">
                <Container>
                  <IconButton
                    color="warning"
                    aria-label="edit"
                    component="span"
                    onClick={() => editButtonHandler(u)}
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
      <Modal
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Change {user !== null && user.email} role
          </Typography>
          <div className="row mt-5">
            <div className="col-12">
              <select name="" className="form-control form-select" id="">
                <option value={-1}>Roles</option>
                <option value={1}>Admin</option>
                <option value={2}>Seller</option>
                <option value={3}>Client</option>
              </select>
            </div>
            <div className="row mt-5">
              <div className="col-6"></div>
              <div className="col-4">
                <button
                  className="btn btn-success"
                  disabled={user === null || role < 1}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
        </Box>
      </Modal>
    </TableContainer>
  );
}
