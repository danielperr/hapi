import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';

import { strings } from '../../localization';

const useStyles = makeStyles(() => ({
  root: {
    background: '#4caf50',
  },
}));

/**
 * Snackbar = A small popup box at the bottom
 * Success snackbar is a green snackbar with a checkmark symbol
 */
function SuccessSnackbar({ open, onClose, rtl }) {
  const classes = useStyles();

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose();
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: rtl ? 'right' : 'left',
      }}
      ContentProps={{
        classes: {
          root: classes.root,
        },
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={strings.activityComplete}
      action={(
        <>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      )}
    />
  );
}

SuccessSnackbar.propTypes = {
  /** Whether the snackbar is shown in the current state */
  open: PropTypes.bool.isRequired,
  /** Function that gets called when the user presses on the x button */
  onClose: PropTypes.func.isRequired,
  /** Whether the app is in RTL styling or not */
  rtl: PropTypes.bool,
};

SuccessSnackbar.defaultProps = {
  rtl: false,
};

export default SuccessSnackbar;
