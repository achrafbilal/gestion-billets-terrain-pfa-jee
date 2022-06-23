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

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
export default function IndexTicket() {
  const [tickets, setTickets] = useState([]);
  const [deletedModal, setDeletedModal] = useState({
    mode: false,
    type: false,
    title: "title",
    message: "message",
  });
  const getData = async () => {
    const data = await getTickets();
    setTickets(data);
  };
  useEffect(() => {
    getData();
  }, []);
  const deleteButtonHandler = async (id) => {
    if (window.confirm("Confirm deleting ticket ")) {
      await deleteTicket(id)
        .then(() =>
          handleOpenDeletedModal(
            true,
            true,
            "Success",
            "Ticket deleted successfully"
          )
        )
        .catch(() =>
          handleOpenDeletedModal(true, false, "Fail", "Could not delete ticket")
        );
      await getData();
    }
  };
  const handleOpenDeletedModal = (mode, type, title, message) => {
    setDeletedModal({
      mode: mode,
      type: type,
      title: title,
      message: message,
    });
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
      <Modal
        open={deletedModal.mode}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="row">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {deletedModal.title}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {deletedModal.message}
            </Typography>
          </div>
          <div className="row">
            <div className="col-9"></div>
            <button
              className="btn btn-info my-3 col-3"
              onClick={() => handleOpenDeletedModal(false, false, "", "")}
            >
              OK
            </button>
          </div>
        </Box>
      </Modal>
    </TableContainer>
  );
}
