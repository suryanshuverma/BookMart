import React, { useState, useEffect } from "react";
import "./style.css";
import Searchbar from "./Searchbar";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { auth, db } from "../../firebase";
import { Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Overlay from "../Overlay";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Login from "../Authentication/Login";
import { useSelector } from "react-redux";
import IconSVG from "../../assests/icon.svg";
import Modal from "../Modal";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
import { loggedUserActions } from "../../store";
import { NavLink } from "react-router-dom";
const Index = () => {
  const [isActive, setIsActive] = useState(true);
  const [isSidebarActive, setIsSidebarActive] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const userLoggedIn = useSelector((state) => state.loggedUser.loggedUserData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  
  const locationPath = location.pathname;
  const handleOverlayClick = (event) => {
    setIsActive((current) => !current);
    setIsSidebarActive((current) => !current);
  };

  const handleResize = () => {
    if (window.innerWidth <= 750) setModalOpen(false);
  };
  window.addEventListener("resize", handleResize);

  const handleAddBookClick = () => {
    navigate("/addbook");
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const [openModal, setOpenModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    
    auth.signOut();
    dispatch(authActions.logout());
    dispatch(loggedUserActions.clearUser());
    navigate("/");
    window.location.reload();
  };
  return (
    <>
      <Overlay
        isActive={isActive}
        setIsActive={setIsActive}
        setIsSidebarActive={setIsSidebarActive}
      />

      <div className="navbar-container">
        <site-logo
          onClick={() => {
            navigate("/");
          }}
        >
          <img className="icon-img" src={IconSVG} alt="icon"></img>
          <span>BookMart</span>
        </site-logo>
        {locationPath === "/login" ? "" : <Searchbar />}
        <div className="links-container">
          <ul className="links">
            {locationPath === "/login" ? (
              ""
            ) : (
              <li>
                <a>
                  <Button
                    sx={{ color: "#f4eee0" }}
                    variant="outlined"
                    onClick={handleAddBookClick}
                  >
                    Add Book
                  </Button>
                </a>
              </li>
            )}
            {isAuth && (
              <>
                <Link to="/wishlist">
                  <li>
                    <a>
                      <FavoriteBorderOutlinedIcon fontSize="large" />
                    </a>
                  </li>
                </Link>
                <li>
                  <Link to="/cartdata">
                    <AddShoppingCartIcon fontSize="large" />
                  </Link>
                </li>
              </>
            )}
            <li onClick={toggleDropdown}>
              <a>
                <AccountCircleIcon fontSize="large" />
              </a>
              {showDropdown && (
                <ul className="dropdown-menu">
                  <li>
                    <a>
                      {isAuth
                        ? `Hi ${userLoggedIn[0]?.userName?.toUpperCase()}`
                        : `Hi User`}
                    </a>
                  </li>
                  <li>
                    <NavLink to="/">
                      <a>Home</a>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/help">
                      <a>Need Help?</a>
                    </NavLink>
                  </li>
                  <li>
                    {isAuth ? (
                      <a onClick={handleLogout}>
                        <Button variant="outlined">Log Out</Button>
                      </a>
                    ) : (
                      <NavLink to="/login">
                        <a>
                          <Button variant="outlined">Log In</Button>
                        </a>
                      </NavLink>
                    )}
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
        <div className="icons">
          <i
            className={`fa-solid fa-bars fa-2xl bars ${
              isActive ? "active" : ""
            }`}
            onClick={handleOverlayClick}
          ></i>
          <i
            className={` fa-solid fa-xmark fa-2xl cross ${
              isActive ? "" : "active"
            }`}
            onClick={handleOverlayClick}
          ></i>
        </div>
      </div>
      <div className={`sidebar ${isSidebarActive ? " " : "sidebar-active  "}`}>
        <ul className="sidebar-links">
          <li>
            <a>
              {isAuth
                ? `Hi ${userLoggedIn[0]?.userName?.toUpperCase()}`
                : `Hi User`}
            </a>
          </li>
          <li>
            <Link to="/cartdata">Cart</Link>
          </li>
          {isAuth && (
            <Link to="/wishlist">
              <li>
                <a>Wishlist</a>
              </li>
            </Link>
          )}
          <li>
            <NavLink to="/help">
              <a>Need Help?</a>
            </NavLink>
          </li>
          <li>
            {isAuth ? (
              <a onClick={handleLogout}>
                <Button variant="outlined">Log Out</Button>
              </a>
            ) : (
              <NavLink to="/login">
                <a>
                  <Button variant="outlined">Log In</Button>
                </a>
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default Index;