import React from 'react';
import Editable from './Editable';


export default function ElementNumberInput({ structure }) {
  
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
              <input type="number" />
            </td>
          </tr>
          <tr>
            <td>
              <label>מקסימום:</label>
            </td>
            <td></td>
            <td>
              <input type="number" />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
