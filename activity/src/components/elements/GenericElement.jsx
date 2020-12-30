/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { elementStructureType, feedbackType } from '../../../../common/types';
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

/**
 * Renders the required element according to its type.
 */
function GenericElement({
  structure,
  feedback,
  answer,
  onAnswer,
}) {
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

  switch (structure.type) {
    case 'label':
      return <ElementLabel structure={structure} />;
    case 'image':
      return <ElementImage structure={structure} />;
    case 'docs':
      return <ElementDocs structure={structure} />;
    case 'youtube':
      return <ElementYoutube structure={structure} />;
    case 'latex':
      return <ElementLatex structure={structure} />;
    case 'text-input':
      return <ElementTextInput {...questionProps} />;
    case 'multi-choice':
      return <ElementMultiChoice {...questionProps} />;
    case 'number-input':
      return <ElementNumberInput {...questionProps} />;
    default:
      return <span>{strings.unknownElement}</span>;
  }
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
