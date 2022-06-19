import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const HeaderClient = () => {
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
          <Navbar.Brand>Stadium Mohamed V</Navbar.Brand>
        </LinkContainer>
        <Nav className="me-auto">
          <LinkContainer to="">
            <Nav.Link>My tickets</Nav.Link>
          </LinkContainer>
        </Nav>

        <LinkContainer to="profile" className="mx-4 profile-icon">
          <AccountCircleIcon sx={{ color: "#fff", fontSize: 30 }} />
        </LinkContainer>
      </Container>
    </Navbar>
  );
};

export default HeaderClient;
