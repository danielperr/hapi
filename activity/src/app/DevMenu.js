import React, { useRef, useState } from 'react';

import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(2),
    direction: 'ltr',
    flip: false,
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  textarea: {
    margin: theme.spacing(1, 0, 2),
    whiteSpace: 'pre',
    overflowWrap: 'normal',
    overflowX: 'scroll',
  },
  button: {
    margin: theme.spacing(1, 0, 0),
  }
}));

function DevMenu({ open, anchorEl, onClose }) {
  const classes = useStyles();

  const initialStructureText = JSON.stringify(JSON.parse(localStorage.getItem('devmode-structure')), null, 2);
  const [structureText, setStructureText] = useState(initialStructureText);
  const structureTextareaRef = useRef(null);

  const handleChangeStructureText = (e) => {
    setStructureText(e.target.value);
  };

  const handleSaveStructure = () => {
    localStorage.setItem('devmode-structure', structureText);
    window.location.reload();
  };

  const handlePaste = async () => {
    setStructureText(await window.navigator.clipboard.readText());
  };

  const handleLoadFile = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      setStructureText(reader.result);
    };
    reader.readAsText(document.getElementById('devmode-structure-file').files[0]);
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: -24,
        horizontal: 'center',
      }}
      transitionDuration={{
        appear: 200,
        enter: 200,
        exit: 0,
      }}
    >
      <div className={classes.content}>
        <Typography>Activity structure for testing:</Typography>
        <textarea
          ref={structureTextareaRef}
          value={structureText}
          rows="10"
          cols="50"
          wrap="soft"
          className={classes.textarea}
          onChange={handleChangeStructureText}
        ></textarea>
        <div>
          <label htmlFor="devmode-structure-file">Or from a file: </label>
          <input
            type="file"
            id="devmode-structure-file"
            accept=".txt"
            onChange={handleLoadFile}
          />
        </div>
        <Button
          variant="outlined"
          color="primary"
          onClick={handlePaste}
          className={classes.button}>
            Paste from clipboard
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveStructure}
          className={classes.button}>
            Save structure and refresh
        </Button>
      </div>
    </Popover>
  )
}

export default DevMenu;
