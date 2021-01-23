import React from 'react';

import produce from 'immer';

import Editable from '../common/editable';

function ElementLabel({ structure, onUpdate }) {

  const handleChange = (text) => {
    onUpdate(produce(structure, newStructure => {
      newStructure.text = text;
    }));
  }

  return (
    <Editable onChange={handleChange}>{structure.text}</Editable>
  );
}

export default ElementLabel;
