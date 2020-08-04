import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, FormLabel, TextField, FormHelperText, Divider } from '@material-ui/core';
import NumberFormat from 'react-number-format';


const useStyles = makeStyles(theme => ({
  textField: {
    textAlign: 'left',
  },
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
export function ElementNumberInput({ text, error, helperText, showHelperText, answer, onAnswer, id }) {
  const classes = useStyles();
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  let [value, setValue] = React.useState(answer);

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
          setSeconds((seconds) => seconds + 1);
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
      fullWidth={true}
      className={classes.formControl}
    >
      <FormLabel component="legend">
        {text}
      </FormLabel>
      <br />
      <TextField
        dir="ltr"
        onChange={handleChange}
        defaultValue={answer}
        variant="outlined"
        inputProps={{min: 0, style: { textAlign: 'center' }}}
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
        className={classes.textField}
      />
      <FormHelperText className={classes.formHelperText}>
        {helperText}
      </FormHelperText>
      <Divider className={classes.divider} />
    </FormControl>
  );
}


function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
}
