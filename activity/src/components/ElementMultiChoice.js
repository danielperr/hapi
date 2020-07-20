import React from 'react';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
}));

export function ElementMultiChoice(props) {
  const classes = useStyles();
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState(' ');
  const [answers, setAnswers] = React.useState([...props.correct, ...props.incorrect]);
  
  let [value, setValue] = React.useState('');
  let answerDOMs = [];

  // This is very stupid but it works.
  value = props.answer;

  useEffect(() => {
    setAnswers(shuffle(answers));
  }, [])

  answers.forEach(answer => {
    answerDOMs.push(
      <FormControlLabel
        value={answer.id}
        className={classes.formControlLabel}
        control={<Radio checked={!!(props.answer && answer.id == props.answer)} id={answer.id}/>}
        label={<RichLabel htmlFor={answer.id} className={classes.richLabel}>{answer.text}</RichLabel>}
        key={answer.id}
      />
    )
  });
  
  const correctIds = props.correct.map(answer => {
    return answer.id;
  });

  const handleRadioChange = (event) => {
    const selectedAnswerId = event.target.value
    props.onAnswer(props.id, selectedAnswerId);
    setValue(selectedAnswerId);
    setHelperText(' ');
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (correctIds.includes(value)) {
      setHelperText('כל הכבוד');
      setError(false);
    } else {
      setHelperText('תשובה לא נכונה');
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl component="fieldset" error={ error } className={ classes.formControl }>
        <FormLabel component="legend">{ props.text }</FormLabel>
        <br />
        <RadioGroup aria-label="quiz" name="quiz" value={ value } onChange={ handleRadioChange }>
          { answerDOMs }
        </RadioGroup>
        <FormHelperText className={ classes.formHelperText }>
          { helperText }
        </FormHelperText>
        <Button type="submit" variant="outlined" color="primary" className={ classes.button }>
          Check Answer
        </Button>
      </FormControl>
    </form>
  );
}

