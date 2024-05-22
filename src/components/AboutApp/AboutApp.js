import React from "react";
import { useNavigate } from "react-router-dom";

import "./AboutApp.css";

const AboutApp = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>About Threadify</h2>
      <div className="about-app-container">
        <p>
          Threadify is a social media app designed for seamless thread creation,
          reading, liking, and commenting. To fully engage with the apps
          features, users are required to create an account.
        </p>

        <p>
          <strong>Key features of Threadify</strong>
        </p>
        <ul>
          <li>
            <strong>Account Creation: </strong>Users must create an account to
            access Threadify&apos;s features, ensuring personalized interactions
            and data security.
          </li>
          <li>
            <strong>Creating Threads:</strong> Users can easily initiate their
            own threads on various topics, expressing their thoughts, opinions,
            and interests to the Threadify community.
          </li>
          <li>
            <strong>Reading Threads:</strong> TThreadify provides a seamless
            browsing experience, allowing users to explore and read threads
            created by other users, fostering engagement and knowledge-sharing.
          </li>
          <li>
            <strong>Displaying Your Own Thread:</strong>Users have a dedicated
            space to showcase threads they have created, making it easy to
            manage and track their contributions to the platform.
          </li>
          <li>
            <strong>Updating Thread:</strong> Users can edit and update their
            own threads as needed, ensuring accuracy and relevance over time.
          </li>
          <li>
            <strong>Deleting Thread:</strong> Threadify allows users to remove
            threads they no longer wish to be displayed, providing control over
            their content and contributions.
          </li>
          <li>
            <strong>Thread Interaction:</strong> Users can engage in vibrant
            discussions by commenting on threads created by others, sharing
            their perspectives and insights.Threadify enables users to express
            appreciation for threads they enjoy by liking them, fostering a
            sense of community and recognition among users.
          </li>
        </ul>
        <p className="join-now">
          Join the Threadify community today and discover a new way to
          experience social media!
        </p>
        <button
          className="navigate-signUp"
          onClick={() => navigate("/sign-up")}
        >
          Join Now
        </button>
      </div>
    </div>
  );
};

export default AboutApp;
