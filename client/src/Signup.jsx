import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const submitButtonStyle = {
    marginTop: "10px",
  };

  const saveHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/register", {
        username: e.target.username.value,
        password: e.target.password.value,
      })
      .then((response) => {
        console.log(response);
      });
    e.target.username.value = "";
    e.target.password.value = "";
    navigate('/login')
  };

  return (
    <>
      <h1>Sign up page!</h1>
      <div className="container">
        <Form onSubmit={saveHandler}>
          <FloatingLabel
            controlId="floatingInput"
            label="Username"
            className="mb-3"
          >
            <Form.Control
              name="username"
              type="text"
              placeholder="pedropenduko"
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
            />
          </FloatingLabel>

          <Button variant="primary" type="submit" style={submitButtonStyle}>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Signup;
