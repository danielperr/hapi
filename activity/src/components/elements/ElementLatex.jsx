import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import katex from 'katex';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  latexField: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(-2, 0, 0),
    fontSize: '16px',
    direction: 'ltr',
    flip: false,
  },
}));

function ElementLatex({ latex }) {
  const classes = useStyles();

  const latexFieldRef = useRef();

  useEffect(() => {
    katex.render(latex, latexFieldRef.current, { throwOnError: false, displayMode: true });
  }, []);

  return <div ref={latexFieldRef} className={classes.latexField} />;
}

ElementLatex.propTypes = {
  latex: PropTypes.string,
};

ElementLatex.defaultProps = {
  latex: '',
};

export default ElementLatex;
