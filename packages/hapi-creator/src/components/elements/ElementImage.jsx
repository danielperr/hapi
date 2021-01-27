import React from 'react';

import produce from 'immer';
import { makeStyles } from '@material-ui/core/styles';

import Editable from '../common/Editable';

const useStyles = makeStyles((theme) => ({
  image: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '70%',
  },
}));

function ElementImage({ structure, onUpdate }) {
  const classes = useStyles();

  const handleChange = (text) => {
    onUpdate(produce(structure, (newStructure) => {
      newStructure.src = text;
    }));
  };

  const handleError = (e) => {
    e.target.src = `${process.env.PUBLIC_URL}/image-not-found.png`;
  }

  return (
    <React.Fragment>
      <Editable onChange={handleChange}>{structure.src}</Editable>
      <br />
      <br />
      <img
        src={structure.src}
        className={classes.image}
        onError={handleError}
        alt=""
      />
    </React.Fragment>
  );
}

export default ElementImage;
