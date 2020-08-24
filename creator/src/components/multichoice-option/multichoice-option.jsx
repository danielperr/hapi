import React from 'react';
import produce from 'immer';
import Editable from '../editable/editable';
import Toolbar from '../toolbar';
import DeleteButton from '../delete-button';
import ArrowButtons from '../arrow-buttons';
import './multichoice-option.css';

function MultiChoiceOption({ structure, name, select, onUpdate, onSelectCorrect, onDeleteSelf }) {

  const handleChangeText = text => {
    onUpdate(produce(structure, newStructure => {
      newStructure.text = text
    }));
  };

  const handleChangeIsCorrect = e => {
    onSelectCorrect(id);
  };

  const handleClickDelete = () => {
    onDeleteSelf(id);
  }

  const {id, text} = structure;
  return (
    <div className="multichoice-option">
      <Toolbar>
        <ArrowButtons />
        <div className="multichoice-option-radio">
          <input
            type="radio"
            name={name}
            value={id}
            id={id} 
            select={select.toString()}
            onChange={handleChangeIsCorrect}
          />
          <label htmlFor={id}>תשובה נכונה?</label>
        </div>
        <DeleteButton onClick={handleClickDelete} />
      </Toolbar>
      <Editable onChange={handleChangeText}>{text}</Editable>
    </div>
  );
}

export default MultiChoiceOption;
