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
import {
  getUsers,
  changeUserRole,
  deleteUser,
} from "../../../services/UserService";

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
export default function IndexUser({ auth }) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(-1);
  const [users, setUsers] = useState([]);
  const getData = async () => {
    const data = await getUsers();

    setUsers(data);
  };
  useEffect(() => {
    getData();
  }, []);
  const handleClose = (mode) => {
    setOpen(mode);
  };
  const editButtonHandler = (user) => {
    setUser(user);
    handleClose(true);
  };
  const getRole = (role) => {
    switch (role) {
      case 1:
        return "Administrator";

      case 2:
        return "Seller";
      case 3:
        return "client";
      default:
        return "Client";
    }
  };
  const getWeight = (roleId) => {
    switch (roleId) {
      case 1:
        return { fontWeight: 900 };
      case 2:
        return { fontWeight: 700 };
      default:
        return { fontWeight: 500 };
    }
  };
  const saveButtonClickHandler = (roleId, userId) => {
    const fetch = async () => {
      await changeUserRole(userId, roleId);
      await getData();
      setOpen(false);
    };
    fetch();
  };
  const deleteButtonClickHandler = (userId) => {
    const fetch = async () => {
      if (window.confirm("Confirm deleting ticket ")) {
        await deleteUser(userId);
        await getData();
      }
    };
    fetch();
  };
  return (
    <TableContainer component={Paper}>
      <Container>
        {/* <Row>
          <Col>
            <IconButton color="success" aria-label="add" component="span">
              <AddIcon />
            </IconButton>
          </Col>
        </Row> */}
      </Container>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
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
              <TableCell scope="row">
                <span style={getWeight(Number(u.roleId))}>{u.id}</span>
              </TableCell>
              <TableCell scope="row">
                <span style={getWeight(Number(u.roleId))}>{u.email}</span>
              </TableCell>
              <TableCell scope="row">
                <span style={getWeight(Number(u.roleId))}>{u.fullName}</span>
              </TableCell>
              <TableCell scope="row">
                <span style={getWeight(Number(u.roleId))}>
                  {getRole(Number(u.roleId))}
                </span>
              </TableCell>
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
                    onClick={() => deleteButtonClickHandler(u.id)}
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
            Change {user !== null && user.fullName} role
          </Typography>
          <div className="row mt-5">
            <div className="col-12">
              <select
                name=""
                className="form-control form-select"
                onChange={(ev) => {
                  console.log(ev.target.value);
                  setRole(Number(ev.target.value));
                }}
              >
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
                  onClick={() => saveButtonClickHandler(role, user.id)}
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
