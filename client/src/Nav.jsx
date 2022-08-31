import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Navi from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Nav = (props) => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  const logoutHandler = (e) => {
    axios.get("http://localhost:5000/logout").then((response) => {
      alert("Successfully Logged Out!");
      navigate("/login");
      window.location.reload();
    });
  };

  return (
    <>
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">Rec1p3!</Navbar.Brand>
            <Navi className="me-auto">
              <Navi.Link href="/homepage">Home</Navi.Link>
              {!props.isLoggedIn && <Navi.Link href="/login">Login</Navi.Link>}
              {!props.isLoggedIn && (
                <Navi.Link href="/signup">Signup</Navi.Link>
              )}
              {props.isLoggedIn && (
                <Button variant="dark" onClick={() => logoutHandler()}>
                  Logout
                </Button>
              )}
            </Navi>
          </Container>
        </Navbar>
        <br />
      </div>
    </>
  );
};

export default Nav;
