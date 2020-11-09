
import React from 'react';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset, ThemeProvider } from '@material-ui/core/styles';

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

export default RTL;
