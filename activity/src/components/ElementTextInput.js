import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import Divider from "@material-ui/core/Divider";


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  formControlLabel: {
    margin: -theme.spacing(0.25),
  },
  formHelperText: {
    margin: theme.spacing(1, 1, 2, 0),
    textAlign: "right",
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
  richLabel: {
    cursor: "pointer",
  },
  divider: {
    marginBottom: theme.spacing(4),
  },
}));


/*
 <ElementTextInput
    text (string): question / title
    multiline (string): is multiline or not if not undefined
    error (boolean): whether the answer is incorrect
    showHelperText (boolean): whether the question has been validated (f.e using a 'check answers' button)
    answer (string): filled text
    onAnswer (function): callback fcn when an answer is filled
    id (string): question id
  />
*/
export function ElementTextInput(props) {
  const classes = useStyles();

  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  let [value, setValue] = React.useState(props.answer);
  const [isChanged, setIsChanged] = React.useState(false);

  const reset = () => {
    setSeconds(0);
    setIsActive(false);
  };

  const handleChange = (e) => {
    setIsChanged(true);
    setValue(e.target.value);
    setSeconds(0);
    setIsActive(true);
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      if (seconds >= 2) {
        // Pop up a snackbar (Save successfully)
        props.onAnswer(props.id, value);
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
      error={props.showHelperText && props.error} 
      noValidate 
      autoComplete="off" 
      fullWidth={true} 
      className={props.formControl}
    >
      <FormLabel component="legend">
          {props.text}
      </FormLabel>
      <br />
        <TextField
            onChange={handleChange}
            defaultValue={props.answer}
            multiline={!!props.multiline}
            rows={6}
            fullWidth={true}
            variant="outlined"
        />
      <FormHelperText className={classes.formHelperText}>
        {props.helperText}
      </FormHelperText>
      <Divider className={classes.divider} />
    </FormControl>
  );
}
