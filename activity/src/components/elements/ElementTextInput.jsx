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

import RichLabel from '../common/RichLabel';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
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

/*
 <ElementTextInput
    text (string): question / title
    multiline (string): is multiline or not if not undefined
    error (boolean): whether the answer is incorrect
    showHelperText (boolean): whether the question has been validated ('check answers' button)
    answer (string): filled text
    onAnswer (function): callback fcn when an answer is filled
    id (string): question id
  />
*/
function ElementTextInput({
  id,
  text,
  answer,
  onAnswer,
  multiline,
  error,
  showHelperText,
  helperText,
}) {
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
        onAnswer(id, value);
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
      className={classes.formControl}
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
  id: PropTypes.string.isRequired,
  text: PropTypes.string,
  answer: PropTypes.string,
  onAnswer: PropTypes.func,
  multiline: PropTypes.bool,
  error: PropTypes.bool,
  showHelperText: PropTypes.bool,
  helperText: PropTypes.string,
};

ElementTextInput.defaultProps = {
  text: '',
  answer: '',
  onAnswer: () => {},
  multiline: false,
  error: false,
  showHelperText: false,
  helperText: '',
};

export default ElementTextInput;
