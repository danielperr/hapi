import React, { useState } from 'react';

import produce from 'immer';
import styled from 'styled-components';

import { Box, makeStyles, Paper, IconButton, Collapse, Grow } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import Element from './element';
import Editable from '../shared/editable';
import FocusAwarePaper from '../shared/focus-aware-paper';
import ArrowButtons from '../shared/arrow-buttons';
import DeleteButton from '../shared/delete-button';
import Toolbar from '../shared/horizontal-bar';
import { DEFAULT_ELEMENT } from '../shared/constants';
import { makeid } from '../shared/utils';

const useStyles = makeStyles((theme) => ({
  section: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    borderRadius: '8px',
  },
  topBar: {
    display: 'flex',
    flexDirection: 'row',
  },
  collapseButton: {
    marginRight: theme.spacing(2),
  },
  deleteButton: {
    marginRight: theme.spacing(1),
    color: theme.palette.negative.main,
  }
}));

function Section({ structure, onUpdate, onDelete, onMoveUp, onMoveDown }) {
  
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(true);  // Whether if open or collapsed
  const [isVisible, setIsVisible] = useState(true);

  const handleChangeHeader = (text) => {
    onUpdate(produce(structure, newStructure => {
      newStructure.header = text;
    }));
  };

  const handleCollapseClick = (e) => {
    e.target.focus();
    setIsOpen(!isOpen);
  }

  const handleUpdateElement = (updatedElement) => {
    onUpdate(produce(structure, newStructure => {
      newStructure.elements.forEach((element, i) => {
        if (element.id === updatedElement.id) {
          newStructure.elements[i] = updatedElement;
        }
      })
    }));
  };

  const handleClickAddElement = () => {
    onUpdate(produce(structure, newStructure => {
      newStructure.elements.push(produce(DEFAULT_ELEMENT, newElement => { newElement.id = makeid(10); }))
    }));
  };

  const handleDeleteElement = (elementId) => {
    onUpdate(produce(structure, newStructure => {
      newStructure.elements.forEach((element, index, object) => {
        if (element.id === elementId) {
          object.splice(index, 1);
        }
      });
    }));
  };

  const handleMoveUpElement = (elementId) => {
    onUpdate(produce(structure, newStructure => {
      let o = newStructure.elements;
      let i = o.map((e) => { return e.id }).indexOf(elementId);
      if (i > 0) {
        [o[i], o[i-1]] = [o[i-1], o[i]];
      }
    }));
  };

  const handleMoveDownElement = (elementId) => {
    onUpdate(produce(structure, newStructure => {
      let o = newStructure.elements;
      let i = o.map((e) => { return e.id }).indexOf(elementId);
      if (i >= 0 && i < o.length - 1) {
        [o[i], o[i+1]] = [o[i+1], o[i]];
      }
    }));
  };

  const handleDeleteSelf = (e) => {
    e.target.focus();
    setIsVisible(false);
  };

  const handleDeleteTransitionExited = () => {
    if (!isVisible) {
      onDelete(structure.id);
    }
  }

  const handleClickUp = () => {
    onMoveUp(structure.id);
  };

  const handleClickDown = () => {
    onMoveDown(structure.id);
  };

  const elements = [];
  structure.elements.forEach(element => {
    elements.push(
      <Element
        structure={element}
        onUpdate={handleUpdateElement}
        onDelete={handleDeleteElement}
        onMoveUp={handleMoveUpElement}
        onMoveDown={handleMoveDownElement}
        key={element.id}
      />
    );
  });

  return (
    <Grow in={isVisible} onExited={handleDeleteTransitionExited}>
      <FocusAwarePaper className={classes.section}>
        {/* <Toolbar>
          <ArrowButtons onClickUp={handleClickUp} onClickDown={handleClickDown} />
          <DeleteButton onClick={handleDeleteSelf} />
        </Toolbar> */}
        <Box className={classes.topBar}>
          <Editable size={2} onChange={handleChangeHeader} isHeightFixed={true} height="50px">{structure.header}</Editable>
          <IconButton className={classes.collapseButton} onClick={handleCollapseClick}>
            {
              isOpen ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />
            }
          </IconButton>
          <IconButton className={classes.deleteButton} onClick={handleDeleteSelf}>
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Box>
        <Collapse in={isOpen} unmountOnExit>
          {elements}
          <br />
          <button onClick={handleClickAddElement}><b>הוסף רכיב</b></button>
        </Collapse>
      </FocusAwarePaper>
    </Grow>
  );
}


export default Section;
