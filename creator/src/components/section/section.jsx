import React from 'react';
import Element from '../element/element';
import Editable from '../editable/editable';
import ArrowButtons from '../arrow-buttons';
import DeleteButton from '../delete-button';
import { DEFAULT_ELEMENT } from '../../constants';
import { makeid, deepcopy } from '../../utils';
import './section.css';
import Toolbar from '../toolbar';

function Section({ structure, onChange }) {
  
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
      <Toolbar>
        <ArrowButtons />
        <DeleteButton />
      </Toolbar>
      <Editable size={2} onChange={handleChangeHeader}>{structure.header}</Editable>
      {elements}
      <br />
      <button onClick={handleClickAddElement}><b>הוסף רכיב</b></button>
    </div>
  );
}

export default Section;
