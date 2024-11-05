import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllThreads } from "../../../api/thread";
import { getProfilePhoto } from "../../../api/auth"; // Ensure this function accepts userId and token
import Icon from "../Icon/Icon";
import { Button } from "react-bootstrap";
import CreateCommentThread from "../ReactThread/CreateCommentThread";
import "./IndexThreads.css";
import LikeThread from "../ReactThread/LikeThread/LikeThread";

const IndexThreads = ({ msgAlert, user }) => {
  const navigate = useNavigate();
  const [threads, setThreads] = useState([]);
  const [userPhotos, setUserPhotos] = useState({}); // Map userId to photoUrl
  const [showModal, setShowModal] = useState(false);
  const [selectedThreadId, setSelectedThreadId] = useState(null);
  const [formData, setFormData] = useState({
    text: "",
    user,
  });

  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const fetchUserPhoto = async (userId) => {
    try {
      const response = await getProfilePhoto({ token: user.token, userId });
      return response.data.photoUrl;
    } catch (error) {
      console.error("Error fetching profile photo for user:", userId, error);
      return null;
    }
  };

  const onSetAllIndex = async () => {
    try {
      const response = await getAllThreads(user);
      const threadsData = response.data.threads;
      setThreads(threadsData);

      const uniqueUserIds = new Set();
      threadsData.forEach((thread) => {
        uniqueUserIds.add(thread.owner);
        thread.comments.forEach((comment) => uniqueUserIds.add(comment.owner));
      });

      const photos = {};
      await Promise.all(
        Array.from(uniqueUserIds).map(async (userId) => {
          const photoUrl = await fetchUserPhoto(userId);
          if (photoUrl) {
            photos[userId] = photoUrl;
          }
        })
      );

      setUserPhotos(photos);
      console.log("onSetAllIndex executed successfully"); // Confirm execution
    } catch (error) {
      console.error("Error fetching threads:", error);
    }
  };

  // Passing onSetAllIndex as a prop to CreateCommentThread
  <CreateCommentThread
    showModal={showModal}
    setShowModal={setShowModal}
    selectedThreadId={selectedThreadId}
    setThreads={setThreads}
    setFormData={setFormData}
    formData={formData}
    user={user}
    msgAlert={msgAlert}
    navigate={navigate}
    onSetAllIndex={onSetAllIndex} // Confirmed prop passing
  />;

  useEffect(() => {
    onSetAllIndex();
  }, []);

  const handleComment = (threadId) => {
    setShowModal(true);
    setSelectedThreadId(threadId);
  };

  return (
    <>
      {user && (
        <div className={`modal-background ${showModal ? "show" : ""}`}>
          <Icon onSetAllIndex={onSetAllIndex} />
          <div className="index-threads">
            <div className="index-threads--items col-sm-10 col-md-8 mx-auto mt-5">
              {threads.map((thread) => (
                <div className="index-threads--items-all" key={thread._id}>
                  <div className="index-thread--item">
                    <div className="profilephoto-container-indexthread">
                      {userPhotos[thread.owner] ? (
                        <img
                          src={userPhotos[thread.owner]}
                          className="user-profile-photo"
                          alt="Profile"
                        />
                      ) : (
                        <svg
                          /* Placeholder icon */ xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="index-threads--items-info">
                      <p className="index-threads--items-info-username">
                        {thread.username}
                      </p>
                      <p className="index-threads--items-info-text">
                        {thread.text}
                      </p>
                      <p className="postDate">
                        Posted on: {formatDate(thread.createdAt)}
                      </p>
                    </div>
                    <div className="react__container">
                      <LikeThread
                        thread={thread}
                        threadId={thread._id}
                        user={user}
                        setThreads={setThreads}
                        msgAlert={msgAlert}
                      />
                      <Button
                        onClick={() => handleComment(thread._id)}
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
                      <CreateCommentThread
                        showModal={showModal}
                        setShowModal={setShowModal}
                        selectedThreadId={selectedThreadId}
                        setThreads={setThreads}
                        setFormData={setFormData}
                        formData={formData}
                        user={user}
                        msgAlert={msgAlert}
                        navigate={navigate}
                        onSetAllIndex={onSetAllIndex} // Pass down here
                      />
                    </div>
                  </div>

                  {/* Display Comments */}
                  <div className="comments-container">
                    {thread.comments &&
                      thread.comments.length > 0 &&
                      thread.comments.map((comment) => (
                        <div key={comment._id} className="comment-item">
                          <div className="profilephoto-container-indexthread">
                            {userPhotos[comment.owner] ? (
                              <img
                                src={userPhotos[comment.owner]}
                                className="user-profile-photo"
                                alt="Profile"
                              />
                            ) : (
                              <svg
                                /* Placeholder icon */ xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                              </svg>
                            )}
                          </div>
                          <div className="index-threads--items-info">
                            <p className="comment-username">
                              {comment.username}
                            </p>
                            <p className="comment-text">{comment.text}</p>
                            <p className="comment-date">
                              Commented on: {formatDate(comment.updatedAt)}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IndexThreads;
