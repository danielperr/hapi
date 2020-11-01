import React from 'react';

import { addStyles, StaticMathField } from 'react-mathquill';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

addStyles();

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(-2, 0, 0),
    fontSize: '16px',
  },
}));

function ElementLatex({ latex }) {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <StaticMathField>
        {latex}
      </StaticMathField>
    </Box>
  );
}

export default ElementLatex;
