import React, { useContext } from "react";

import LanguageContext from '../../language-context';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  basicTextArea: {
    backgroundColor: 'transparent',
    border: '1px dashed lightgray',
    borderRadius: '4px',
    padding: theme.spacing(1),
    outline: 'none',
    width: '100%',
    resize: 'vertical',
    fontFamily: "'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    boxSizing: 'border-box',
  }
}));

function Editable({ children, size, onChange, isRich, isHeightFixed, height, directionOverride }) {
  const classes = useStyles();

  const language = useContext(LanguageContext);
  const direction = directionOverride || (language === 'he' ? 'rtl' : 'ltr');

  const handleChange = (e) => {
    if (isRich) {
      onChange(e.getCurrentContent().getPlainText());
    } else {
      onChange(e.target.value);
    }
  };

  const styleOverride = { direction };
  if (isHeightFixed) { styleOverride.resize = 'none'; }
  if (height !== undefined) { styleOverride.height = height; }
  if (size !== undefined) {
    styleOverride.fontWeight = 'bold';
    styleOverride.fontSize = (() => { switch(size) {
      case 1: return '2rem';
      case 2: return '1.5rem';
    }})();
  }

  return (
    <textarea
      value={children}
      className={classes.basicTextArea}
      style={styleOverride}
      onChange={handleChange}
    />
  );
}


export default Editable;
