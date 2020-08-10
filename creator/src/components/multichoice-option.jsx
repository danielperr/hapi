import React from 'react';
import Editable from './editable/editable';

function MultiChoiceOption({ structure, name, select }) {
  const {id, text} = structure;
  return (
    <div className="radio">
      <input type="radio" name={name} value={id} select={select} />
      <Editable>{text}</Editable>
    </div>
  )
}

export default MultiChoiceOption;
