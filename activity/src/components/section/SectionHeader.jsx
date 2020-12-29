import React from 'react';
import PropTypes from 'prop-types';

// class SectionHeader extends React.Component {
function SectionHeader({ name, text }) {
  return (
    <h1 className="section-header" name={name}>
      {text}
    </h1>
  );
}

SectionHeader.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
};

SectionHeader.defaultProps = {
  name: '',
  text: '',
};

export default SectionHeader;
