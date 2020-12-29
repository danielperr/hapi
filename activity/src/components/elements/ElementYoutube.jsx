import React from 'react';
import PropTypes from 'prop-types';

// <ElementYoutube id="" youtubeId="" />
// class ElementYoutube extends React.Component {
function ElementYoutube({ id, youtubeId }) {
  // When creating this element pass the yotube Id only
  return (
    <div
      style={{
        position: 'relative',
        paddingBottom: '56.25%',
        paddingTop: 25,
        height: 0,
      }}
      key={`${id}-div`}
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
  id: PropTypes.string.isRequired,
  youtubeId: PropTypes.string,
};

ElementYoutube.defaultProps = {
  youtubeId: '',
};

export default ElementYoutube;
