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


.multichoice-option {
  border-right: 8px solid rgb(143, 143, 143);
  border-radius: 8px;
  margin-top: 16px;
  padding: 16px;
  background-color: rgba(143, 143, 143, 0.15);
}

.multichoice-option-radio label {
  background-color: white;
  border: 1px solid #707070;
  border-radius: 18px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13.333px;
  padding: 2px 6px;
  padding-left: 8px;
  cursor: pointer;
}

.multichoice-option-radio input {
  position: relative;
  top: 2px;
  cursor: pointer;
}


export default MultiChoiceOption;
