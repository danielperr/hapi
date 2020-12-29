import React from 'react';
import PropTypes from 'prop-types';

// class ElementImage extends React.Component {
function ElementImage({ id, src }) {
  return (
    <img
      alt=""
      className="image-element center"
      src={src}
      key={id}
    />
  );
}

ElementImage.propTypes = {
  id: PropTypes.string.isRequired,
  src: PropTypes.string,
};

ElementImage.defaultProps = {
  src: '',
};

export default ElementImage;
