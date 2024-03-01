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
      <div className="create-thread-container">
        <div className="create-thread-form col-sm-10 col-md-8 mx-auto mt-5">
          <h2>Threads:</h2>
          <ul>
            {threads.map((thread) => (
              <li key={thread.id}>{thread.text}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default IndexThreads;
