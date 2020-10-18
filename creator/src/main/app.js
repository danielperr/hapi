import React, { useState, useEffect, useRef } from 'react';

import produce from 'immer';
import styled from 'styled-components';

import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { lightBlue } from '@material-ui/core/colors';
import { CssBaseline, Box, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { makeid, reorder, saveWorkFile, exportToActivity, reorderStructure, findById } from '../utils';
import { DEFAULT_STRUCTURE, DEFAULT_SECTION } from '../shared/constants';
import LanguageContext from '../shared/language-context';
import FocusAwarePaper from '../shared/focus-aware-paper';
import Editable from '../shared/editable';
import Section from './section';
import Menu from './menu';

const EMPTY_ACTIVITY_URL = 'https://hapi-app.netlify.app/empty.html';

const THEME = createMuiTheme({
  direction: 'rtl',
  spacing: 8,
  palette: {
    primary: {
      main: '#4a95d3'
    },
    secondary: lightBlue,
    negative: {
      main: '#cf5959',
    },
  },
  overrides: {
    MuiIconButton: {
      root: {
        color: '#333333',
      }
    },
    MuiTouchRipple: {
      rippleVisible: {
        animationDuration: '300ms',
      },
      childLeaving: {
        animationDuration: '300ms',
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    width: '800px',
    padding: '32px',
    ['@media (max-width: 800px)']: {
      width: '100vw',
      padding: '32px 0',
    },
  },
  mainHeader: {
    padding: theme.spacing(2),
    borderRadius: '8px',
    marginBottom: theme.spacing(4),
  }
}));

function App({ initial }) {
  const classes = useStyles();

  const initialStructure = DEFAULT_STRUCTURE;
  initialStructure.id = makeid(20);
  const [structure, setStructure] = useState(initial || initialStructure);
  const [savedFlag, setSavedFlag] = useState(true);  // Whether the file is saved and safe to exit
  const [exportButtonLoading, setExportButtonLoading] = useState(false);

  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      setSavedFlag(false);
      if (process.env.NODE_ENV !== 'development') {
        window.onbeforeunload = function(){ if (!savedFlag) { return true } };
      }
    }
    else didMount.current = true;
  }, [structure]);

  const handleChangeLanguage = (language) => {
    setStructure(produce(structure, (newStructure) => {
      newStructure.language = language;
    }));
  };

  const handleLoad = (contents) => {
    setStructure(JSON.parse(contents));
  };
  
  const handleSave = () => {
    saveWorkFile(JSON.stringify(structure, null, 2));
    setSavedFlag(true);
  };

  const handleExport = async () => {
    setExportButtonLoading(true);
    exportToActivity((await (await fetch(EMPTY_ACTIVITY_URL)).text()), JSON.stringify(structure));
    setExportButtonLoading(false);
  };

  const handleChangeMainHeader = (text) => {
    setStructure(
      produce(structure, (newStructure) => {
        newStructure.mainHeader = text;
      })
    );
  };

  const handleUpdateSection = (updatedSection) => {
    setStructure(
      produce(structure, (newStructure) => {
        newStructure.sections.forEach((section, i) => {
          if (section.id === updatedSection.id) {
            newStructure.sections[i] = updatedSection;
          }
        });
      })
    );
  };

  const handleClickAddSection = () => {
    setStructure(
      produce(structure, (newStructure) => {
        newStructure.sections.push(
          produce(DEFAULT_SECTION, (newSection) => {
            newSection.id = makeid(10);
          })
        );
      })
    );
  };

  const handleDeleteSection = (sectionId) => {
    setStructure(
      produce(structure, (newStructure) => {
        newStructure.sections.forEach((section, index, object) => {
          if (section.id === sectionId) {
            object.splice(index, 1);
          }
        });
      })
    );
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    
    // dropped nowhere
    if (!destination) {
      return;
    }

    // did not move
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // reorder sections
    if (result.type === 'SECTION') {
      setStructure(produce(structure, (newStructure) => {
        newStructure.sections = reorder(
          newStructure.sections,
          source.index,
          destination.index
        )
      }));
      return;
    }

    // reorder elements
    if (result.type === 'ELEMENT') {
      // element is in the same section as before
      if (source.droppableId === destination.droppableId) {
        setStructure(produce(structure, (newStructure) => {
          newStructure.sections.forEach((section, index, sections) => {
            if (section.id === destination.droppableId) {
              sections[index].elements = reorder(
                section.elements,
                source.index,
                destination.index
              )
            }
          })
        }));
        return;
      }

      // element is moving between sections
      setStructure(produce(structure, (newStructure) => {
        let element;
        newStructure.sections.forEach((section, index, sections) => {
          if (section.id === source.droppableId) {
            [element] = sections[index].elements.splice(source.index, 1);
          }
        })
        newStructure.sections.forEach((section, index, sections) => {
          if (section.id === destination.droppableId) {
            sections[index].elements.splice(destination.index, 0, element);
          }
        })
      }));
      return;
    }

    // reorder multichoice options
    // option is in the same element
    if (source.droppableId === destination.droppableId) {
      setStructure(produce(structure, (newStructure) => {
        newStructure.sections.forEach((section) => {
          section.elements.forEach((element, index, elements) => {
            if (element.id === destination.droppableId) {
              elements[index].options = reorder(
                element.options,
                source.index,
                destination.index
              );
            }
          });
        });
      }));
      return;
    }
  };

  return (
    <LanguageContext.Provider value={structure.language}>
      <ThemeProvider theme={THEME}>
        {/* <CssBaseline /> */}
        <Box className={classes.mainContainer}>
          <p style={{position: "fixed", bottom: "0px", right: "14px"}}><span role="img" aria-label="smiling face">😃</span> Prototype Hapi</p>
          <Menu
            language={structure.language}
            onChangeLanguage={handleChangeLanguage}
            onLoad={handleLoad}
            onSave={handleSave}
            onExport={handleExport}
            exportLoading={exportButtonLoading}
          />
          <FocusAwarePaper className={classes.mainHeader}>
            <Editable size={1} onChange={handleChangeMainHeader} isHeightFixed={true} height='64px'>
              {structure.mainHeader}
            </Editable>
          </FocusAwarePaper>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="sections" type="SECTION">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {structure.sections.map((section, index) => (
                    <Section
                      key={section.id}
                      index={index}
                      structure={section}
                      onUpdate={handleUpdateSection}
                      onDelete={handleDeleteSection}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <br />
          <Fab onClick={handleClickAddSection} color="primary">
            <AddIcon />
          </Fab>
        </Box>
      </ThemeProvider>
    </LanguageContext.Provider>
  );
}

export default App;
