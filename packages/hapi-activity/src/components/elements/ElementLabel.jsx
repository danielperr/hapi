import React from 'react';
import PropTypes from 'prop-types';

import RichLabel from '../common/RichLabel';

/**
 * An element that displays a piece of text. Supports markdown and LaTeX syntax.
 */
function ElementLabel({ structure }) {
  const { text } = structure;
  return <RichLabel className="label-element">{text}</RichLabel>;
}

ElementLabel.propTypes = {
  structure: PropTypes.shape({
    text: PropTypes.string,
  }).isRequired,
};

export default ElementLabel;
