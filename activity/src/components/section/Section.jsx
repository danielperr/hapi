import React from 'react';
import PropTypes from 'prop-types';

import { Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { sectionStructureType, feedbackType } from '../../../../common/types';
import { strings } from '../../localization';
import GenericElement from '../elements/GenericElement';
import SectionHeader from './SectionHeader';

const useStyles = makeStyles((theme) => ({
  sectionPaper: {
    borderRadius: '8px',
    marginBottom: theme.spacing(4),
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
}));

/**
 * Provides an area for placing visuals and interactives.
 * Each section is like a page and divides the activity into pieces.
 */
function Section({
  structure,
  answers,
  elementsFeedback,
  onAnswer,
  onCheck,
}) {
  const classes = useStyles();

  const { id } = structure;

  const checkablesTypes = ['multi-choice', 'number-input'];
  const checkablesAmount = structure.elements.filter(
    (element) => checkablesTypes.includes(element.type),
  ).length;

  /**
   * When the student answers on a question (changes its 'answer' state)
   * @param questionId {String}
   * @param answer {Any}
   */
  const handleAnswer = (questionId, answer) => {
    onAnswer(questionId, answer);
  };

  /**
   * When the student wishes to check this section
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the page from refreshing
    onCheck(id);
  };

  return (
    <Paper
      id={id}
      className={classes.sectionPaper}
    >
      <SectionHeader>{structure.header}</SectionHeader>
      <form
        onSubmit={handleSubmit}
        className="section-elements"
      >
        {structure.elements.map((element) => (
          <GenericElement
            structure={element}
            feedback={elementsFeedback[element.id] || undefined}
            answer={answers[element.id] || undefined}
            onAnswer={handleAnswer}
            key={element.id}
          />
        ))}
        {checkablesAmount > 0 && (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            {strings.actionCheckAnswer}
          </Button>
        )}
      </form>
    </Paper>
  );
}

Section.propTypes = {
  structure: sectionStructureType,
  answers: PropTypes.objectOf(PropTypes.any),
  elementsFeedback: PropTypes.shape({
    x: feedbackType,
  }),
  onAnswer: PropTypes.func,
  onCheck: PropTypes.func,
};

Section.defaultProps = {
  structure: {},
  answers: {},
  elementsFeedback: {},
  onAnswer: () => {},
  onCheck: () => {},
};

export default Section;
