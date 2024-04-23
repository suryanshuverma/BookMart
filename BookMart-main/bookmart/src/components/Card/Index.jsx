import React from "react";
import "./style.css";
import { useNavigate, useLocation } from "react-router-dom";
const Card = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleMoreInfo = () => {
    const state = { message: currentPath };
    navigate(`/productdetails/${props.id}`, { state });
  };

  return (
    <div className="card-container" key={props.key}>
      <div className="card-details">
        <div className="img-container">
          <img src={props.image} alt="Loading Error" />
        </div>
        <div className="data">
          <div className="text-title">{props.title}</div>
          <div className="text-body">&#8377;{props.price}</div>
        </div>
      </div>

      <button
        className="card-button"
        onClick= {handleMoreInfo}
      >
        More info
      </button>
    </div>
  );
};

export default Card;
