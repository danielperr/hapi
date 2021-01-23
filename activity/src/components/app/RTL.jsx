import React from 'react';

import { StylesProvider, ThemeProvider, jssPreset } from '@material-ui/core/styles';
import { create } from 'jss';
import PropTypes from 'prop-types';
import rtl from 'jss-rtl';

/**
 * Applies RTL styles and flips the page layout horizontally, if active
 */
function RTL({ active, children }) {
  if (active) {
    document.body.setAttribute('dir', 'rtl');
    document.body.style.textAlign = 'right';
  }

  return (active) ? (
    <ThemeProvider theme={(outerTheme) => ({ ...outerTheme, direction: 'rtl' })}>
      <StylesProvider jss={create({ plugins: [...jssPreset().plugins, rtl()] })}>
        {children}
      </StylesProvider>
    </ThemeProvider>
  ) : (
    <>
      {children}
    </>
  );
}

RTL.propTypes = {
  /** Whether to apply RTL styling */
  active: PropTypes.bool,
  /** Elements to be affected */
  children: PropTypes.node.isRequired,
};

RTL.defaultProps = {
  active: true,
};

export default RTL;
