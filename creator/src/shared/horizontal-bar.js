import React from 'react';

import styled from 'styled-components';

function HorizontalBar({ children }) {
  const childrenWithClases = [];
  children.forEach((child, index) => {
    if (React.isValidElement(child)) {
      childrenWithClases.push(React.cloneElement(child, {
        style: {
          marginRight: '6px',
          borderRadius: '12px',
          display: 'inline',
        },
        key: `horizBarChild${index}`,
      }));
    }
  });

  return <StyledBar>{childrenWithClases}</StyledBar>;
}

const StyledBar = styled.div`
  margin-bottom: 16px;
`;

export default HorizontalBar;
