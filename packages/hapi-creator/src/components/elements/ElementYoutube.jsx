import React, { useState } from 'react';

import produce from "immer";

import Editable from '../common/Editable';

function extractYoutubeId(input) {
  let youtubeId = '';
  let match = input.match(/(\?|&)v=([^&#]+)/);
  if (match) {
    youtubeId = match.pop();
  } else {
    match = input.match(/(\.be\/)+([^/]+)/);
    if (match) {
      youtubeId = match.pop();
    } else {
      match = input.match(/(\\embed\/)+([^/]+)/)
      if (match) {
        youtubeId = match.pop().replace('?rel=0','');
      }
    }
  }
  return youtubeId;
}

function ElementYoutube({ structure, onUpdate }) {
  const videoURL = structure.youtubeId
    ? `https://www.youtube.com/watch?v=${structure.youtubeId}`
    : '';
  const embedURL = `https://www.youtube.com/embed/${structure.youtubeId}`;

  /* We use an inner state because depending only on the structure limits
    the user's ability to type into the editable field. */
  const [userInput, setUserInput] = useState(videoURL);

  const handleChange = (text) => {
    setUserInput(text);
    onUpdate(produce(structure, (newStructure) => {
      newStructure.youtubeId = extractYoutubeId(text);
    }));
  };

  return (
    <React.Fragment>
      <Editable onChange={handleChange}>{userInput}</Editable>
      <br />
      <br />
      <iframe
        className="youtube-embed embed"
        src={embedURL}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={true}
        title="video"></iframe>
    </React.Fragment>
  );
}

export default ElementYoutube;
