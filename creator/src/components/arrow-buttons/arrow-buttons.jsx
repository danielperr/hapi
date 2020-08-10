import React from 'react';
import './arrow-buttons.css';

function ArrowButtons() {
  return (
    <div className="arrow-buttons">
      <button className="arrow-button-first"><i className="arrow up"></i></button>
      <button className="arrow-button-last"><i className="arrow down"></i></button>
    </div>
  )
}

export default ArrowButtons;
