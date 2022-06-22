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
import {
  getZones,
  addZone,
  editZone,
  deleteZone,
} from "../../../services/ZoneService";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 600,
  bgcolor: "background.paper",
  borderRadius: 10,
  p: 4,
};
export default function IndexZone() {
  const [zones, setZones] = useState([]);
  const [mode, setMode] = useState(null);
  const [zone, setZone] = useState(null);
  const getData = async () => {
    const data = await getZones();
    setZones(data);
  };
  useEffect(() => {
    getData();
  }, []);
  const editButtonHandler = (zoneId) => {
    let zo = zones.find((z) => z.id === Number(zoneId));

    setZone(zo);
    setMode("edit");
  };
  const createButtonHandler = () => {
    setZone({
      name: "",
      maxSeat: 0,
    });
    setMode("create");
  };
  const closeModal = () => {
    setMode(null);
    setZone(null);
  };
  const saveZone = () => {
    const fetchPost = async (z) => {
      const { data } = await addZone(z);
      getData();
      return data;
    };
    const fetchPut = async (z, id) => {
      const { data } = await editZone(id, z);
      getData();
      return data;
    };
    if (mode === "edit") fetchPut(zone, zone.id);
    else if (mode === "create") fetchPost(zone);

    closeModal();
  };
  const nameChangeHandler = (ev) => {
    setZone({ ...zone, name: ev.target.value });
  };
  const maxSeatChangeHandler = (ev) => {
    setZone({ ...zone, maxSeat: Number(ev.target.value) });
  };
  const deleteHandler = (id) => {
    const fetchDelete = async () => {
      const { data } = deleteZone(id)
        .then((d) => getData())
        .catch((err) => {
          alert("Zone not deleted");
        });

      return data;
    };
    fetchDelete();
  };
  return (
    <TableContainer component={Paper}>
      <Container>
        <Row>
          <Col>
            <IconButton
              color="success"
              aria-label="add"
              component="span"
              onClick={createButtonHandler}
            >
              <AddIcon />
            </IconButton>
          </Col>
        </Row>
      </Container>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>ZoneName</TableCell>
            <TableCell>Max seats</TableCell>
            <TableCell>Seats left</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {zones.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell scope="row">{row.name}</TableCell>
              <TableCell scope="row">{row.maxSeat}</TableCell>
              <TableCell scope="row">{row.seatsLeft}</TableCell>
              <TableCell align="right">
                <Container>
                  <IconButton
                    color="warning"
                    aria-label="edit"
                    component="span"
                    onClick={() => editButtonHandler(row.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    aria-label="delete"
                    component="span"
                    onClick={() => deleteHandler(row.id)}
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
        open={mode !== null}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          style={{ boxShadow: "4px 12px 29px 8px rgba(0,0,0,0.74)" }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {/* Change {user !== null && user.fullName} role */}
          </Typography>

          {zone !== null ? (
            <>
              <div className="form-group m-3">
                <label htmlFor="zoneName" className=" mt-3 mb-2">
                  Zone name
                </label>
                <input
                  onChange={nameChangeHandler}
                  pattern="[a-zA-Z0-9 ]"
                  value={zone.name}
                  type="text"
                  className="form-control  mt-1 mb-2"
                  id="zoneName"
                  aria-describedby="zoneNameHelp"
                  placeholder="Enter zone name"
                />
              </div>
              <div className="form-group m-3">
                <label htmlFor="zoneName" className=" mt-3 mb-2">
                  Max seats
                </label>
                <input
                  onChange={maxSeatChangeHandler}
                  value={zone.maxSeat}
                  type="number"
                  className="form-control  mt-1 mb-2"
                  id="maxSeat"
                  aria-describedby="maxSeatsHelp"
                  placeholder="Enter number of max seats"
                  min={zone.seatsLeft < zone.maxSeat ? zone.seatsLeft + 1 : 0}
                  max={100000}
                />
              </div>
              <button className="btn btn-primary m-3" onClick={saveZone}>
                Save
              </button>
            </>
          ) : (
            <></>
          )}
        </Box>
      </Modal>
    </TableContainer>
  );
}
