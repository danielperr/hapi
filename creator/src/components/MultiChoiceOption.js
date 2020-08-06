import React from 'react';
import Editable from './Editable';


export default function MultiChoiceOption({ structure, name, select }) {
  const {id, text} = structure;
  return (
    <div className="radio">
      <input type="radio" name={name} value={id} select={select} />
      <Editable>{text}</Editable>
    </div>
  )
}
