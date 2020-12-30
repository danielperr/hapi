import React from 'react';
import PropTypes from 'prop-types';

/**
 * An element that displays a google docs embed.
 */
function ElementDocs({ structure }) {
  const { id, src } = structure;
  return (
    <div
      style={{
        position: 'relative',
        paddingTop: 25,
        height: '600px',
      }}
      key={`${id} -div`}
    >
      <iframe
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        className="override"
        src={src}
        title={`${id} -iframe`}
      />
    </div>
  );
}

ElementDocs.propTypes = {
  structure: PropTypes.shape({
    id: PropTypes.string.isRequired,
    src: PropTypes.string,
  }).isRequired,
};

export default ElementDocs;
