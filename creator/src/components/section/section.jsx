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

function Section({ structure, onUpdate, onDelete, onMoveUp, onMoveDown }) {
  
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

  const handleMoveUpElement = (elementId) => {
    onUpdate(produce(structure, newStructure => {
      let o = newStructure.elements;
      let i = o.map((e) => { return e.id }).indexOf(elementId);
      if (i > 0) {
        [o[i], o[i-1]] = [o[i-1], o[i]];
      }
    }));
  };

  const handleMoveDownElement = (elementId) => {
    onUpdate(produce(structure, newStructure => {
      let o = newStructure.elements;
      let i = o.map((e) => { return e.id }).indexOf(elementId);
      if (i >= 0 && i < o.length - 1) {
        [o[i], o[i+1]] = [o[i+1], o[i]];
      }
    }));
  };

  const handleDeleteSelf = () => {
    onDelete(structure.id);
  };

  const handleClickUp = () => {
    onMoveUp(structure.id);
  };

  const handleClickDown = () => {
    onMoveDown(structure.id);
  };

  const elements = [];
  structure.elements.forEach(element => {
    elements.push(
      <Element
        structure={element}
        onUpdate={handleUpdateElement}
        onDelete={handleDeleteElement}
        onMoveUp={handleMoveUpElement}
        onMoveDown={handleMoveDownElement}
        key={element.id}
      />
    );
  });

  return (
    <div className="section">
      <Toolbar>
        <ArrowButtons onClickUp={handleClickUp} onClickDown={handleClickDown} />
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
