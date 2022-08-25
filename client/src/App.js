import React, { useEffect, useState } from "react";
import Login from "./Login";
import Homepage from "./Homepage";
import Signup from "./Signup";
import ProtectedRoutes from "./ProtectedRoutes";
import Nav from "./Nav";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [loginStatus, setLoginStatus] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:5000/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user[0].username);
        setLoggedIn(true);
      }
    });
  }, []);

  return (
    <>
      <div>
        <Router>
          <Nav isLoggedIn={loggedIn} currentUser={loginStatus}/>
          <div className="App">
            <Routes>
              <Route
                element={
                  <ProtectedRoutes
                    isLoggedIn={loggedIn}
                    currentUser={loginStatus}
                  />
                }
              >
                <Route path="/" exact element={<Homepage />}></Route>
                <Route
                  path="/homepage"
                  exact
                  element={
                    <Homepage isLoggedIn={loggedIn} currentUser={loginStatus} />
                  }
                ></Route>
              </Route>
              <Route
                element={
                  <ProtectedRoutes
                    isLoggedIn={loggedIn}
                    currentUser={loginStatus}
                  />
                }
              >
                <Route path="/login" exact element={<Login />}></Route>
                <Route path="/signup" exact element={<Signup />}></Route>
              </Route>
            </Routes>
          </div>
        </Router>
      </div>
    </>
  );
}

export default App;
