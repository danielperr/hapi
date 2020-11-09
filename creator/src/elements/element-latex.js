import React, { useEffect, useRef } from 'react';

import produce from 'immer';
import katex from 'katex';
import { makeStyles } from '@material-ui/core/styles';

import Editable from '../shared/editable';

const useStyles = makeStyles(() => ({
  latexField: {
    direction: 'ltr',
    flip: false,
  },
}));

function ElementLatex({ structure, onUpdate }) {
  const classes = useStyles();

  // if latex property doesn't exist in structure, create empty
  const latex = structure.latex || '';
  // Refs keep reference to DOM elements, in this case we use it to tell katex where to render
  const latexFieldRef = useRef();

  // Gets called every time latex changes, after the component finishes loading
  useEffect(() => {
    katex.render(latex, latexFieldRef.current, { throwOnError: false, displayMode: true });
  }, [latex]);
  
  // When latex changed by the user
  const handleChangeLatex = (latex) => {
    onUpdate(produce(structure, (newStructure) => {
      newStructure.latex = latex;
    }));
  };

  return (
    <React.Fragment>
      <Editable
        directionOverride="ltr"
        onChange={handleChangeLatex}
      >
        {latex}
      </Editable>
      {/* Here we assign the ref to the div in which katex renders */}
      <div ref={latexFieldRef} className={classes.latexField}></div>
    </React.Fragment>
  );
}

export default ElementLatex;
