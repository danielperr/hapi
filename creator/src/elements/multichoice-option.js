import React, { useState } from 'react';

import produce from 'immer';

import { Box, FormControl, FormControlLabel, IconButton, Radio, RadioGroup, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  horizontalBar: {
    marginBottom: theme.spacing(-0.5),
    marginRight: theme.spacing(-2),
    marginLeft: theme.spacing(-1),
    display: 'flex',
    flexDirection: 'row',
    '&:hover .MuiInput-underline:not(.Mui-disabled):before': {
      borderBottom: '1px solid lightgray',
    },
  },
  dragHandle: {
    color: '#BBB',
    display: 'flex',
    alignItems: 'center',
  },
  formControlLabel: {
    marginRight: theme.spacing(-1),
    marginLeft: theme.spacing(1),
    width: '100%',
    '& .MuiTypography-root': { width: '100%' },
  },
  textField: {
    width: '100%',
    '& .MuiInput-underline:before': {
      borderBottom: 'none',
      transition: 'none',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: '1px solid lightgray',
    },
  },
}));

function MultiChoiceOption({ structure, name, checked, onUpdate, onSelectCorrect, onNew, onDestroy }) {
  const classes = useStyles();

  const [hover, setHover] = useState(false);

  const handleChangeText = (e) => {
    const newText = e.target.value;

    onUpdate(produce(structure, newStructure => {
      newStructure.text = newText;
    }));
  };

  const handleChangeIsCorrect = () => {
    onSelectCorrect(structure.id);
  };

  const handleClickDelete = () => {
    onDestroy(structure.id);
  }

  const handleKeyDown = (e) => {
    switch(e.keyCode) {
      case 8:  // backspace
      case 46:  // delete
        if (structure.text === '') {
          onDestroy(structure.id);
        }
      break;
    }
  }

  return (
    <Box
      className={classes.horizontalBar}
      onMouseOver={() => { setHover(true); }}
      onMouseOut={() => { setHover(false); }}
    >
      <Box className={classes.dragHandle} style={{ visibility: 'hidden' }} {/*style={{ visibility: hover ? 'visible' : 'hidden' }}*/...{}} >
        <DragIndicatorIcon fontSize="small" />
      </Box>
      <FormControlLabel
        value={structure.id}
        checked={checked}
        onChange={handleChangeIsCorrect}
        className={classes.formControlLabel}
        control={
          <Radio
            name={name}
            value={structure.id}
          />
        }
        label={
          <TextField
            onChange={handleChangeText}
            value={structure.text}
            placeholder="תשובה ריקה"
            onKeyDown={handleKeyDown}
            className={classes.textField}
          />
        }
      />
      <IconButton onClick={handleClickDelete}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

export default MultiChoiceOption;
