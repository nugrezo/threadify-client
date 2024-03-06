import React, { useState, Fragment } from "react";
import { Route, Routes } from "react-router-dom";

// import AuthenticatedRoute from "../AuthenticatedRoute/AuthenticatedRoute";
import AutoDismissAlert from "../AutoDismissAlert/AutoDismissAlert";
import Header from "../Header/Header";
import ChangePassword from "../ChangePassword/ChangePassword";
import SignUp from "../AuthComponents/SignUp/SignUp";
import SignOut from "../AuthComponents/SignOut/SignOut";
import SignIn from "../AuthComponents/SignIn/SignIn";
import CreateThread from "../ThreadComponents/CreateThread/CreateThread";
import IndexThreads from "../ThreadComponents/IndexThreads/IndexThreads";
import Icon from "../ThreadComponents/Icon/Icon";

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
          {user && (
            <Route
              path="/sign-out"
              element={
                <SignOut
                  msgAlert={msgAlert}
                  clearUser={clearUser}
                  user={user}
                />
              }
            />
          )}
          {user && (
            <Route
              path="/change-password"
              element={<ChangePassword msgAlert={msgAlert} user={null} />}
            />
          )}
          <Route path="/home" element={<Icon />} />
          <Route
            path="/threads"
            element={<IndexThreads msgAlert={msgAlert} user={user} />}
          />
          <Route
            path="/post"
            element={<CreateThread msgAlert={msgAlert} user={user} />}
          />
        </Routes>
      </main>
    </Fragment>
  );
}

export default App;