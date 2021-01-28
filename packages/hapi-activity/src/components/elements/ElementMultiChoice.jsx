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

import { feedbackType } from '../../../../common/prop-types';
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

/**
 * A question element with selectable options from a list
 */
function ElementMultiChoice({
  structure,
  feedback,
  answer,
  onAnswer,
}) {
  const {
    text,
    dontShuffle,
  } = structure;
  const {
    error,
    showHelperText,
    helperText,
  } = feedback;

  const classes = useStyles();

  // We're using react state to preserve our shuffled options between rerenders
  // eslint-disable-next-line react/destructuring-assignment
  const [options, setOptions] = React.useState(structure.options);
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
    onAnswer(selectedOptionId);
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
  structure: PropTypes.shape({
    /** id of the question element */
    id: PropTypes.string.isRequired,
    /** Question text */
    text: PropTypes.string,
    /** List of the choosable options of the question */
    options: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string,
    })),
    /** Whether to NOT shuffle the options (given from the structure) in random order */
    dontShuffle: PropTypes.bool,
  }).isRequired,
  feedback: feedbackType.isRequired,
  answer: PropTypes.string.isRequired,
  onAnswer: PropTypes.func.isRequired,
};

export default ElementMultiChoice;
