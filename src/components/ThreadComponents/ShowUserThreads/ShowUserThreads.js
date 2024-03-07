import React, { useState, useEffect } from "react";
import "./ShowUserThreads.css";
import { showThread } from "../../../api/thread";
import messages from "../../AutoDismissAlert/messages";
import Icon from "../Icon/Icon";
import Button from "react-bootstrap/Button";
import DeleteUserThread from "../DeleteUserThread/DeleteUserThread";
import UpdateUserThread from "../UpdateThread/UpdateUserThread";

const ShowUserThreads = ({ msgAlert, user }) => {
  const [userThreads, setUserThreads] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [threadId, setThreadId] = useState("");

  const onShowUserThreads = async () => {
    try {
      const response = await showThread(user, threadId);
      const filteredThreadsBasedOnOwner = response.data.threads.filter(
        (thread) => thread.owner === user._id
      );
      setUserThreads(filteredThreadsBasedOnOwner);

      msgAlert({
        heading: "DISPLAY MY THREADS SUCCESS",
        message: messages.displayUserThreadsSuccess,
        variant: "success",
      });
    } catch (error) {
      console.error("User posts could not be retrieved:", error);

      msgAlert({
        heading: "Create Thread Failed with error: " + error.message,
        message: messages.displayUserThreadsFailure,
        variant: "danger",
      });
    }
  };

  useEffect(() => {
    onShowUserThreads();
  }, [user]);

  const handleUpdate = (selectedThreadId) => {
    setShowModal(true);
    setThreadId(selectedThreadId);
  };

  const onUpdateSuccess = async () => {
    setShowModal(false);
    await onShowUserThreads();
    msgAlert({
      heading: "UPDATE THREAD SUCCESS",
      message: messages.updateThreadSuccess,
      variant: "success",
    });
  };

  const onDeleteSuccess = async () => {
    await onShowUserThreads();
    msgAlert({
      heading: "DELETE THREAD SUCCESS",
      message: messages.deleteThreadSuccess,
      variant: "success",
    });
  };

  return (
    <div className={`modal-background ${showModal ? "show" : ""}`}>
      <Icon />
      <div className="index-threads">
        <div className="index-threads--items col-sm-10 col-md-8 mx-auto mt-5">
          {userThreads.map((userThread) => (
            <div className="index-threads--items-all" key={userThread.id}>
              <div className="index-thread--item">
                <div className="profilephoto-container">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="profilephoto-icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </div>
                <div className="index-threads--items-info">
                  <p className="index-threads--items-info-username">
                    {userThread.username}
                  </p>
                  <p className="index-threads--items-info-text">
                    {userThread.text}
                  </p>
                </div>
                <div className="react__container">
                  <Button
                    onClick={() => handleUpdate(userThread._id)}
                    className="create-comment--btn"
                    variant="primary"
                    type="button"
                  >
                    Edit
                  </Button>
                  <DeleteUserThread
                    user={user}
                    threadId={userThread._id}
                    onDeleteSuccess={onDeleteSuccess}
                  />

                  {showModal && (
                    <div className="modal" style={{ display: "block" }}>
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">Edit Comment</h5>
                            <Button
                              type="button"
                              className="btn-close"
                              aria-label="Close"
                              onClick={() => setShowModal(false)}
                            ></Button>
                          </div>
                          <UpdateUserThread
                            user={user}
                            threadId={threadId}
                            initialText={userThread.text}
                            onUpdateSuccess={onUpdateSuccess}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowUserThreads;
