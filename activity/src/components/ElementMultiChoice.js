import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Divider from '@material-ui/core/Divider';
import { shuffle } from '../utils';
import { RichLabel } from './RichLabel';
import clsx from "clsx";

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
    "&$successState,&:active": {
      color: theme.palette.success.main,
    },
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
  divider: {
    marginBottom: theme.spacing(4),
  },
  answerLabel: {
    cursor: 'pointer',
  },
  questionLabel: {
    color: theme.palette.text.secondary,
    "&$errorState,&:active": {
      color: theme.palette.error.main,
    },
    "&$successState,&:active": {
      color: theme.palette.success.main,
    },
  },
  errorState: {},
  successState: {},
}));


/*
 <ElementMultiChoice
    text (string): question text / title
    correct (list): correct answers
    incorrect (list): incorrect answers
    error (boolean): whether the answer is incorrect
    showHelperText (boolean): whether the question has been validated (f.e using a 'check answers' button)
    answer (string): predefined answer (from loading a saved file)
    onAnswer (function): callback fcn when an answer is selected
    id (string): question id
  />
*/
export function ElementMultiChoice(props) {
  const classes = useStyles();
  const [options, setOptions] = React.useState(props.options);
  let [value, setValue] = React.useState('');
  const [isShuffled, setIsShuffled] = React.useState(false);
  value = props.answer;
  let optionDoms = [];

  if (!isShuffled) {
    if (!props.dontShuffle) {
      setOptions(shuffle(options));
    }
    setIsShuffled(true);
  }

  options.forEach(option => {
    optionDoms.push(
      <FormControlLabel
        value={option.id}
        className={classes.formControlLabel}
        control={
          <Radio
            checked={ !!(props.answer && option.id === props.answer) }
            color="secondary"
            id={option.id}
          />
        }
        label={
          <RichLabel
            htmlFor={option.id}
            className={classes.answerLabel}
          >
            {option.text}
          </RichLabel>
        }
        key={option.id}
      />
    )
  });

  const handleRadioChange = (event) => {
    const selectedOptionId = event.target.value
    props.onAnswer(props.id, selectedOptionId);
    setValue(selectedOptionId);
  };

  return (
    <FormControl
      fullWidth={true}
      component="fieldset"
      error={props.showHelperText && props.error}
      className={props.formControl}
    >
      <RichLabel
        className={clsx(
          classes.questionLabel,
          (props.showHelperText && props.error) ? classes.errorState : undefined,
        )}
      >
        {props.text}
      </RichLabel>
      <br />
      <RadioGroup
        aria-label="quiz"
        name="quiz"
        value={value}
        onChange={handleRadioChange}
      >
        {optionDoms}
      </RadioGroup>
      <FormHelperText
        className={clsx(
          classes.formHelperText,
          (props.showHelperText && !props.error) ? classes.successState : undefined,
        )}
      >
        {props.helperText}
      </FormHelperText>
      <Divider
        className={classes.divider}
      />
    </FormControl>
  );
}

