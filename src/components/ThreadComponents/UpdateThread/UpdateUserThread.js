import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { updateThread } from "../../../api/thread";

const UpdateUserThread = ({ user, threadId, initialText, onUpdateSuccess }) => {
  const [updatedText, setUpdatedText] = useState(initialText);

  const handleUpdateChange = (event) => {
    setUpdatedText(event.target.value);
  };

  const onUpdateThread = async () => {
    try {
      await updateThread({ text: updatedText }, user, threadId);
      onUpdateSuccess();
    } catch (error) {
      console.error("Thread update failed:", error);
      // Handle error or show alert
    }
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        onUpdateThread();
      }}
    >
      <Form.Group className="form-comment">
        <Form.Control
          as="textarea"
          placeholder="Enter your update thread"
          rows={5}
          className="form-control"
          name="text"
          value={updatedText}
          onChange={handleUpdateChange}
        />
      </Form.Group>
      <div className="modal-footer">
        <Button type="submit" className="comment-add-btn">
          Save
        </Button>
      </div>
    </Form>
  );
};

export default UpdateUserThread;
