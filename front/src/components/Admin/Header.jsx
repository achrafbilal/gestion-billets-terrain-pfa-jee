import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const HeaderAdmin = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Stade Mohamed V</Navbar.Brand>
        </LinkContainer>
        <Nav className="me-auto">
          <LinkContainer to="/">
            <Nav.Link>Users</Nav.Link>
          </LinkContainer>
          <LinkContainer to="zones">
            <Nav.Link>Zones</Nav.Link>
          </LinkContainer>
          <LinkContainer to="seats">
            <Nav.Link>Seats</Nav.Link>
          </LinkContainer>
          <LinkContainer to="tickets">
            <Nav.Link>Tickets</Nav.Link>
          </LinkContainer>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default HeaderAdmin;
