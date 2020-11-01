import React from 'react';

import produce from 'immer';
import styled from 'styled-components';
import { EditableMathField, addStyles } from 'react-mathquill';

import Editable from '../shared/editable';

addStyles();

const StyledEditableMathField = styled(EditableMathField)`
  direction: ltr;
  text-align: center;
  width: 100%;
  margin-bottom: 8px;
  border: 1px dashed lightgray;
  border-radius: 4px;
`;

function ElementLatex({ structure, onUpdate }) {
  const latex = structure.latex || '';
  
  const handleChangeLatex = (latex) => {
    onUpdate(produce(structure, (newStructure) => {
      newStructure.latex = latex;
    }));
  };

  const handleChangeMathField = (mathField) => {
    handleChangeLatex(mathField.latex());
  };

  return (
    <>
      <StyledEditableMathField
        latex={latex}
        onChange={handleChangeMathField}
      />
      <Editable
        directionOverride="ltr"
        onChange={handleChangeLatex}
        config={{
          substituteTextarea: () => {
            const textarea = document.createElement('textarea');
            textarea.setAttribute('placeholder', 'LaTeX');
            return textarea;
          }
        }}
      >
        {latex}
      </Editable>
    </>
  );
}

export default ElementLatex;
