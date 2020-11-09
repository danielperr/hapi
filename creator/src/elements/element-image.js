import React from "react";

import produce from "immer";
import styled from 'styled-components';

import Editable from "../shared/editable";

function ElementImage({ structure, onUpdate }) {
  const handleChange = (text) => {
    onUpdate(
      produce(structure, (newStructure) => {
        newStructure.src = text;
      })
    );
  };

  return (
    <React.Fragment>
      <Editable onChange={handleChange}>{structure.src}</Editable>
      <br />
      <br />
      <StyledImage
        src={structure.src}
        onError="this.onerror=null; this.src='https://www.0404.co.il/wp-content/uploads/2019/10/valley-3916972__480.jpg';" 
      />
    </React.Fragment>
  );
}

const StyledImage = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 70%;
`;

export default ElementImage;
