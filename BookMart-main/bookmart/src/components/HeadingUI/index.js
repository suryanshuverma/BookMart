import React from 'react'
import './style.css';
const Heading = (props) => {
  return (
    <div className='heading-container'>
        <h1 className='heading-h1'>{props.text}</h1>
        <hr  className="heading-hr"/>
    </div>
  )
}

export default Heading;