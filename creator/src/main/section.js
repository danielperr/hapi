import React, { useState } from 'react';

import produce from 'immer';
import styled from 'styled-components';

import { Box, makeStyles, Button, IconButton, Collapse, Grow, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import AddIcon from '@material-ui/icons/Add';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import Element from './element';
import Editable from '../shared/editable';
import FocusAwarePaper from '../shared/focus-aware-paper';
import RotatingIcon from '../shared/rotating-icon';
import { DEFAULT_ELEMENT } from '../shared/constants';
import { makeid, replaceIds } from '../utils';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const useStyles = makeStyles((theme) => ({
  section: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(4),
    borderRadius: '8px',
  },
  sectionContainer: {
    paddingTop: theme.spacing(2),
  },
  dragHandle: {
    marginBottom: theme.spacing(0),
    textAlign: 'center',
    color: '#BBB',
  },
  topBar: {
    display: 'flex',
    flexDirection: 'row',
  },
  collapseButton: {
    marginRight: theme.spacing(2),
  },
  duplicateButton: {

  },
  deleteButton: {
    marginRight: theme.spacing(1),
    color: theme.palette.negative.main,
  },
  center: {
    textAlign: 'center',
  },
  droppable: {
    marginTop: theme.spacing(4),
  },
  addIcon: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(-1.5),
  },
}));

function Section({ index, structure, onUpdate, onDuplicate, onDelete }) {
  
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
  };

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

  const handleDuplicateElement = (elementId) => {
    onUpdate(produce(structure, (newStructure) => {
      newStructure.elements.push(replaceIds(structure.elements.find((s) => s.id === elementId)));
    }))
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

  const handleDuplicateSelf = () => {
    onDuplicate(structure.id);
  };

  const handleDeleteSelf = (e) => {
    e.target.focus();
    setIsVisible(false);
  };

  const handleDeleteTransitionExited = () => {
    if (!isVisible) {
      onDelete(structure.id);
    }
  };

  return (
    <Draggable draggableId={structure.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{...provided.draggableProps.style, opacity: (snapshot.isDragging && !snapshot.isDropAnimating) ? 0.8 : 1}}
        >
          <Grow in={isVisible} onExited={handleDeleteTransitionExited} timeout={{ enter: 400, exit: 200 }}>
            <Box className={classes.sectionContainer}>
              <FocusAwarePaper className={classes.section} isDragging={snapshot.isDragging && !snapshot.isDropAnimating}>
                <Box className={classes.dragHandle}>
                  <div {...provided.dragHandleProps}>
                    <DragHandleIcon />
                  </div>
                </Box>
                <Box className={classes.topBar}>
                  <Editable size={2} onChange={handleChangeHeader} isHeightFixed={true} height="50px">{structure.header}</Editable>
                  <IconButton className={classes.collapseButton} onClick={handleCollapseClick}>
                    <RotatingIcon
                      active={isOpen}
                      passiveIcon={<ArrowDownwardIcon />}
                      activeIcon={<ArrowUpwardIcon />}
                    />
                  </IconButton>
                  <Tooltip title="שכפל">
                    <IconButton className={classes.duplicateButton} onClick={handleDuplicateSelf}>
                      <FileCopyIcon />
                    </IconButton>
                  </Tooltip>
                  <IconButton className={classes.deleteButton} onClick={handleDeleteSelf}>
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </Box>
                <Collapse in={isOpen} unmountOnExit>
                  <Box className={classes.droppable}>
                    <Droppable droppableId={structure.id} type="ELEMENT">
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {structure.elements.map((element, index) => (
                            <Element
                              key={element.id}
                              index={index}
                              structure={element}
                              onUpdate={handleUpdateElement}
                              onDuplicate={handleDuplicateElement}
                              onDelete={handleDeleteElement}
                              onMoveUp={handleMoveUpElement}
                              onMoveDown={handleMoveDownElement}
                            />
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </Box>
                  <br />
                  <Box className={classes.center}>
                    <Button onClick={handleClickAddElement} variant="outlined" color="primary" startIcon={<AddIcon className={classes.addIcon} />}><b>רכיב חדש</b></Button>
                  </Box>
                </Collapse>
              </FocusAwarePaper>
            </Box>
          </Grow>
        </div>
      )}
    </Draggable>
  );
}


export default Section;
