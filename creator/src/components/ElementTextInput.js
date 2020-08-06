import React from 'react';
import Checkbox from './Checkbox';
import Editable from './Editable';


export default function ElementTextInput({ structure }) {
  
  return (
    <>
      <Editable>{structure.text}</Editable>
      <br /><br />
      <Checkbox id={structure.id + '-shuffle'}>תשובה ארוכה? (יותר משורה אחת)</Checkbox>
    </>
  );
}
