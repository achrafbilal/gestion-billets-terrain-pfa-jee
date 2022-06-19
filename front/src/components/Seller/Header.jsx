import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const HeaderSeller = () => {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        zIndex: 1000,
      }}
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Stade Mohamed V</Navbar.Brand>
        </LinkContainer>
        <Nav className="me-auto">
          <LinkContainer to="/">
            <Nav.Link>Seats</Nav.Link>
          </LinkContainer>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default HeaderSeller;
