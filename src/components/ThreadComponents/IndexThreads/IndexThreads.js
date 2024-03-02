import React, { useState, useEffect } from "react";

import "./IndexThreads.css";
import { getAllThreads } from "../../../api/thread";
import Icon from "../Icon/Icon";
import { Button } from "react-bootstrap";

const IndexThreads = ({ user }) => {
  const [threads, setThreads] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const onSetAllIndex = useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await getAllThreads(user);
        setThreads(response.data.threads);
        console.log(response.data.threads);
      } catch (error) {
        console.error("Failed to fetch threads:", error);
      }
    };

    fetchThreads();
  }, [user]);

  return (
    <div className={`modal-background ${showModal ? "show" : ""}`}>
      <Icon onSetAllIndex={onSetAllIndex} />
      <div className="index-threads">
        <div className="index-threads--items col-sm-10 col-md-8 mx-auto mt-5">
          {threads.map((thread) => (
            <div className="index-threads--items-all" key={thread.id}>
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
                  {thread.username}
                </p>
                <p className="index-threads--items-info-text">{thread.text}</p>
              </div>
              <div className="react__container">
                <Button
                  className="create-comment--btn"
                  variant="primary"
                  type="submit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    onClick={"handleLikeFunction"}
                    className="like-icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                    />
                  </svg>
                </Button>
                <Button
                  onClick={() => setShowModal(true)}
                  className="create-comment--btn"
                  variant="primary"
                  type="submit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="comment-icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                    />
                  </svg>
                </Button>
                {showModal && (
                  <div className="modal" style={{ display: "block" }}>
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">Add Comment</h5>
                          <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={() => setShowModal(false)}
                          ></button>
                        </div>
                        <div className="modal-body">
                          <textarea
                            placeholder="Enter your comment here..."
                            rows={4}
                            className="form-control"
                          />
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="comment-add-btn">
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndexThreads;
