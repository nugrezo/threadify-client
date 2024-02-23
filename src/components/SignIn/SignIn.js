import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import "./SignIn.css";

import { signIn } from "../../api/auth";
import messages from "../AutoDismissAlert/messages";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (event) =>
    this.setState({
      [event.target.name]: event.target.value,
    });

  onSignIn = (event) => {
    event.preventDefault();

    const { msgAlert, history, setUser } = this.props;

    signIn(this.state)
      .then((res) => setUser(res.data.user))
      .then(() =>
        msgAlert({
          heading: "Sign In Success",
          message: messages.signInSuccess,
          variant: "success",
        })
      )
      .then(() => history.push("/"))
      .catch((error) => {
        this.setState({ email: "", password: "" });
        msgAlert({
          heading: "Sign In Failed with error: " + error.message,
          message: messages.signInFailure,
          variant: "danger",
        });
      });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className="row">
        <div className="sign-in-form col-sm-10 col-md-8 mx-auto mt-5">
          <h3 className="sign-in--title">Sign In to your Account</h3>
          <Form className="sign-in--form" onSubmit={this.onSignIn}>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                value={email}
                placeholder="Enter email"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                name="password"
                value={password}
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button className="sign-in--btn" variant="primary" type="submit">
              Sign In
            </Button>
            <div className="navigate-sign-in">
              <p className="have-account">Have an account?</p>
              <Nav.Link className="navigate--sign-in" href="#sign-up">
                Sign Up
              </Nav.Link>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(SignIn);
