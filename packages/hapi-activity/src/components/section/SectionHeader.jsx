import React from 'react';
import PropTypes from 'prop-types';

/**
 * Section header
 */
function SectionHeader({ children }) {
  return (
    <h1 className="section-header">
      {children}
    </h1>
  );
}

SectionHeader.propTypes = {
  children: PropTypes.string,
};

SectionHeader.defaultProps = {
  children: '',
};

export default SectionHeader;
