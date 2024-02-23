import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import { withRouter } from "react-router-dom";
import "./SignUp.css";

import { signUp, signIn } from "../../api/auth";
import messages from "../AutoDismissAlert/messages";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      passwordConfirmation: "",
    };
  }

  handleChange = (event) =>
    this.setState({
      [event.target.name]: event.target.value,
    });

  onSignUp = (event) => {
    event.preventDefault();

    const { msgAlert, history, setUser } = this.props;

    signUp(this.state)
      .then(() => signIn(this.state))
      .then((res) => setUser(res.data.user))
      .then(() =>
        msgAlert({
          heading: "Sign Up Success",
          message: messages.signUpSuccess,
          variant: "success",
        })
      )
      .then(() => history.push("/"))
      .catch((error) => {
        this.setState({ email: "", password: "", passwordConfirmation: "" });
        msgAlert({
          heading: "Sign Up Failed with error: " + error.message,
          message: messages.signUpFailure,
          variant: "danger",
        });
      });
  };

  render() {
    const { email, password, passwordConfirmation } = this.state;

    return (
      <div className="row">
        <div className="sign-up-form col-sm-10 col-md-8 mx-auto mt-5">
          <h3 className="sign-up--title">Register your account</h3>
          <Form className="sign-up--form" onSubmit={this.onSignUp}>
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
            <Form.Group controlId="passwordConfirmation">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                required
                name="passwordConfirmation"
                value={passwordConfirmation}
                type="password"
                placeholder="Confirm Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button className="sign-up--btn" variant="primary" type="submit">
              Sign Up
            </Button>
            <div className="navigate-sign-in">
              <p className="have-account">Have an account?</p>
              <Nav.Link className="navigate--sign-in" href="#sign-in">
                Sign In
              </Nav.Link>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(SignUp);
