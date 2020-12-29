import React from 'react';
import PropTypes from 'prop-types';

// <ElementDocs id="" src="" />
function ElementDocs({ id, src }) {
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
  id: PropTypes.string.isRequired,
  src: PropTypes.string,
};

ElementDocs.defaultProps = {
  src: '',
};

export default ElementDocs;
