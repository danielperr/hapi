import React, { useState } from 'react';

import produce from "immer";

import Editable from '../shared/editable';

function ElementYoutube({ structure, onUpdate }) {
  const [editableValue, setEditableValue] = useState((structure.youtubeId!==undefined)?`https://www.youtube.com/watch?v=${structure.youtubeId}`:"");

  const handleChange = (text) => {
    onUpdate(
      produce(structure, (newStructure) => {
        var newval = '', output = '';
        if (newval = text.match(/(\?|&)v=([^&#]+)/)) {
          output = newval.pop();
        } else if (newval = text.match(/(\.be\/)+([^\/]+)/)) {
          output = newval.pop();
        } else if (newval = text.match(/(\\embed\/)+([^/]+)/)) {
          output = newval.pop().replace('?rel=0','');
        }
        newStructure.youtubeId = output;
      })
    );

    setEditableValue(text);
  };

  return (
    <React.Fragment>
      <Editable onChange={handleChange}>{ editableValue }</Editable>
      <br />
      <br />
      <iframe
        className="youtube-embed embed"
        src={`https://www.youtube.com/embed/${structure.youtubeId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={true}
        title="video"></iframe>
    </React.Fragment>
  );
}

export default ElementYoutube;
