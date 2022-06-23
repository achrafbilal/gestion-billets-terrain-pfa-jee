import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import LogoutIcon from "@mui/icons-material/Logout";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const HeaderClient = ({ auth, logout }) => {
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
        <Typography mt={2}>{auth.name}</Typography>
        <Button onClick={logout}>
          <LogoutIcon sx={{ color: "#fff", fontSize: 30 }} />
        </Button>
      </Container>
    </Navbar>
  );
};

export default HeaderClient;
