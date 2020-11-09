import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import makeStyles from '@material-ui/styles/makeStyles';

import { strings } from '../shared/localization';

const useStyles = makeStyles(() => ({
  root: {
    background: "#4caf50",
  },
}));

function SuccessSnackbar({ open, onClose, rtl }) {

  const classes = useStyles();

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    onClose();
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: rtl ? "right" : "left",
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
      action={
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  );

}

export default SuccessSnackbar;
