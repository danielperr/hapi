import React from 'react';
import produce from 'immer';

import Editable from '../editable';
import './element-number-input.css';

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
    <>
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
              <input
                type="number"
                className="element-number-input"
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
              <input
                type="number"
                className="element-number-input"
                onChange={handleChangeMax}
                value={structure.max}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default ElementNumberInput;
