import React from "react";
import "./Navbar.css";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
const TopNavBar = () => {
  const navigate = useNavigate();
  const logOut = () => {
    navigate("/");
  };
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand
            href=""
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3787/3787917.png"
              alt=""
              width={30}
            />
            My POS
          </Navbar.Brand>
          <Nav className="me-auto navWrap">
            <Link to="/create-product" className="nav-link">
              Create
            </Link>
            <Link to="/product-orders" className="nav-link">
              Sale
            </Link>
            <Link to="/product-lists" className="nav-link">
              Listing
            </Link>
          </Nav>
          <Navbar.Brand>
            <Button onClick={logOut}>Logout</Button>
          </Navbar.Brand>
        </Container>
      </Navbar>
      {/* <div style={{ padding: 20 }}>{props.children}</div> */}
    </>
  );
};

export default TopNavBar;
