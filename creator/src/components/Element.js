import React from 'react';
import ElementLabel from './ElementLabel';
import ElementYoutube from './ElementYoutube';
import ElementMultiChoice from './ElementMultiChoice';
import ElementTextInput from './ElementTextInput';
import ElementImage from './ElementImage';
import ElementNumberInput from './ElementNumberInput';
import { deepcopy } from '../utils';


export default function Element({ structure, onChange }) {

  const handleChangeType = (e) => {
    const structureCopy = deepcopy(structure);
    structureCopy.type = e.target.value;
    onChange(structureCopy);
  }

  // const handleChangeElement = (updatedElement) => {
  //   const structureCopy = deepcopy(structure);
  //   structureCopy.type = e.target.value;
  //   onChange(structureCopy);
  // }

  const { type } = structure;
  let obj;
  switch (type) {
    case 'label':
      obj = <ElementLabel structure={structure} />;
      break;
    case 'image':
      obj = <ElementImage structure={structure} />;
      break;
    case 'youtube':
      obj = <ElementYoutube structure={structure} />;
      break;
    case 'multi-choice':
      obj = <ElementMultiChoice structure={structure} />;
      break;
    case 'text-input':
      obj = <ElementTextInput structure={structure} />;
      break;
    case 'number-input':
      obj = <ElementNumberInput structure={structure} />;
      break;
  }

  return (
    <div className="element">
      <button><i className="arrow up"></i></button>
      <button><i className="arrow down"></i></button>
      <select value={type} onChange={handleChangeType}>
        <optgroup label="תצוגה">
          <option value="label">טקסט</option>
          <option value="image">תמונה</option>
          <option value="youtube">סרטון</option>
        </optgroup>
        <optgroup label="מילוי">
          <option value="multi-choice">שאלת בחירה</option>
          <option value="text-input">שאלת כתיבה</option>
          <option value="number-input">שאלת מספר</option>
        </optgroup>
      </select>
      <button style={{color: 'darkred'}}><b>מחק רכיב</b></button>
      <br /><br />
      {obj}
    </div>
  );
}
