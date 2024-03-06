// import React, { useState } from "react";

// import "./IndexThreads.css";
// import { Button } from "react-bootstrap";
// import messages from "../../AutoDismissAlert/messages";
// import Form from "react-bootstrap/Form";

// const createCommentThread = ({ msgAlert, user }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     text: "",
//     user,
//   });

//   const handleCommentChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevComment) => {
//       const newData = { ...prevComment, [name]: value };
//       return newData;
//     });
//   };

//   const onCreateCommentThread = async (event) => {
//     console.log("onCreateCommentThread function is called");
//     event.preventDefault();

//     try {
//       console.log("Before API call - user:", user);
//       console.log("Token before request:", user.token);
//       console.log("formData:", formData);
//       await createCommentThread(formData, user);
//       setFormData({
//         text: "",
//       });
//       setShowModal(false);
//       msgAlert({
//         heading: "CREATE COMMENT SUCCESS",
//         message: messages.createCommentSucess,
//         variant: "success",
//       });
//     } catch (error) {
//       console.error("Thread Creation Failed:", error);

//       msgAlert({
//         heading: "Create Comment to Thread Failed with error: " + error.message,
//         message: messages.createCommentFailure,
//         variant: "danger",
//       });
//     }
//   };

//   return (
//     <div>
//       {showModal && (
//         <div className="modal" style={{ display: "block" }}>
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Add Comment</h5>
//                 <Button
//                   type="button"
//                   className="btn-close"
//                   aria-label="Close"
//                   onClick={() => setShowModal(false)}
//                 ></Button>
//               </div>
//               <Form onSubmit={onCreateCommentThread}>
//                 <Form.Group className="form-comment">
//                   <Form.Control
//                     as="textarea"
//                     placeholder="Enter your comment here..."
//                     rows={5}
//                     className="form-control"
//                     name="text"
//                     value={formData.text}
//                     onChange={handleCommentChange}
//                   />
//                 </Form.Group>
//                 <div className="modal-footer">
//                   <Button type="submit" className="comment-add-btn">
//                     Add
//                   </Button>
//                   <Button
//                     type="button"
//                     className="comment-cancel-btn"
//                     onClick={() => setShowModal(false)}
//                   >
//                     Cancel
//                   </Button>
//                 </div>
//               </Form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default createCommentThread;
