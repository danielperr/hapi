import React, { useState } from 'react';

import { Paper } from '@material-ui/core';

function FocusAwarePaper(props) {
  const { children, elevation } = props;

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    console.log('focus')
  };

  const handleBlur = () => {
    setIsFocused(false);
    console.log('blur')
  };

  return (
    <Paper
      // variant={isFocused ? 'elevation' : 'outlined'}
      elevation={isFocused ? 4 : 0}
      {...props}
    >
      <div
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {children}
      </div>
    </Paper>
  );
}

export default FocusAwarePaper;
