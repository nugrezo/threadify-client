import React, { useState, useEffect } from "react";
import "./ShowUserThreads.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { showThread } from "../../../api/thread";
import messages from "../../AutoDismissAlert/messages";
import Icon from "../Icon/Icon";

const ShowUserThreads = ({ msgAlert, user }) => {
  const [userThreads, setUserThreads] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [threadId, setThreadId] = useState("");

  //   const onSetAllIndex = async () => {
  //     try {
  //       const response = await showThread(user, threadId);
  //       setUserThreads(response.data.threads);
  //       console.log(`response.data is ${JSON.stringify(response.data)}`);

  //       // Assuming there's a function to handle route change
  //       // Replace the following line with the actual route change logic
  //       // changeRouteFunction();
  //     } catch (error) {
  //       console.error("Failed to fetch threads:", error);
  //     }
  //   };

  //   const handleUpdateChange = (event) => {
  //     const { name, value } = event.target;
  //     setUserThreads((prevData) => {
  //       const newData = { ...prevData, [name]: value };
  //       return newData;
  //     });
  //   };

  const handleUpdate = (id, user) => {
    console.log(`selected thread is is ${id}`);
    setShowModal(true);
    setThreadId(id);
    console.log("User object before API call:", user);
  };

  const onShowUserThreads = async () => {
    try {
      const response = await showThread(user, threadId);
      console.log(`all threads user is ${JSON.stringify(user)}`);
      const filteredThreadsBasedOnOwner = response.data.threads.filter(
        (thread) => thread.owner === user._id
      );
      setUserThreads(filteredThreadsBasedOnOwner);

      console.log(
        `filtered thread is ${JSON.stringify(filteredThreadsBasedOnOwner)}`
      );
      msgAlert({
        heading: "DISPLAY MY THREADS SUCCESS ",
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
                    onClick={() => handleUpdate(userThread.id, user)}
                    className="create-comment--btn"
                    variant="primary"
                    type="submit"
                  >
                    Edit
                  </Button>
                  <Button
                    className="create-comment--btn"
                    variant="primary"
                    type="button"
                  >
                    Delete
                  </Button>

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
                          <Form onSubmit={onShowUserThreads}>
                            <Form.Group className="form-comment">
                              <Form.Control
                                as="textarea"
                                placeholder="Enter your update thread"
                                rows={5}
                                className="form-control"
                                name="text"
                                value={userThreads.text}
                                // onChange={handleUpdateChange}
                              />
                            </Form.Group>
                            <div className="modal-footer">
                              <Button type="submit" className="comment-add-btn">
                                Save
                              </Button>
                              <Button
                                type="button"
                                className="comment-cancel-btn"
                                onClick={() => setShowModal(false)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </Form>
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
