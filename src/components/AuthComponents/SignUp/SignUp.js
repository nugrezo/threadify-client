import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import "./SignUp.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { signIn, signUp } from "../../../api/auth";
import messages from "../../AutoDismissAlert/messages";

const SignUp = ({ msgAlert, setUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSignUp = async (event) => {
    event.preventDefault();

    try {
      await signUp(formData);
      const response = await signIn(formData);
      setUser(response.data.user);
      msgAlert({
        heading: "Sign Up Success",
        message: messages.signUpSuccess,
        variant: "success",
      });
      navigate("/home");
    } catch (error) {
      setFormData({
        email: "",
        password: "",
        passwordConfirmation: "",
      });
      msgAlert({
        heading: "Sign Up Failed with error: " + error.message,
        message: messages.signUpFailure,
        variant: "danger",
      });
    }
  };

  return (
    <div className="row">
      <div className="sign-up-form col-sm-10 col-md-8 mx-auto mt-5">
        <h3 className="sign-up--title">Register your account</h3>
        <Form className="sign-up--form" onSubmit={onSignUp}>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type="email"
              name="email"
              value={formData.email}
              placeholder="Enter email"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="username">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              required
              type="username"
              name="username"
              value={formData.username}
              placeholder="User Name"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              name="password"
              value={formData.password}
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="passwordConfirmation">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control
              required
              name="passwordConfirmation"
              value={formData.passwordConfirmation}
              type="password"
              placeholder="Confirm Password"
              onChange={handleChange}
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
};

export default SignUp;
