import React from 'react';
import Editable from './Editable';


export default function ElementImage({ structure }) {
  
  return (
    <>
      <Editable>{structure.src}</Editable>
      <br /><br />
      <img src={structure.src} />
    </>
  );
}
