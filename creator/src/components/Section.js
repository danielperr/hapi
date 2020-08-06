import React from 'react';
import Element from './Element';
import Editable from './Editable';
import { DEFAULT_ELEMENT } from '../App';
import { makeid, deepcopy } from '../utils';


export default function Section({ structure, onChange }) {
  
  const handleChangeHeader = (text) => {
    const structureCopy = deepcopy(structure);
    Object.assign(structureCopy, {header: text})
    onChange(structureCopy);
  }

  const handleChangeElement = (updatedElement) => {
    let structureCopy = deepcopy(structure);
    structureCopy.elements.forEach(element => {
      if (element.id === updatedElement.id) {
        Object.assign(element, updatedElement);
      }
    })
    onChange(structureCopy);
  }

  const handleClickAddElement = () => {
    const newElement = deepcopy(DEFAULT_ELEMENT);
    newElement.id = makeid(10);
    const structureCopy = deepcopy(structure);
    structureCopy.elements.push(newElement);
    onChange(structureCopy);
  }

  const elements = [];
  structure.elements.forEach(element => {
    elements.push(<Element structure={element} onChange={handleChangeElement} />);
  });

  return (
    <div className="section">
      <button><i className="arrow up"></i></button>
      <button><i className="arrow down"></i></button>
      <button style={{color: 'darkred'}}><b>מחק יחידה</b></button>
      <br /><br />
      <Editable size={2} onChange={handleChangeHeader}>{structure.header}</Editable>
      {elements}
      <br />
      <button onClick={handleClickAddElement}><b>הוסף רכיב</b></button>
    </div>
  );
}
