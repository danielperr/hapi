import React from 'react';
import produce from 'immer';
import Element from '../element/element';
import Editable from '../editable/editable';
import ArrowButtons from '../arrow-buttons';
import DeleteButton from '../delete-button';
import { DEFAULT_ELEMENT } from '../../constants';
import { makeid } from '../../utils';
import './section.css';
import Toolbar from '../toolbar';

function Section({ structure, onUpdate, onDelete }) {
  
  const handleChangeHeader = (text) => {
    onUpdate(produce(structure, newStructure => {
      newStructure.header = text;
    }));
  };

  const handleUpdateElement = (updatedElement) => {
    onUpdate(produce(structure, newStructure => {
      newStructure.elements.forEach((element, i) => {
        if (element.id === updatedElement.id) {
          newStructure.elements[i] = updatedElement;
        }
      })
    }));
  };

  const handleClickAddElement = () => {
    onUpdate(produce(structure, newStructure => {
      newStructure.elements.push(produce(DEFAULT_ELEMENT, newElement => { newElement.id = makeid(10); }))
    }));
  };

  const handleDeleteElement = (elementId) => {
    onUpdate(produce(structure, newStructure => {
      newStructure.elements.forEach((element, index, object) => {
        if (element.id === elementId) {
          object.splice(index, 1);
        }
      });
    }));
  };

  const handleDeleteSelf = () => {
    onDelete(structure.id);
  };

  const elements = [];
  structure.elements.forEach(element => {
    elements.push(
      <Element
        structure={element}
        onUpdate={handleUpdateElement}
        onDelete={handleDeleteElement}
        key={element.id}
      />
    );
  });

  return (
    <div className="section">
      <Toolbar>
        <ArrowButtons />
        <DeleteButton onClick={handleDeleteSelf} />
      </Toolbar>
      <Editable size={2} onChange={handleChangeHeader}>{structure.header}</Editable>
      {elements}
      <br />
      <button onClick={handleClickAddElement}><b>הוסף רכיב</b></button>
    </div>
  );
}

export default Section;
