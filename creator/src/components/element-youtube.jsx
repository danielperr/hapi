import React from 'react';
import Editable from './editable/editable';

function ElementYoutube({ structure }) {
  return (
    <>
      <Editable>{`https://youtube.com/watch?v=${structure.youtubeId}`}</Editable>
      <br />
      <br />
      <iframe
        className="youtube-embed embed"
        src={`https://www.youtube.com/embed/${structure.youtubeId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={true}
        title="video"></iframe>
    </>
  );
}

export default ElementYoutube;
