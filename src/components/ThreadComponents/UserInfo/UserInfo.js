import React, { useState, useEffect } from "react";
import "./UserInfo.css";
import Icon from "../Icon/Icon";
import {
  userAccountInfo,
  changeUsername,
  changeEmail,
  changePassword,
} from "../../../api/auth";
import messages from "../../AutoDismissAlert/messages";
import { Modal, Button, Form } from "react-bootstrap";

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

  const onUserInfo = async () => {
    try {
      const response = await userAccountInfo(user, user._id);
      const userAccountDataResponse = response.data.user;
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

      const updatePromises = [
        changeUsername(user, editableUserInfo.username),
        changeEmail(user, editableUserInfo.email),
      ];

      // Add change password promise if newPassword is provided
      if (editableUserInfo.newPassword.trim() !== "") {
        updatePromises.push(
          changePassword(
            {
              oldPassword: editableUserInfo.oldPassword,
              newPassword: editableUserInfo.newPassword,
            },
            user
          )
        );
      }

      await Promise.all(updatePromises);

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

  return (
    <div className="user-info-container">
      <Icon />
      <div className="user-info-header">User Account Information</div>
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
            nvariant="primary"
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
