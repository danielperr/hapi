import React from 'react';
import produce from 'immer';
import Editable from './editable/editable';
import { deepcopy } from '../utils';

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
