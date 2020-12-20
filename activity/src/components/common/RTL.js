import React from 'react';
import PropTypes from 'prop-types';

import { StylesProvider, ThemeProvider, jssPreset } from '@material-ui/core/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';

/**
 * Applies RTL styles and flips the page layout horizontally, if active
 */
function RTL({ active, children }) {
  if (active) {
    document.body.setAttribute('dir', 'rtl');
    document.body.style.textAlign = 'right';
  }

  if (active === undefined) { active = true; }
  return (active ) ? (
    <ThemeProvider theme={(outerTheme) => ({ ...outerTheme, direction: 'rtl' })}>
      <StylesProvider jss={create({ plugins: [...jssPreset().plugins, rtl()] })}>
        {children}
      </StylesProvider>
    </ThemeProvider>
  ) : (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
}

RTL.propTypes = {
  /** Whether to apply RTL styling */
  active: PropTypes.bool,
  /** Elements to be affected */
  children: PropTypes.node,
};

export default RTL;
