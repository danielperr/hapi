import React from 'react';
import produce from 'immer';

import Checkbox from './checkbox/checkbox';
import Editable from './editable/editable';

function ElementTextInput({ structure, onUpdate }) {

  const handleCheckMultiline = (multiline) => {
    onUpdate(produce(structure, newStructure => {
      if (multiline) {
        newStructure.multiline = multiline;
      } else {
        delete newStructure.multiline;
      }
    }))
  }
  
  return (
    <>
      <Editable>{structure.text}</Editable>
      <br /><br />
      <Checkbox id={structure.id + '-shuffle'} checked={structure.multiline} onCheck={handleCheckMultiline}>תשובה ארוכה? (יותר משורה אחת)</Checkbox>
    </>
  );
}

export default ElementTextInput;
