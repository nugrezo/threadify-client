import React, { useState, useEffect } from "react";
import "./UserInfo.css";
import Icon from "../Icon/Icon";
import {
  userAccountInfo,
  changeUsername,
  changeEmail,
  changePassword,
  // uploadProfilePhoto,
} from "../../../api/auth";
import messages from "../../AutoDismissAlert/messages";
import { Modal, Button, Form } from "react-bootstrap";
import DotsLoader from "../../DotsLoader/DotsLoader";

const UserInfo = ({ msgAlert, user }) => {
  const [userInfo, setUserInfo] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [editableUserInfo, setEditableUserInfo] = useState({
    username: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(true);
  // const [profilePhoto, setProfilePhoto] = useState();

  const onUserInfo = async () => {
    try {
      const response = await userAccountInfo(user, user._id);
      const userAccountDataResponse = response.data.user;
      console.log(
        "user account data response is",
        JSON.stringify(userAccountDataResponse)
      );

      setUserInfo(userAccountDataResponse);
      setEditableUserInfo({
        username: userAccountDataResponse.username,
        email: userAccountDataResponse.email,
        oldPassword: "",
        newPassword: "",
      });
      msgAlert({
        message: messages.displayUserInfoSuccess,
        variant: "success",
      });
      setLoading(false);
    } catch (error) {
      msgAlert({
        heading: "Failed to fetch user information: " + error.message,
        message: messages.displayUserInfoFailure,
        variant: "danger",
      });
    }
  };

  useEffect(() => {
    onUserInfo();
  }, [user]);

  const handleEditUserInfo = () => {
    setShowModal(true);
  };

  const handleInputChange = (event) => {
    setEditableUserInfo({
      ...editableUserInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      // Validation checks for username and email
      if (!editableUserInfo.username.trim() || !editableUserInfo.email.trim()) {
        throw new Error("Fields cannot be blank");
      }

      if (!editableUserInfo.email.includes("@")) {
        throw new Error("Email must include @");
      }

      // Validation checks for password (if provided)
      if (editableUserInfo.newPassword.trim() !== "") {
        if (editableUserInfo.newPassword !== editableUserInfo.confirmPassword) {
          throw new Error("Passwords do not match");
        }
      }

      // Update username and email
      await changeUsername(user, editableUserInfo.username, user._id);
      await changeEmail(user, editableUserInfo.email, user._id);

      // Update password if provided
      if (editableUserInfo.newPassword.trim() !== "") {
        await changePassword(
          {
            oldPassword: editableUserInfo.oldPassword,
            newPassword: editableUserInfo.newPassword,
          },
          user
        );
      }

      setUserInfo({
        ...userInfo,
        username: editableUserInfo.username,
        email: editableUserInfo.email,
      });
      setShowModal(false);
      msgAlert({
        message: messages.updateUserInfoSuccess,
        variant: "success",
      });
    } catch (error) {
      // Handle validation errors and other errors
      if (error.message === "Fields cannot be blank") {
        msgAlert({
          message: "Fields cannot be blank",
          variant: "danger",
        });
      } else if (error.message === "Email must include @") {
        msgAlert({
          message: "Email must include @",
          variant: "danger",
        });
      } else if (error.message === "Passwords do not match") {
        msgAlert({
          message: "Passwords do not match",
          variant: "danger",
        });
      } else {
        msgAlert({
          heading: "Failed to update user information: " + error.message,
          message: messages.updateUserInfoFailure,
          variant: "danger",
        });
      }
    }
  };

  // const handleFileChange = (event) => {
  //   console.log("event.target files is ", event.target.files);
  //   const file = event.target.files[0];
  //   console.log("handle file change file", file);
  //   if (file) {
  //     setProfilePhoto(file);
  //   }
  // };
  // const handleUpload = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (!profilePhoto) {
  //       throw new Error("Please select a photo to upload.");
  //     }
  //     const response = await uploadProfilePhoto(user, profilePhoto);
  //     console.log("Server response data:", response.data); // Log the entire response object
  //     // If upload successful, refresh user information to fetch the updated photo URL
  //     await onUserInfo();
  //     // Extract the URL of the uploaded photo from the response data
  //     const uploadedPhotoUrl = response.data.url;
  //     console.log("Uploaded photo URL:", uploadedPhotoUrl); // Log the URL
  //     // Update the userInfo state with the URL of the uploaded photo
  //     setUserInfo((prevUserInfo) => ({
  //       ...prevUserInfo,
  //       profilePhoto: uploadedPhotoUrl,
  //     }));
  //     msgAlert({
  //       message: "Profile photo uploaded successfully",
  //       variant: "success",
  //     });
  //   } catch (error) {
  //     msgAlert({
  //       heading: "Failed to upload profile photo: " + error.message,
  //       variant: "danger",
  //     });
  //   }
  // };

  return (
    <div className="user-info-container">
      <Icon />
      {loading ? (
        <DotsLoader />
      ) : (
        <div className="user-info-header">User Account Information</div>
      )}
      {loading ? (
        <DotsLoader />
      ) : (
        <div className="user-info-content">
          <div className="user-info-item">
            <label className="user-info-label">User Name</label>
            <span className="user-info-value">{userInfo.username}</span>
          </div>
          <div className="user-info-item">
            <label className="user-info-label">Email</label>
            <span className="user-info-value">{userInfo.email}</span>
          </div>
          <div className="user-info-item">
            <label className="user-info-label">Password</label>
            <span className="user-info-value">Hidden</span>
          </div>
          <Button className="edit-button" onClick={handleEditUserInfo}>
            Edit
          </Button>
        </div>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={editableUserInfo.username}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editableUserInfo.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="oldPassword">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                name="oldPassword"
                value={editableUserInfo.oldPassword}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                value={editableUserInfo.newPassword}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={editableUserInfo.confirmPassword}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer className="modal-footer">
          <Button
            className="modal-footer-btn save-changes-btn"
            variant="primary"
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
          <Button
            className="modal-footer-btn cancel-btn"
            variant="secondary"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserInfo;
