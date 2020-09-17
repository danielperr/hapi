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



.arrow-buttons {
  display: inline;
  border-radius: 50%;
  overflow: hidden;
}

.arrow-button-first {
  border-radius: 0 12px 12px 0;
}

.arrow-button-first i {
  position: relative;
  right: 1px;
}

.arrow-button-last {
  border-radius: 50% 0 0 50%;
}

.arrow-button-last i {
  position: relative;
  left: 1px;
}

.arrow {
  border: solid black;
  border-width: 0 1px 1px 0;
  display: inline-block;
  padding: 2px;
}

.right {
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}

.left {
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
}

.up {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}

.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  position: relative;
  bottom: 3px;
}


export default ArrowButtons;
