import React, { useState } from 'react';

import { Paper } from '@material-ui/core';

function FocusAwarePaper(props) {
  const { children, elevation } = props;

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <Paper
      // variant={isFocused ? 'elevation' : 'outlined'}
      elevation={isFocused ? 4 : 1}
      // elevation={4}
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
