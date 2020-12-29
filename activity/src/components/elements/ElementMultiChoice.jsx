import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import {
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { shuffle } from '../../utils';
import RichLabel from '../common/RichLabel';

const useStyles = makeStyles((theme) => ({
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
  answerLabel: {
    cursor: 'pointer',
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
 <ElementMultiChoice
    text (string): question text / title
    correct (list): correct answers
    incorrect (list): incorrect answers
    error (boolean): whether the answer is incorrect
    showHelperText (boolean): whether the question has been validated (with 'check answers' button)
    answer (string): predefined answer (from loading a saved file)
    onAnswer (function): callback fcn when an answer is selected
    id (string): question id
  />
*/
function ElementMultiChoice({
  id,
  text,
  answer,
  dontShuffle,
  error,
  showHelperText,
  helperText,
  onAnswer,
  // options
  ...props
}) {
  const classes = useStyles();

  // We're using react state to preserve our shuffled options between rerenders
  // eslint-disable-next-line react/destructuring-assignment
  const [options, setOptions] = React.useState(props.options);
  const [isShuffled, setIsShuffled] = React.useState(false);

  const [value, setValue] = React.useState(answer);

  if (!isShuffled) {
    if (!dontShuffle) {
      setOptions(shuffle(options));
    }
    setIsShuffled(true);
  }

  const handleRadioChange = (event) => {
    const selectedOptionId = event.target.value;
    onAnswer(id, selectedOptionId);
    setValue(selectedOptionId);
  };

  return (
    <FormControl
      fullWidth
      component="fieldset"
      error={showHelperText && error}
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
      <RadioGroup
        aria-label="quiz"
        name="quiz"
        value={value}
        onChange={handleRadioChange}
      >
        {options.map((option) => (
          <FormControlLabel
            value={option.id}
            className={classes.formControlLabel}
            control={(
              <Radio checked={!!(answer && option.id === answer)} color="secondary" id={option.id} />
            )}
            label={(
              <RichLabel htmlFor={option.id} className={classes.answerLabel}>
                {option.text}
              </RichLabel>
            )}
            key={option.id}
          />
        ))}
      </RadioGroup>
      <FormHelperText
        className={clsx(
          classes.formHelperText,
          (showHelperText && !error) ? classes.successState : undefined,
        )}
      >
        {helperText}
      </FormHelperText>
      <Divider
        className={classes.divider}
      />
    </FormControl>
  );
}

ElementMultiChoice.propTypes = {
  /** id of the question element */
  id: PropTypes.string.isRequired,
  /** Question text */
  text: PropTypes.string,
  /** List of the choosable options of the question */
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string,
  })),
  /** Preselected answer (from the last save for example),
    this is a string with the id of the selected option. */
  answer: PropTypes.string,
  /** Whether to NOT shuffle the options (given from the structure) in random order */
  dontShuffle: PropTypes.bool,
  /** Whether to mark this question as problematic (i.e. mark it in red) */
  error: PropTypes.bool,
  /** Whether to show the feedback text beneath the question */
  showHelperText: PropTypes.bool,
  /** The feedback text to display beneath the question */
  helperText: PropTypes.string,
  /** Callback event for when the user selects an answer.
   * Function args: onAnswer(
   *   id of the question (str),
   *   id of the selected answer (str)
   * )
  */
  onAnswer: PropTypes.func,
};

ElementMultiChoice.defaultProps = {
  text: '',
  options: [],
  answer: '',
  dontShuffle: false,
  error: false,
  showHelperText: false,
  helperText: ' ',
  onAnswer: () => {},
};

export default ElementMultiChoice;
