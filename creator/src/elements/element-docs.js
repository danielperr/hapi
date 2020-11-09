import React from 'react';

import produce from "immer";
import styled from 'styled-components';

import Editable from '../shared/editable';

function ElementDocs({ structure, onUpdate }) {

  const handleChange = (text) => {
    onUpdate(produce(structure, (newStructure) => {
        newStructure.src = text;
    }));
  };

  return (
    <React.Fragment>
      <Editable onChange={handleChange}>{structure.src}</Editable>
      <br />
      <br />
      <Wrapper>
        <StyledIframe
          className="override"
          src={structure.src}
        />
      </Wrapper>
    </React.Fragment>
  );
}

const Wrapper = styled.div`
  position: relative;
  padding-bottom: 15%;
  padding-top: 25px;
  height: 0;
`;

const StyledIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
`;

export default ElementDocs;
