import React from 'react';
import { useEffect } from 'react';
import { makeStyles, jssPreset } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { shuffle } from '../utils';
import { RichLabel } from './RichLabel';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
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
    cursor: 'pointer',
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));


/*
 <ElementMultiChoice
    text (string): question text / title
    correct (list): correct answers
    incorrect (list): incorrect answers
    error (boolean): whether the answer is incorrect
    showError (boolean): whether the question has been validated (f.e using a 'check answers' button)
    answer (string): predefined answer (from loading a saved file)
    onAnswer (function): callback fcn when an answer is selected
    id (string): question id
  />
*/
export function ElementMultiChoice(props) {
  const classes = useStyles();
  const [answers, setAnswers] = React.useState([...props.correct, ...props.incorrect]);
  let [helperText, setHelperText] = React.useState('')
  let [value, setValue] = React.useState('');
  value = props.answer;
  let answerDOMs = [];

  useEffect(() => {
    setAnswers(shuffle(answers));
  }, [])

  answers.forEach(answer => {
    answerDOMs.push(
      <FormControlLabel
        value={answer.id}
        className={classes.formControlLabel}
        control={
          <Radio
            checked={ !!(props.answer && answer.id == props.answer) }
            id={answer.id}
          />
        }
        label={
          <RichLabel
            htmlFor={answer.id}
            className={classes.richLabel}
          >
            {answer.text}
          </RichLabel>
        }
        key={answer.id}
      />
    )
  });

  const handleRadioChange = (event) => {
    const selectedAnswerId = event.target.value
    props.onAnswer(props.id, selectedAnswerId);
    setValue(selectedAnswerId);
    setHelperText('');
  };

  return (
    <FormControl
      component="fieldset"
      error={props.showError && props.error}
      className={props.formControl}
    >
      <FormLabel
        component="legend"
      >
        {props.text}
      </FormLabel>
      <br />
      <RadioGroup
        aria-label="quiz"
        name="quiz"
        value={value}
        onChange={handleRadioChange}
      >
        {answerDOMs}
      </RadioGroup>
      <FormHelperText>{props.helperText}</FormHelperText>
      <Divider
        className={classes.divider}
      />
    </FormControl>
  );
}

