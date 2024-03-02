import React, { useState } from "react";
import "./CreateCommentThread.css";
import { createCommentThread } from "../../../api/thread";
import messages from "../../AutoDismissAlert/messages";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const CreateCommentThread = ({ msgAlert, user }) => {
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

  const onCreateCommentThrad = async (event) => {
    event.preventDefault();

    try {
      const response = await createCommentThread(formData, user);
      setFormData({
        text: "",
      });
      console.log(`response is ${response}`);
      msgAlert({
        heading: "CREATE COMMENT SUCCESS",
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
      <div className="create-comment-thread-container">
        <div className="create-comment-thread-form col-sm-10 col-md-8 mx-auto mt-5">
          {/* <h3 className="create-thread--title">Create Thread</h3> */}
          <Form
            className="create-comment-thread--form"
            onSubmit={onCreateCommentThrad}
          >
            <Form.Group
              className="create-comment-thread--input"
              controlId="comment-thread"
            >
              {/* <Form.Label>Thread</Form.Label> */}
              <Form.Control
                className="create-comment-thread--input"
                required
                type="text"
                name="text"
                value={formData.text}
                placeholder="Comment here"
                onChange={handleChange}
              />
            </Form.Group>
            <Button
              className="create-comment-thread--btn"
              variant="primary"
              type="submit"
            >
              Comment
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

export default CreateCommentThread;
