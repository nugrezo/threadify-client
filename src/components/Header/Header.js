import React, { Fragment } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Header.css";

const authenticatedOptions = (
  <Fragment>
    {/* <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link> */}
  </Fragment>
);

const unauthenticatedOptions = (
  <Fragment>
    {/* <Nav.Link href="#sign-up">Sign Up</Nav.Link> */}
    <Nav.Link className="sign-up" href="#sign-up">
      {" "}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="login-icon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
        />
      </svg>
    </Nav.Link>
  </Fragment>
);

const alwaysOptions = (
  <Fragment>{/* <Nav.Link to="/">Home</Nav.Link> */}</Fragment>
);

const Header = ({ user }) => (
  <Navbar className="navbar" bg="primary" variant="dark" expand="md">
    <Navbar.Brand className="brand" href="#">
      Threadify
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse className="collapse" id="basic-navbar-nav">
      <Nav className="ml-auto">
        {user && (
          <span className="navbar-text mr-2">Welcome, {user.email}</span>
        )}
        {alwaysOptions}
        {user ? authenticatedOptions : unauthenticatedOptions}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;
