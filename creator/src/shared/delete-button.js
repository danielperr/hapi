import React from 'react';

import styled from 'styled-components';

function DeleteButton({ onClick, className }) {
  return (
    <StyledButton
      className={`delete-button dangerous ${className || ""}`}
      onClick={onClick}
    >
      <StyledIcon></StyledIcon>
      <StyledBold>מחק</StyledBold>
    </StyledButton>);
}

const StyledButton = styled.button`
  padding: 2px 8px 2px 12px;
  border-radius: 16px;
  float: left;
`;

const StyledBold = styled.b`
  margin-right: 2px;
`;

const StyledIcon = styled.i`
  &:before, &:after {
    display: inline-block;
    content: ' ';
    width: 8px;
    height: 2px;
    position: relative;
    bottom: 3px;
    background-color: #744;
  }

  &:before {
    right: 4px;
    border-width: 0 0 0 1px;
    transform: rotate(45deg);
  }

  &:after {
    left: 4px;
    border-width: 0 1px 0 0;
    transform: rotate(-45deg);
  }
`;

export default DeleteButton;
