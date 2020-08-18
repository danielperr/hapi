import React from 'react';
import './arrow-buttons.css';

function ArrowButtons({ onClickUp, onClickDown }) {
  return (
    <div className="arrow-buttons">
      <button className="arrow-button-first" onClick={onClickUp}><i className="arrow up"></i></button>
      <button className="arrow-button-last" onClick={onClickDown}><i className="arrow down"></i></button>
    </div>
  )
}

export default ArrowButtons;
