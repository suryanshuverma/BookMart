import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './style.css'
const Carousl = () => {
  return (
    <>
      <div
        id="carouselExampleRide"
        className="carousel slide carousel-css "
        data-bs-ride="true"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://www.bookswagon.com/images/bannerimages/80_inr.jpg?v=1.6"
              className="d-block w-100 carousel-img"
              alt="Loading Error !"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://www.bookswagon.com/images/bannerimages/79_inr.jpg?v=1.6"
              className="d-block w-100"
              alt="Loading Error !"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://www.bookswagon.com/images/bannerimages/81_inr.jpg?v=1.8"
              className="d-block w-100"
              alt="Loading Error !"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://www.bookswagon.com/images/bannerimages/82_inr.jpg?v=1.8"
              className="d-block w-100"
              alt="Loading Error !"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://www.bookswagon.com/images/bannerimages/83_inr.jpg?v=1.8"
              className="d-block w-100"
              alt="Loading Error !"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://www.bookswagon.com/images/bannerimages/84_inr.jpg?v=1.8"
              className="d-block w-100"
              alt="Loading Error !"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleRide"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleRide"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default Carousl;
