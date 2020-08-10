import React from 'react';
import './delete-button.css';

function DeleteButton(props) {
  return <button className={`delete-button dangerous ${props.className || ""}`}><i className="delete-icon"></i><b>מחק</b></button>;
}

export default DeleteButton;
