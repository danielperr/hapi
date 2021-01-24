import { createMuiTheme } from '@material-ui/core/styles';
import { lightBlue } from '@material-ui/core/colors';

export default createMuiTheme({
  direction: 'rtl',
  spacing: 8,
  palette: {
    primary: {
      main: '#4a95d3',
    },
    secondary: lightBlue,
    negative: {
      main: '#cf5959',
    },
    warning: {
      main: '#f9a825',
    },
    error: {
      main: '#f92525',
    },
  },
  overrides: {
    MuiIconButton: {
      root: {
        color: '#333333',
      },
    },
    MuiTouchRipple: {
      rippleVisible: {
        animationDuration: '300ms',
      },
      childLeaving: {
        animationDuration: '300ms',
      },
    },
  },
});
