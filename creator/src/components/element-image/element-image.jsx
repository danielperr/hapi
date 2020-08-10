import React from 'react';
import Editable from '../editable';
import './element-image.css';

function ElementImage({ structure }) {
  
  return (
    <>
      <Editable>{structure.src}</Editable>
      <br /><br />
      <img src={structure.src} className="element-image" />
    </>
  );
}

export default ElementImage;
