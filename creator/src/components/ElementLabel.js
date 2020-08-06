import React from 'react';
import Editable from './Editable';
import { deepcopy } from '../utils';


export default function ElementLabel({ structure, onChange }) {

  const handleChange = (text) => {
    const structureCopy = deepcopy(structure);
    structureCopy.text = text;
    onChange(structureCopy);
  }

  return (
    <Editable onChange={handleChange}>{structure.text}</Editable>
  );
}
