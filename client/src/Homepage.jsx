import React from "react";
import Recipes from "./Recipes";
import Button from "react-bootstrap/Button";

const Homepage = (props) => {

  return (
    <>
      <div>
        {props.isLoggedIn ? `Welcome, ${props.currentUser}!` : "Welcome guest"}
        <h1>Welcome to Homepage</h1>
      </div>
      <div>
        <Recipes />
      </div>
    </>
  );
};

export default Homepage;
