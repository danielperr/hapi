import React from 'react';

import { Box, Fab, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  checkAllBtnContainer: {
    marginBottom: theme.spacing(2),
  },
  checkAllBtn: {
    fontWeight: 'bold',
    backgroundColor: '#ff8f00',
    color: 'white',
  },
  checkTypography: {
    margin: theme.spacing(0, 1),
    fontWeight: 'bold',
  },
}));

function CheckAllButton({ onClick }) {
  const classes = useStyles();

  return (
    <Box className={classes.checkAllBtnContainer}>
      <Fab
        variant="extended"
        className={classes.checkAllBtn}
        onClick={onClick}
      >
        <CheckIcon />
        <Typography className={classes.checkTypography}>
          Check All
        </Typography>
      </Fab>
    </Box>
  );
}

CheckAllButton.propTypes = {
  onClick: PropTypes.func,
};

CheckAllButton.defaultProps = {
  onClick: () => {},
};

export default CheckAllButton;
