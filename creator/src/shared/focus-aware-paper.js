import React, { useState } from 'react';

import { Paper } from '@material-ui/core';

function FocusAwarePaper(props) {
  const { children, isDragging } = props;

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  let elevation = 1;
  if (isFocused) { elevation = 4 }
  if (isDragging) { elevation = 8 }

  return (
    <Paper
      elevation={elevation}
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
