import React from 'react';

import { Modal, Fade, Backdrop, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'fixed',
    top: theme.spacing(2),
    right: theme.spacing(2),
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: '#DDDDDD',
    },
  },
  iframe: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    width: '90%',
    height: '90%',
    border: 'none',
    transform: 'translate(-50%, -50%)',
  },
}));

const IFRAME_ID = 'preview-iframe';

function PreviewWindow({ open, onClose, structure, activityUrl }) {
  const classes = useStyles();

  const handleIframeLoad = () => {
    const previewIframe = document.getElementById(IFRAME_ID);
    previewIframe.contentWindow.postMessage({
      message: 'getContent',
      value: {
        structure,
        answers: {},
      },
    }, '*');
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 200,
      }}
    >
      <Fade in={open}>
        <div>
          <IconButton onClick={onClose} className={classes.closeButton}>
            <CloseIcon />
          </IconButton>
          <iframe
            src={activityUrl}
            title="preview"
            id={IFRAME_ID}
            className={classes.iframe}
            onLoad={handleIframeLoad}
          />
        </div>
      </Fade>
    </Modal>
  );
}

export default PreviewWindow;
