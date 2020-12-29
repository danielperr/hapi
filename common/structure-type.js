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

const structureType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  mainHeader: PropTypes.string.isRequired,
  language: PropTypes.oneOf(languages),
  sections: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    header: PropTypes.string,
    elements: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.oneOf(elementTypes).isRequired,
      /* Use `correct` as an array of correct answers to the question.
        The script will check all elements that have this key */
      correct: PropTypes.arrayOf(PropTypes.string),
    })).isRequired,
  })).isRequired,
});

export default structureType;
