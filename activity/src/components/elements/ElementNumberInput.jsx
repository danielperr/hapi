import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line import/no-extraneous-dependencies
import NumberFormat from 'react-number-format';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  TextField,
  FormHelperText,
  Divider,
} from '@material-ui/core';

import RichLabel from '../common/RichLabel';

const useStyles = makeStyles((theme) => ({
  textField: {
    textAlign: 'left',
  },
  formControlLabel: {
    margin: -theme.spacing(0.25),
  },
  formHelperText: {
    margin: theme.spacing(1, 1, 2, 0),
    '&$successState,&:active': {
      color: theme.palette.success.main,
    },
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
 * ElementNumberInput
 * Input that accepts numbers, can be checked with variable precision
 *
 * text (String): question title
 * error (Boolean): whether the answer is incorrect
 * helperText (String): form helper text (status text)
 * showHelperText (Boolean): whether to show the helper text
 * answer (Number): current answer for this question
 * onAnswer (Function): callback fcn for when the user changes the answer
 * suffix (String)
 */
function ElementNumberInput({
  text,
  error,
  helperText,
  showHelperText,
  answer,
  onAnswer,
  id,
}) {
  const classes = useStyles();

  const handleChange = (e) => {
    onAnswer(id, e.target.value);
  };

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
          showHelperText && error ? classes.errorState : undefined,
        )}
      >
        {text}
      </RichLabel>
      <br />
      <TextField
        dir="ltr"
        onChange={handleChange}
        defaultValue={answer}
        variant="outlined"
        inputProps={{ min: 0, style: { textAlign: 'left' }, inputComponent: NumberFormatCustom }}
        className={classes.textField}
      />
      <FormHelperText
        className={clsx(
          classes.formHelperText,
          showHelperText && !error ? classes.successState : undefined,
        )}
      >
        {helperText}
      </FormHelperText>
      <Divider className={classes.divider} />
    </FormControl>
  );
}

ElementNumberInput.propTypes = {
  text: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  showHelperText: PropTypes.bool,
  answer: PropTypes.string,
  onAnswer: PropTypes.func,
  id: PropTypes.string.isRequired,
};

ElementNumberInput.defaultProps = {
  text: '',
  error: false,
  helperText: '',
  showHelperText: false,
  answer: '',
  onAnswer: () => {},
};

export default ElementNumberInput;

function NumberFormatCustom({
  inputRef,
  onChange,
  name,
  ...props
}) {
  return (
    <NumberFormat
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  onChange: PropTypes.func,
  name: PropTypes.string,
};

NumberFormatCustom.defaultProps = {
  inputRef: null,
  onChange: () => {},
  name: '',
};
