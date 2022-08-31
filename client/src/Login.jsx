import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const loginHandler = (e) => {
    axios
      .post("http://localhost:5000/login", {
        username: e.target.username.value,
        password: e.target.password.value,
      })
      .then((response) => {
        if (response.data.message) {
          setLoginStatus(response.data.message);
        } else {
          setLoginStatus(response.data[0].username);
        }
      });
    e.target.username.value = "";
    e.target.password.value = "";
    window.location.reload();
    navigate("/homepage");
  };

  useEffect(() => {
    axios.get("http://localhost:5000/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user[0].username);
      }
    });
  }, []);

  const styles = {
    submitButtonStyle: {
      marginTop: "10px",
    },
    errorMessage: {
      textAlign: "center"
    } 
  };

  return (
    <>
      <h1>Login page!</h1>
      <div className="container">
        <Form onSubmit={loginHandler}>
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
          <Button variant="primary" type="submit" style={styles.submitButtonStyle}>
            Submit
          </Button>
        </Form>
      </div>
      <div style={styles.errorMessage}>{loginStatus}</div>
    </>
  );
};

export default Login;
