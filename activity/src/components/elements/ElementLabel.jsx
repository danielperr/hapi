import React from 'react';
import PropTypes from 'prop-types';

import RichLabel from '../common/RichLabel';

// class ElementLabel extends React.Component {
function ElementLabel({ text }) {
  return <RichLabel className="label-element">{text}</RichLabel>;
}

ElementLabel.propTypes = {
  text: PropTypes.string,
};

ElementLabel.defaultProps = {
  text: '',
};

export default ElementLabel;
