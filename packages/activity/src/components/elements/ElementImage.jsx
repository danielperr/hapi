import React from 'react';
import PropTypes from 'prop-types';

/**
 * An element that displays a centered image.
 */
function ElementImage({ structure }) {
  const { src } = structure;

  return (
    <img
      alt=""
      className="image-element center"
      src={src}
    />
  );
}

ElementImage.propTypes = {
  structure: PropTypes.shape({
    src: PropTypes.string,
  }).isRequired,
};

export default ElementImage;
