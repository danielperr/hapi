import React from 'react';
import Editable from './editable/editable';
import { deepcopy } from '../utils';

function ElementLabel({ structure, onChange }) {

  const handleChange = (text) => {
    const structureCopy = deepcopy(structure);
    structureCopy.text = text;
    onChange(structureCopy);
  }

  return (
    <Editable onChange={handleChange}>{structure.text}</Editable>
  );
}

export default ElementLabel;
