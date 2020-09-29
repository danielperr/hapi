import React, { useState, useEffect } from 'react';

import produce from 'immer';
import styled from 'styled-components';

import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { lightBlue, red } from '@material-ui/core/colors';
import { CssBaseline, Button, Paper, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { makeid, httpGet, reorder } from '../shared/utils';
import { saveWorkFile, exportToActivity } from '../shared/file-utils';
import { DEFAULT_STRUCTURE, DEFAULT_SECTION } from '../shared/constants';
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
});

const useStyles = makeStyles((theme) => ({
  mainHeader: {
    padding: theme.spacing(2),
    borderRadius: '8px',
    marginBottom: theme.spacing(4),
  }
}));

function App({ }) {
  const classes = useStyles();

  const initialStructure = DEFAULT_STRUCTURE;
  initialStructure.id = makeid(20);
  const [structure, setStructure] = useState(initialStructure);
  const [savedFlag, setSavedFlag] = useState(true);  // Whether the file is saved and safe to exit

  useEffect(() => {
    setSavedFlag(false);
  }, [structure]);

  useEffect(() => {
    // window.onbeforeunload = function(){ if (!savedFlag) { return true } };
  }, [savedFlag]);

  const handleLoad = (contents) => {
    setStructure(JSON.parse(contents));
  }
  
  const handleSave = () => {
    saveWorkFile(JSON.stringify(structure, null, 2));
    setSavedFlag(true);
  };

  const handleExport = () => {
    exportToActivity(httpGet(EMPTY_ACTIVITY_URL), JSON.stringify(structure));
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
    console.log(result);

    if (!result.destination) {
      return;
    }

    setStructure(
      produce(structure, (newStructure) => {
        newStructure.sections = reorder(
          newStructure.sections,
          result.source.index,
          result.destination.index
        );
      })
    );
  };

  const sections = [];
  structure.sections.forEach((section, index) => {
    sections.push(
      <Section
        structure={section}
        onUpdate={handleUpdateSection}
        onDelete={handleDeleteSection}
        index={index}
        key={section.id}
      />
    );
  });

  const changeStructure = (newStructure) => {
    setStructure(newStructure);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <ThemeProvider theme={THEME}>
        {/* <CssBaseline /> */}
        <StyledApp>
          <p style={{position: "fixed", bottom: "0px", right: "14px"}}><span role="img" aria-label="smiling face">😃</span> Prototype Hapi</p>
          <Menu
            onLoad={handleLoad}
            onSave={handleSave}
            onExport={handleExport}
          />
          <FocusAwarePaper className={classes.mainHeader}>
            <Editable size={1} onChange={handleChangeMainHeader} isHeightFixed={true} height='64px'>
              {structure.mainHeader}
            </Editable>
          </FocusAwarePaper>
          <Droppable droppableId="sections">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {sections}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <br />
          <Fab onClick={handleClickAddSection} color="primary">
            <AddIcon />
          </Fab>
        </StyledApp>
      </ThemeProvider>
    </DragDropContext>
  );
}

const StyledApp = styled.div`
  min-width: 800px;
  max-width: 800px;
  padding: 32px;

  @media (max-width: 800px) {
    min-width: inherit;
    max-width: inherit;
    width: 100vw;
    padding-left: 0;
    padding-right: 0;
  }
`;

export default App;
