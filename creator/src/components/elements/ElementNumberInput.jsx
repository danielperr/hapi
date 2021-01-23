import React from 'react';

import styled from 'styled-components';
import produce from 'immer';

import Editable from '../common/Editable';

function ElementNumberInput({ structure, onUpdate }) {
  
  const handleChangeText = (text) => {
    onUpdate(produce(structure, newStructure => {
      newStructure.text = text;
    }));
  };

  const handleChangeMin = (e) => {
    const min = e.target.value;
    onUpdate(produce(structure, newStructure => {
      newStructure.min = min;
    }));
  }

  const handleChangeMax = (e) => {
    const max = e.target.value;
    onUpdate(produce(structure, newStructure => {
      newStructure.max = max;
    }));
  }

  return (
    <React.Fragment>
      <Editable onChange={handleChangeText}>{structure.text}</Editable>
      <br /><br />
      <label>טווח תשובה נכונה:</label>
      <table>
        <tbody>
          <tr>
            <td>
              <label>מינימום:</label>
            </td>
            <td></td>
            <td>
              <StyledInput
                type="number"
                value={structure.min}
                onChange={handleChangeMin}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>מקסימום:</label>
            </td>
            <td></td>
            <td>
              <StyledInput
                type="number"
                onChange={handleChangeMax}
                value={structure.max}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
}

const StyledInput = styled.input`
  width: 50px;
`;

export default ElementNumberInput;
