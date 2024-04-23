import React from "react";
import "./style.css";
const Footer = () => {
  return (
    <div className="container-fluid  w-100 footer">
      <footer className="bg-dark text-center text-lg-start text-white">
        <div className="container-fluid p-4">
          <div className="row mt-4">
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0 	">
              <h5 className="text-uppercase">See other books</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <i className="fas fa-book fa-fw fa-sm me-2"></i>Bestsellers
                </li>
                <li>
                  <i className="fas fa-book fa-fw fa-sm me-2"></i>All books
                </li>
                <li>
                  <i className="fas fa-user-edit fa-fw fa-sm me-2"></i>Our authors
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 mb-4 mb-md-0 execution-div">
              <h5 className="text-uppercase">Execution of the contract</h5>

              <ul className="list-unstyled">
                <li>
                  <i className="fas fa-shipping-fast fa-fw fa-sm me-2"></i>
                  Supply
                </li>
                <li>
                  <i className="fas fa-backspace fa-fw fa-sm me-2"></i>Returns
                </li>
                <li>
                  <i className="far fa-file-alt fa-fw fa-sm me-2"></i>Privacy policy
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 mb-4 mb-md-0 company-div">
              <h5 className="text-uppercase">FEATURES</h5>

              <ul className="list-unstyled">
                <li>Buy</li>
                <li>Sell</li>
                <li>Great Prices</li>
  
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Write to us</h5>

              <ul className="list-unstyled">
                <li>
                  <i className="fas fa-at fa-fw fa-sm me-2"></i>Help in purchasing
                </li>
                <li>
                  <i className="fas fa-shipping-fast fa-fw fa-sm me-2"></i>Check the
                  order status
                </li>
                <li>
                  <i className="fas fa-envelope fa-fw fa-sm me-2"></i>Join the
                  newsletter
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2023 Copyright:
          <a className="text-white" href="">
            bookmart.com
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
