/* eslint-disable no-alert */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';

import { Box, Fab } from '@material-ui/core';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { v1 as uuid } from 'uuid';
import AddIcon from '@material-ui/icons/Add';
import produce from 'immer';

import { DEFAULT_SECTION, DEFAULT_STRUCTURE } from '../../constants';
import { activityStructureType } from '../../../../common/types';
import { calculateNoticeObjects } from '../../notices';
import { makeActivityContainer } from '../../../../common/make-activity-file';
import { saveWorkFile } from '../../file-management';
import { version } from '../../../package.json';
import Editable from '../common/Editable';
import FocusAwarePaper from '../common/FocusAwarePaper';
import LanguageContext from '../../language-context';
import Menu from './Menu';
import PreviewWindow from './PreviewWindow';
import Section from './Section';
import dndReorder from '../../dnd-reorder';
import downloadFile from '../../../../common/download-file';
import replaceIds from '../../replace-ids';
import theme from '../../theme';

const ACTIVITY_URL = 'https://hapi-app.netlify.app/empty.html';

const useStyles = makeStyles(() => ({
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
 * Main app component
 */
function App({ initial }) {
  const classes = useStyles();

  const initialStructure = DEFAULT_STRUCTURE;
  initialStructure.id = uuid(20);

  /* STATE VARIABLES */
  const [structure, setStructure] = useState(initial || initialStructure);
  const [exportButtonLoading, setExportButtonLoading] = useState(false);
  const [previewWindowOpen, setPreviewWindowOpen] = useState(false);
  const [noticeObjects, setNoticeObjects] = useState([]);

  const saveToLocalStorage = () => {
    localStorage.setItem('creator-last-save', JSON.stringify(structure));
  };

  useEffect(() => {
    // This is called only once when the component finishes loading
    window.onbeforeunload = () => {
      // This is called when the window is about to be closed
      saveToLocalStorage();
      return true;
    };
    const interval = setInterval(() => { saveToLocalStorage(); }, 60 * 1000);
    return () => {
      // This is called when the component is about to be unmounted (right before closing)
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // This is called whenever the structure state is changed
    setNoticeObjects(calculateNoticeObjects(structure));
  }, [structure]);

  /**
   * The user selects a language for the activity in the menu
   * @param language {String} 'en' or 'he'
   */
  const handleChangeLanguage = (language) => {
    setStructure(produce(structure, (newStructure) => {
      newStructure.language = language;
    }));
  };

  /**
   * Gets called from the file dropzone whenever the user loads a file from their computer
   * @param contents {String} The file's contents - structure in JSON string format
   */
  const handleLoad = (contents) => {
    setStructure(JSON.parse(contents));
  };

  /**
   * The user clicks to create a new activity (and clears the current one)
   */
  const handleNewActivity = () => {
    if (window.confirm('WARNING: This will erase the current activity!')) {
      setStructure(DEFAULT_STRUCTURE);
      saveToLocalStorage();
    }
  };

  /**
   * The user clicks to save the activity to a file
   */
  const handleSave = () => {
    saveWorkFile(JSON.stringify(structure, null, 2));
  };

  /**
   * Gets called whenever the user clicks to export the activity to an html file
   */
  const handleExport = () => {
    if (noticeObjects.length) {
      if (!window.confirm('You have warnings in your activity, export anyway?')) {
        return;
      }
    }
    setExportButtonLoading(true);
    const filename = prompt('Save as:');
    if (filename) {
      downloadFile(
        `${filename}.hapi.html`,
        makeActivityContainer(structure, {}, filename, ACTIVITY_URL),
      );
    }
    setExportButtonLoading(false);
  };

  /**
   * The user clicks the preview button
   */
  const handleLaunchPreview = () => {
    setPreviewWindowOpen(true);
  };

  /**
   * The user clicks to close the preview window
   */
  const handleClosePreview = () => {
    setPreviewWindowOpen(false);
  };

  /**
   * The user changes the main header of the activity
   * @param text {String} New text to change to
   */
  const handleChangeMainHeader = (text) => {
    setStructure(produce(structure, (newStructure) => {
      newStructure.mainHeader = text;
    }));
  };

  /**
   * Gets called from one of the section when its structure needs to update
   * @param updatedSection {Object} New structure of the section
   */
  const handleUpdateSection = (updatedSection) => {
    setStructure(produce(structure, (newStructure) => {
      const i = structure.sections.findIndex(({ id }) => id === updatedSection.id);
      newStructure.sections[i] = updatedSection;
    }));
  };

  /**
   * The user clicks the plus button to add a section
   */
  const handleClickAddSection = () => {
    setStructure(produce(structure, (newStructure) => {
      newStructure.sections.push(produce(DEFAULT_SECTION, (newSection) => {
        newSection.id = uuid(10);
      }));
    }));
  };

  /**
   * Gets called from a section when the user clicks on its duplicate button
   * @param sectionId {String} ID of the section the user wishes to duplicate
   */
  const handleDuplicateSection = (sectionId) => {
    setStructure(produce(structure, (newStructure) => {
      newStructure.sections.push(replaceIds(structure.sections.find((s) => s.id === sectionId)));
    }));
  };

  /**
   * Gets called from a section when the user clicks to delete it
   * @param sectionId
   */
  const handleDeleteSection = (sectionId) => {
    setStructure(produce(structure, (newStructure) => {
      const i = structure.sections.findIndex(({ id }) => id === sectionId);
      newStructure.sections.splice(i, 1);
    }));
  };

  /**
   * Gets called from the DragDropContext component of the library 'react-beautiful-dnd' which
   * manages the drag and drop mechanism of sections and elements.
   * @param result {Object}
   */
  const handleDragEnd = (result) => {
    const { shouldUpdate, newStructure } = dndReorder(result, structure);
    if (shouldUpdate) {
      setStructure(newStructure);
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
        <ThemeProvider theme={theme}>
          {/* <CssBaseline /> */}
          <Box className={classes.mainContainer}>
            <Menu
              language={structure.language}
              onChangeLanguage={handleChangeLanguage}
              onLoad={handleLoad}
              onNewActivity={handleNewActivity}
              onSave={handleSave}
              onExport={handleExport}
              exportLoading={exportButtonLoading}
              onLaunchPreview={handleLaunchPreview}
            />
            <FocusAwarePaper className={classes.mainHeader}>
              <Editable size={1} onChange={handleChangeMainHeader} isHeightFixed height="64px">
                {structure.mainHeader}
              </Editable>
            </FocusAwarePaper>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="sections" type="SECTION">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    /* eslint-disable-next-line react/jsx-props-no-spreading */
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
  initial: activityStructureType,
};

App.defaultProps = {
  initial: DEFAULT_STRUCTURE,
};

export default App;
