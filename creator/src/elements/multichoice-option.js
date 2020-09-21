import React from 'react';

import produce from 'immer';
import styled from 'styled-components';

import Editable from '../shared/editable';
import HorizontalBar from '../shared/horizontal-bar';
import DeleteButton from '../shared/delete-button';
import ArrowButtons from '../shared/arrow-buttons';

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
    <StyledOptionDiv>
      <HorizontalBar>
        <ArrowButtons />
        <div>
          <StyledOptionInput
            type="radio"
            name={name}
            value={id}
            id={id} 
            select={select.toString()}
            onChange={handleChangeIsCorrect}
          />
          <StyledOptionLabel htmlFor={id}>תשובה נכונה?</StyledOptionLabel>
        </div>
        <DeleteButton onClick={handleClickDelete} />
      </HorizontalBar>
      <Editable onChange={handleChangeText}>{text}</Editable>
    </StyledOptionDiv>
  );
}

const StyledOptionDiv = styled.div`
  border-right: 8px solid rgb(143, 143, 143);
  border-radius: 8px;
  margin-top: 16px;
  padding: 16px;
  background-color: rgba(143, 143, 143, 0.15);
`;

const StyledOptionInput = styled.input`
  position: relative;
  top: 2px;
  cursor: pointer;
`;

const StyledOptionLabel = styled.label`
  background-color: white;
  border: 1px solid #707070;
  border-radius: 18px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13.333px;
  padding: 2px 6px;
  padding-left: 8px;
  cursor: pointer;
`;

export default MultiChoiceOption;
