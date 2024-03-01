import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Nav from "react-bootstrap/Nav";
import "./CreateThread.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import { signIn, signUp } from "../../../api/auth";

import { createThread } from "../../../api/thread";
import messages from "../../AutoDismissAlert/messages";
import Icon from "../Icon/Icon";

const CreateThread = ({ msgAlert, user }) => {
  const [formData, setFormData] = useState({
    text: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => {
      const newData = { ...prevData, [name]: value };
      return newData;
    });
  };

  const onCreateThread = async (event) => {
    event.preventDefault();

    try {
      const response = await createThread(formData, user);
      setFormData({
        text: "",
      });
      console.log(`response is ${response}`);
      msgAlert({
        heading: "CREATE SUCCESS",
        message: messages.createThreadSucess,
        variant: "success",
      });
    } catch (error) {
      console.error("Thread Creation Failed:", error);

      msgAlert({
        heading: "Create Thread Failed with error: " + error.message,
        message: messages.signUpFailure,
        variant: "danger",
      });
    }
  };

  return (
    <>
      <Icon />
      <div className="create-thread-container">
        <div className="create-thread-form col-sm-10 col-md-8 mx-auto mt-5">
          {/* <h3 className="create-thread--title">Create Thread</h3> */}
          <Form className="create-thread--form" onSubmit={onCreateThread}>
            <Form.Group className="create-thread--input" controlId="thread">
              {/* <Form.Label>Thread</Form.Label> */}
              <Form.Control
                className="create-thread--input"
                required
                type="text"
                name="text"
                value={formData.text}
                placeholder="What's on your mind?"
                onChange={handleChange}
              />
            </Form.Group>
            <Button
              className="create-thread--btn"
              variant="primary"
              type="submit"
            >
              Post
            </Button>
            {/* <div className="navigate-sign-in">
            <p className="have-account">Have an account?</p>
            <Nav.Link className="navigate--sign-in" href="#sign-in">
              Sign In
            </Nav.Link>
          </div> */}
          </Form>
        </div>
      </div>
    </>
  );
};

export default CreateThread;
