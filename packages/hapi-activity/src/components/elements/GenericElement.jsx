/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import { elementStructureType, feedbackType } from '../../../../common/prop-types';
import { strings } from '../../localization';
import ElementDocs from './ElementDocs';
// import ElementIfigure from './ElementIfigure';
import ElementImage from './ElementImage';
import ElementLabel from './ElementLabel';
import ElementMultiChoice from './ElementMultiChoice';
import ElementNumberInput from './ElementNumberInput';
import ElementTextInput from './ElementTextInput';
import ElementYoutube from './ElementYoutube';
import ElementLatex from './ElementLatex';

const useStyles = makeStyles((theme) => ({
  element: {
    margin: theme.spacing(4, 0),
  },
}));

/**
 * Renders the required element according to its type.
 */
function GenericElement({
  structure,
  feedback,
  answer,
  onAnswer,
}) {
  const classes = useStyles();

  // An answer event we get from the element and pass it up to the section.
  // Here we add the id of the element, so the section knows which question is answered.
  const handleAnswer = (a) => {
    onAnswer(structure.id, a);
  };

  // Props to pass when the element is a fillable element, with feedback properties and answers
  const questionProps = {
    structure,
    feedback,
    answer,
    onAnswer: handleAnswer,
  };

  let elementToRender;
  switch (structure.type) {
    case 'label':
      elementToRender = <ElementLabel structure={structure} />;
      break;
    case 'image':
      elementToRender = <ElementImage structure={structure} />;
      break;
    case 'docs':
      elementToRender = <ElementDocs structure={structure} />;
      break;
    case 'youtube':
      elementToRender = <ElementYoutube structure={structure} />;
      break;
    case 'latex':
      elementToRender = <ElementLatex structure={structure} />;
      break;
    case 'text-input':
      elementToRender = <ElementTextInput {...questionProps} />;
      break;
    case 'multi-choice':
      elementToRender = <ElementMultiChoice {...questionProps} />;
      break;
    case 'number-input':
      elementToRender = <ElementNumberInput {...questionProps} />;
      break;
    default:
      elementToRender = <span>{strings.unknownElement}</span>;
      break;
  }

  return (
    <div className={classes.element} id={structure.id}>
      {elementToRender}
    </div>
  );
}

GenericElement.propTypes = {
  /** Structure object of the element */
  structure: elementStructureType,
  /** Feedback object */
  feedback: feedbackType,
  /** Current state's selected answer */
  answer: PropTypes.string,
  /** Event for when the user selects an answer */
  onAnswer: PropTypes.func,
};

GenericElement.defaultProps = {
  structure: {},
  feedback: {},
  answer: '',
  onAnswer: () => {},
};

export default GenericElement;
