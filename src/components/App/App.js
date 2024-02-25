import React, { useState, Fragment } from "react";
import { Route, Routes } from "react-router-dom";

// import AuthenticatedRoute from "../AuthenticatedRoute/AuthenticatedRoute";
import AutoDismissAlert from "../AutoDismissAlert/AutoDismissAlert";
import Header from "../Header/Header";
import SignUp from "../SignUp/SignUp";
import SignIn from "../SignIn/SignIn";
import SignOut from "../SignOut/SignOut";
import ChangePassword from "../ChangePassword/ChangePassword";

function App() {
  const [user, setUser] = useState(null);
  const [msgAlerts, setMsgAlerts] = useState([]);

  const clearUser = () => setUser(null);

  const msgAlert = ({ heading, message, variant }) => {
    setMsgAlerts([...msgAlerts, { heading, message, variant }]);
  };

  return (
    <Fragment>
      <Header user={user} />
      {msgAlerts.map((msgAlert, index) => (
        <AutoDismissAlert
          key={index}
          heading={msgAlert.heading}
          variant={msgAlert.variant}
          message={msgAlert.message}
        />
      ))}
      <main className="container">
        <Routes>
          <Route
            path="/sign-up"
            element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
          />
          <Route
            path="/sign-in"
            element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
          />
          <Route
            path="/sign-out"
            element={
              <SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
            }
          />
          <Route
            path="/change-password"
            element={<ChangePassword msgAlert={msgAlert} user={null} />}
          />
        </Routes>
      </main>
    </Fragment>
  );
}

export default App;
