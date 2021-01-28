import PropTypes from 'prop-types';

const languages = [
  'en',
  'he',
];

const elementTypes = [
  'label',
  'image',
  'youtube',
  'docs',
  'latex',
  'text-input',
  'multi-choice',
  'number-input',
];

export const elementStructureType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(elementTypes).isRequired,
  /* Use `correct` as an array of correct answers to the question.
    The script will check all elements that have this key */
  correct: PropTypes.arrayOf(PropTypes.string),
});

export const sectionStructureType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  header: PropTypes.string,
  elements: PropTypes.arrayOf(elementStructureType).isRequired,
});

export const activityStructureType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  mainHeader: PropTypes.string.isRequired,
  language: PropTypes.oneOf(languages),
  sections: PropTypes.arrayOf(sectionStructureType).isRequired,
});

export const feedbackType = PropTypes.shape({
  error: PropTypes.bool,
  showHelperText: PropTypes.bool,
  helperText: PropTypes.string,
});
