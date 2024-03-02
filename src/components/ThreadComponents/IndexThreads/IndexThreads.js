import React, { useState, useEffect } from "react";

import "./IndexThreads.css";
import { getAllThreads } from "../../../api/thread";
import Icon from "../Icon/Icon";

const IndexThreads = ({ user }) => {
  const [threads, setThreads] = useState([]);

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
    <>
      <Icon onSetAllIndex={onSetAllIndex} />
      <div className="index-threads">
        <div className="index-threads--items col-sm-10 col-md-8 mx-auto mt-5">
          {threads.map((thread) => (
            <div className="index-threads--items-all" key={thread.id}>
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
              <div className="index-threads--items-info">
                <p className="index-threads--items-info-username">
                  {thread.username}
                </p>
                <p className="index-threads--items-info-text">{thread.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default IndexThreads;
