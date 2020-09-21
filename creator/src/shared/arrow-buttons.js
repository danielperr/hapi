import React from 'react';

import styled from 'styled-components';

function ArrowButtons({ onClickUp, onClickDown }) {
  return (
    <StyledWrapperDiv>
      <StyledUpButton onClick={onClickUp}>
        <StyledUpArrow></StyledUpArrow>
      </StyledUpButton>
      
      <StyledDownButton onClick={onClickDown}>
        <StyledDownArrow></StyledDownArrow>
      </StyledDownButton>
    </StyledWrapperDiv>
  );
}

const StyledWrapperDiv = styled.div`
  display: inline;
  border-radius: 50%;
  overflow: hidden;
`;

const StyledUpButton = styled.button`
  border-radius: 0 12px 12px 0;
`;

const StyledDownButton = styled.button`
  border-radius: 50% 0 0 50%;
`;

const StyledArrow = styled.i`
  border: solid black;
  border-width: 0 1px 1px 0;
  display: inline-block;
  padding: 2px;
`;

const StyledUpArrow = styled(StyledArrow)`
  position: relative;
  right: 1px;
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
`;

const StyledDownArrow = styled(StyledArrow)`
  position: relative;
  left: 1px;
  bottom: 3px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
`;

export default ArrowButtons;
