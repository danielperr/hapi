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

export default DeleteButton;
