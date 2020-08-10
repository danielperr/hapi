import React from 'react';
import Checkbox from './checkbox/checkbox';
import Editable from './editable/editable';

function ElementTextInput({ structure }) {
  
  return (
    <>
      <Editable>{structure.text}</Editable>
      <br /><br />
      <Checkbox id={structure.id + '-shuffle'}>תשובה ארוכה? (יותר משורה אחת)</Checkbox>
    </>
  );
}

export default ElementTextInput;
