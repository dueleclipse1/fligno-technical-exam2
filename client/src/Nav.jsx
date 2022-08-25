import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navi from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/button";
import axios from "axios";

const Nav = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const styles = {
    logout: {
      textAlign: "right",
    },
  };

  const logoutHandler = () => {
    axios
      .post("http://localhost:5000/logout", { username: props.currentUser })
      .then((response) => {
        if (response.data.message) {
          setLoggedIn(false);
        } else {
          console.log("error");
        }
      });
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Rec1p3!</Navbar.Brand>
          <Navi className="me-auto">
            <Navi.Link href="/homepage">Home</Navi.Link>
            {!props.isLoggedIn && <Navi.Link href="/login">Login</Navi.Link>}
            {!props.isLoggedIn && <Navi.Link href="/signup">Signup</Navi.Link>}
            {props.isLoggedIn && <Button variant="dark">Logout</Button>}
          </Navi>
        </Container>
      </Navbar>
      <br />
    </>
  );
};

export default Nav;
