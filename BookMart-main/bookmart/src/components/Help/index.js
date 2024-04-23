import React,{useState} from "react";
import './styles.css';
const Help = () => {
  const iframeStyle = {
    width: "25%",
    height: "500px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    textAlign: "center",
    margin: "50px 200px 20px 200px",
  };
  return (
    <div className="help-container">
      <div className="background-chatbot-image"></div>
      <div className="chatbot-container">
        <iframe
          style={iframeStyle}
          src="https://widget.kommunicate.io/chat?appId=1db61184e71690c577e1adc3378db663e"
          allow="microphone; geolocation;"
        ></iframe>
      </div>
    </div>
  );
};

export default Help;
