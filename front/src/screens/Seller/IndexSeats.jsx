import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import { addTicket, getSeatsLeft } from "../../services/TicketService";
import { getZones } from "../../services/ZoneService";
import { getClients } from "../../services/UserService";

const IndexSeats = () => {
  const [seatsLeft, setSeatsLeft] = useState(0);
  const [zone, setZone] = useState(null);
  const [zones, setZones] = useState([]);
  const [client, setClient] = useState(null);
  const [clients, setClients] = useState([]);
  const [clientsView, setClientsView] = useState(clients);
  const [zonesView, setZonesView] = useState(zones);

  useEffect(() => {
    const getData = async () => {
      const clientsD = await getClients();
      setClients(clientsD);
      setClientsView(clientsD);
      const zonesD = await getZones();
      setZones(zonesD);
      setZonesView(zonesD);
    };
    getData();
  }, []);
  const zoneInputHandler = (ev) => {
    setZone(null);
    setZonesView(zones.filter((z) => z.name.includes(ev.target.value)));
  };
  const zoneChangeHandler = (ev) => {
    if (Number(ev.target.value) < 1) {
      setZone(null);
      return;
    }
    let zo = zones.find((z) => z.id === Number(ev.target.value));

    setZone(zo);
    const getData = async () => {
      const seatsLeftD = await getSeatsLeft(zo.id);
      setSeatsLeft(seatsLeftD);
    };
    getData();
  };
  const clientInputHandler = (ev) => {
    setClient(null);
    setClientsView(clients.filter((z) => z.email.includes(ev.target.value)));
  };
  const clientChangeHandler = (ev) => {
    if (Number(ev.target.value) < 1) {
      setClient(null);
      return;
    }
    let zo = clients.find((z) => z.id === Number(ev.target.value));
    setClient(zo);
  };
  const orderButtonClickHandler = () => {
    const sendData = async () => {
      await addTicket({
        userId: client.id,
        zoneId: zone.id,
      });
      setSeatsLeft(seatsLeft - 1);
    };
    sendData();
  };
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col sm={5} className="my-4">
          <div className="row">
            <div className="col-10">
              <div className="row">
                <div className="col-12 text-center">
                  <h4>Zone</h4>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control w-100"
                    onInput={zoneInputHandler}
                  />
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-12 ">
                  <select
                    onChange={zoneChangeHandler}
                    class="form-select form-select-lg mb-3 w-100"
                    aria-label=".form-select-lg example"
                  >
                    <option value={-1}>Zones</option>
                    {zonesView.map((z) => (
                      <option value={z.id}>{z.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-12 text-center">
                  <h4>Client</h4>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control w-100"
                    onInput={clientInputHandler}
                  />
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-12 ">
                  <select
                    onChange={clientChangeHandler}
                    class="form-select form-select-lg mb-3 w-100"
                    aria-label=".form-select-lg example"
                  >
                    <option value={-1}>Clients</option>
                    {clientsView.map((z) => (
                      <option value={z.id}>{z.email}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col sm={5} className="justify-content-md-center my-4 ">
          <div className="card">
            <EventSeatIcon sx={{ fontSize: 450 }} className="mx-auto" />
          </div>
          <div className="card p-2">
            <div className="row my-4">
              <div className="col-3"></div>
              <div className="col-5 text-center">
                <span className="text-center w-100">
                  {seatsLeft} seat
                  {seatsLeft > 1 ? "s" : ""} left
                </span>
              </div>
              <div className="col-4">
                <button
                  onClick={orderButtonClickHandler}
                  className="btn btn-primary w-100 mx-auto "
                  disabled={zone === null || client === null}
                >
                  Order seat
                </button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default IndexSeats;
