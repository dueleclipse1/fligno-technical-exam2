import React from "react";
import ToastC from "react-bootstrap/Toast";

const Toast = (props) => {
  return (
    <>
      <ToastC
        className="d-inline-block m-1"
        bg='light'
      >
        <ToastC.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
        </ToastC.Header>
        <ToastC.Body className="Dark">
          Hello, world! This is a toast message.
        </ToastC.Body>
      </ToastC>
    </>
  );
};

export default Toast;
