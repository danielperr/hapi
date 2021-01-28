import React from 'react';
import PropTypes from 'prop-types';

// <ElementYoutube id="" youtubeId="" />
// class ElementYoutube extends React.Component {
function ElementYoutube({ structure }) {
  const { youtubeId } = structure;
  return (
    <div
      style={{
        position: 'relative',
        paddingBottom: '56.25%',
        paddingTop: 25,
        height: 0,
      }}
    >
      <iframe
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        className="youtube-embed embed"
        src={`https://www.youtube.com/embed/${youtubeId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="video"
      />
    </div>
  );
}

ElementYoutube.propTypes = {
  structure: PropTypes.shape({
    youtubeId: PropTypes.string,
  }).isRequired,
};

export default ElementYoutube;
