import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import {
  Divider,
  FormControl,
  FormHelperText,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { feedbackType } from '../../../../common/prop-types';
import RichLabel from '../common/RichLabel';

const useStyles = makeStyles((theme) => ({
  formControlLabel: {
    margin: -theme.spacing(0.25),
  },
  formHelperText: {
    margin: theme.spacing(1, 1, 2, 0),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
  divider: {
    marginBottom: theme.spacing(4),
  },
  questionLabel: {
    color: theme.palette.text.secondary,
    '&$errorState,&:active': {
      color: theme.palette.error.main,
    },
    '&$successState,&:active': {
      color: theme.palette.success.main,
    },
  },
  errorState: {},
  successState: {},
}));

/**
 * A question element that accepts text as an answer.
 */
function ElementTextInput({
  structure,
  feedback,
  answer,
  onAnswer,
}) {
  const {
    text,
    multiline,
  } = structure;
  const {
    error,
    showHelperText,
    helperText,
  } = feedback;

  const classes = useStyles();

  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = React.useState(answer);

  const reset = () => {
    setSeconds(0);
    setIsActive(false);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    setSeconds(0);
    setIsActive(true);
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      if (seconds >= 2) {
        onAnswer(value);
        reset();
      } else {
        interval = setInterval(() => {
          setSeconds(seconds + 1);
        }, 100);
      }
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <FormControl
      error={showHelperText && error}
      noValidate
      autoComplete="off"
      fullWidth
    >
      <RichLabel
        className={clsx(
          classes.questionLabel,
          (showHelperText && error) ? classes.errorState : undefined,
        )}
      >
        {text}
      </RichLabel>
      <br />
      <TextField
        onChange={handleChange}
        defaultValue={answer}
        multiline={!!multiline}
        inputProps={{ maxLength: 85 }}
        rows={6}
        fullWidth
        variant="outlined"
      />
      <FormHelperText className={classes.formHelperText}>
        {helperText}
      </FormHelperText>
      <Divider className={classes.divider} />
    </FormControl>
  );
}

ElementTextInput.propTypes = {
  structure: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string,
    multiline: PropTypes.bool,
  }).isRequired,
  feedback: feedbackType.isRequired,
  answer: PropTypes.string.isRequired,
  onAnswer: PropTypes.func.isRequired,
};

export default ElementTextInput;
