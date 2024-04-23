import React from 'react'
import './style.css';
const Overlay = (props) => {
     const handleClick = (event) => {
       props.setIsActive((current) => !current);
       props.setIsSidebarActive((current=>!current));
     };
  return (
    <div
      className={`overlay-head ${props.isActive ? "" : "active-overlay"}`}
      onClick={handleClick}
    ></div>
  );
}

export default Overlay;