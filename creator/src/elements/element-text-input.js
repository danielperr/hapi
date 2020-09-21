import React from 'react';

import produce from 'immer';

import Checkbox from '../shared/checkbox';
import Editable from '../shared/editable';

function ElementTextInput({ structure, onUpdate }) {

  const handleChangeText = (text) => {
    onUpdate(produce(structure, newStructure => {
      newStructure.text = text;
    }))
  }

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
      <Editable onChange={handleChangeText}>{structure.text}</Editable>
      <br /><br />
      <Checkbox 
        id={structure.id + '-shuffle'}
        checked={structure.multiline}
        onCheck={handleCheckMultiline}
      >
        תשובה ארוכה? (יותר משורה אחת)
      </Checkbox>
    </>
  );
}

export default ElementTextInput;
