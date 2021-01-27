import { createMuiTheme } from '@material-ui/core';

/**
 * A global theme that defines the colors and the spacing dimension
 * This theme will be used every time we use Material UI's `makeStyles` function
 */
export default createMuiTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#ff8f00',
      contrastText: '#ffffff',
    },
    background: {
      default: '#E8EAF6',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  spacing: 8,
});
