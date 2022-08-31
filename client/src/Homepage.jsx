import React from "react";
import Recipes from "./Recipes";
import Alerts from "./Alerts";

const Homepage = (props) => {
  return (
    <>
      <div className="container justify-content-center">
        {/* <h1>Welcome, {props.currentUser}!</h1> */}
        {props.isLoggedIn ? <Alerts user={props.currentUser}/> : 'not logged in'}
      </div>
      <div>
        <Recipes />
      </div>
    </>
  );
};

export default Homepage;
