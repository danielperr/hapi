import React from 'react';
import './delete-button.css';

function DeleteButton({ onClick, className }) {
  return (
    <button
      className={`delete-button dangerous ${className || ""}`}
      onClick={onClick}
    >
      <i className="delete-icon"></i>
      <b>מחק</b>
    </button>);
}


.delete-button {
  padding: 2px 8px 2px 12px;
  border-radius: 16px;
  float: left;
}

.delete-button b {
  margin-right: 2px;
}

.delete-icon:before, .delete-icon:after {
  display: inline-block;
  content: ' ';
  width: 8px;
  height: 2px;
  position: relative;
  bottom: 3px;
  background-color: #744;
}

.delete-icon:before {
  right: 4px;
  border-width: 0 0 0 1px;
  transform: rotate(45deg);
}

.delete-icon:after {
  left: 4px;
  border-width: 0 1px 0 0;
  transform: rotate(-45deg);
}


export default DeleteButton;
