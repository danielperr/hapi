import React from 'react';
import produce from 'immer';
import Element from './element';
import Editable from '../shared/editable';
import ArrowButtons from '../components/arrow-buttons';
import DeleteButton from '../components/delete-button';
import { DEFAULT_ELEMENT } from '../shared/constants';
import { makeid } from '../shared/utils';
import './section.css';
import Toolbar from '../components/toolbar';
import styled from 'styled-components';

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

const StyledSectionDiv = styled.div`
  margin-top: 32px;
  /* margin-bottom: 64px; */
  padding: 32px;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
`;

const StyledMedia = styled.div`


`;
@media (max-width: 900px) {
  .section {
    border-radius: 0;
  }
}


export default Section;
