import React from 'react';

import { Box, Fab, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import PropTypes from 'prop-types';

import { strings } from '../../localization';

const useStyles = makeStyles((theme) => ({
  checkAllBtnContainer: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  checkAllBtn: {
    fontWeight: 'bold',
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
        color="secondary"
        className={classes.checkAllBtn}
        onClick={onClick}
      >
        <CheckIcon />
        <Typography className={classes.checkTypography}>
          {strings.actionCheckAll}
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
