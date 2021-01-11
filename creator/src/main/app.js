/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import produce from 'immer';
import styled from 'styled-components';

import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { lightBlue } from '@material-ui/core/colors';
import { CssBaseline, Box, Fab, Modal, Fade, Backdrop } from '@material-ui/core';
import { useBeforeunload } from 'react-beforeunload';
import AddIcon from '@material-ui/icons/Add';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { calculateNoticeObjects } from '../utils/notices';
import { version } from '../../package.json';
import { makeid, reorder, saveWorkFile, exportToActivity, reorderStructure, findById, replaceIds, downloadFileWithContents } from '../utils';
import { DEFAULT_STRUCTURE, DEFAULT_SECTION } from '../shared/constants';
import { makeActivityContainer } from '../../../common/make-activity-file';
import LanguageContext from '../shared/language-context';
import FocusAwarePaper from '../shared/focus-aware-paper';
import Editable from '../shared/editable';
import Section from './section';
import Menu from './menu';
import PreviewWindow from '../shared/preview-window';

const ACTIVITY_URL = 'https://hapi-app.netlify.app/empty.html';

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
    warning: {
      main: '#f9a825',
    },
    error: {
      main: '#f92525',
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
    '@media (max-width: 800px)': {
      width: '100vw',
      padding: '32px 0',
    },
  },
  mainHeader: {
    padding: theme.spacing(2),
    borderRadius: '8px',
    marginBottom: theme.spacing(4),
  },
  version: {
    position: 'fixed',
    bottom: theme.spacing(-1),
    right: theme.spacing(1),
  },
}));

/**
 * Main app component, blah blah blah
 */
function App({ initial }) {
  const classes = useStyles();

  const initialStructure = DEFAULT_STRUCTURE;
  initialStructure.id = makeid(20);
  const [structure, setStructure] = useState(initial || initialStructure);
  const [savedFlag, setSavedFlag] = useState(true);  // Whether the file is saved and safe to exit
  const [exportButtonLoading, setExportButtonLoading] = useState(false);
  const [previewWindowOpen, setPreviewWindowOpen] = useState(false);
  const [noticeObjects, setNoticeObjects] = useState([]);

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

  // <AutoSave>
  const saveToLocalStorage = () => {
    localStorage.setItem('creator-last-save', JSON.stringify(structure));
  };

  useEffect(() => {
    const interval = setInterval(() => { saveToLocalStorage(); }, 60 * 1000);
    return () => { clearInterval(interval); }
  });

  // Right before getting closed in the browser
  useBeforeunload(() => { saveToLocalStorage(); });
  // </AutoSave>

  useEffect(() => {
    setNoticeObjects(calculateNoticeObjects(structure));
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
    if (noticeObjects.length) {
      if (!window.confirm('You have warnings in your activity, export anyway?')) {
        return;
      }
    }
    setExportButtonLoading(true);
    // exportToActivity((await (await fetch(EMPTY_ACTIVITY_URL)).text()), JSON.stringify(structure));
    const filename = prompt('Save as:');
    if (filename && filename !== '') {
      downloadFileWithContents(`${filename}.hapi.html`, makeActivityContainer(structure, {}, filename, ACTIVITY_URL))
    }
    setExportButtonLoading(false);
  };

  const handleLaunchPreview = () => {
    setPreviewWindowOpen(true);
  };

  const handleClosePreview = () => {
    setPreviewWindowOpen(false);
  };

  const handleChangeMainHeader = (text) => {
    setStructure(
      produce(structure, (newStructure) => {
        newStructure.mainHeader = text;
      })
    );
  };

  const handleUpdateSection = (updatedSection) => {
    setStructure(produce(structure, (newStructure) => {
      newStructure.sections.forEach((section, i) => {
        if (section.id === updatedSection.id) {
          newStructure.sections[i] = updatedSection;
        }
      });
    }));
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

  const handleDuplicateSection = (sectionId) => {
    setStructure(produce(structure, (newStructure) => {
      newStructure.sections.push(replaceIds(structure.sections.find((s) => s.id === sectionId)));
    }))
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
    <>
      <PreviewWindow
        open={previewWindowOpen}
        onClose={handleClosePreview}
        structure={structure}
        activityUrl={ACTIVITY_URL}
      />
      <LanguageContext.Provider value={structure.language}>
        <ThemeProvider theme={THEME}>
          {/* <CssBaseline /> */}
          <Box className={classes.mainContainer}>
            <Menu
              language={structure.language}
              onChangeLanguage={handleChangeLanguage}
              onLoad={handleLoad}
              onSave={handleSave}
              onExport={handleExport}
              exportLoading={exportButtonLoading}
              onLaunchPreview={handleLaunchPreview}
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
                        noticeObjects={noticeObjects}
                        onUpdate={handleUpdateSection}
                        onDuplicate={handleDuplicateSection}
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
          <p className={classes.version}>{version}</p>
        </ThemeProvider>
      </LanguageContext.Provider>
    </>
  );
}

App.propTypes = {
  /** Initial structure to start with */
  initial: PropTypes.shape({
    mainHeader: PropTypes.string.isRequired,
    sections: PropTypes.arrayOf(PropTypes.shape({
      header: PropTypes.string.isRequired,
      elements: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
      })).isRequired,
    })).isRequired,
  })
}

export default App;
