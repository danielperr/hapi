import React from 'react';
import Editable from '../editable';
import './element-number-input.css';

function ElementNumberInput({ structure }) {
  
  return (
    <>
      <Editable>{structure.text}</Editable>
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
              <input type="number" className="element-number-input" />
            </td>
          </tr>
          <tr>
            <td>
              <label>מקסימום:</label>
            </td>
            <td></td>
            <td>
              <input type="number" className="element-number-input" />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default ElementNumberInput;
