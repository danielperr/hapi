import React from 'react';

import { Fab } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import ScrollTop from '../common/ScrollTop';

function ScrollToTopButton() {
  return (
    // When you click anywhere inside a ScrollTop it scrolls to the top
    <ScrollTop>
      <Fab color="secondary" size="small" aria-label="scroll back to top">
        <KeyboardArrowUpIcon />
      </Fab>
    </ScrollTop>
  );
}

export default ScrollToTopButton;
