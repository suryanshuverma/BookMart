import React from "react";
import './index.css';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Modal = ({ onClose, login }) => {
  const navigate = useNavigate();


  return (
    <>
      {login && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-login-container">
              <h5>You need to login to Sell your Book.</h5>
              <Button
                variant="text"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
