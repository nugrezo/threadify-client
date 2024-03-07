import React from "react";
import Button from "react-bootstrap/Button";
import { deleteThread } from "../../../api/thread";

const DeleteUserThread = ({ user, threadId, onDeleteSuccess }) => {
  const onDeleteThread = async () => {
    try {
      await deleteThread(user, threadId);
      onDeleteSuccess();
    } catch (error) {
      console.error("Thread deletion failed:", error);
      // Handle error or show alert
    }
  };

  return (
    <Button
      onClick={onDeleteThread}
      className="create-comment--btn"
      variant="primary"
      type="button"
    >
      Delete
    </Button>
  );
};

export default DeleteUserThread;
