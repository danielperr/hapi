/* eslint-disable no-alert */
/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  CssBaseline,
  Container,
  Fab,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {
  ThemeProvider,
  unstable_createMuiStrictModeTheme as createMuiTheme,
  makeStyles,
} from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import produce from 'immer';

import { strings } from '../../localization';
import { download, getPhrase } from '../../utils';
import { makeActivityContainer } from '../../../../common/make-activity-file';
import { version } from '../../../package.json';
import { checkActivity, checkSection } from '../../checking';
import TableOfContents from './TableOfContents';
import RTL from '../common/RTL';
import ScrollTop from '../common/ScrollTop';
import Section from '../section/Section';
import SuccessSnackbar from './SuccessSnackbar';
import TopBar from './TopBar';
import dropConfetti from '../../confetti';
import { activityStructureType } from '../../../../common/types';

const ACTIVITY_URL = 'https://hapi-app.netlify.app/empty.html';

// const thisFileCodeSnapshot = document.documentElement.cloneNode(true);

// Here we create a global theme to pass it to a ThemeProvider later
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#ff8f00',
      contrastText: '#ffffff',
    },
    background: {
      default: '#E8EAF6',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  spacing: 8,
});

// We create style classes to use in the component
// This approach of styling (instead of CSS) is used throughout the whole project
// `makeStyles` is provided by the design library "Material UI"
const useStyles = makeStyles(() => ({
  container: {
    marginTop: theme.spacing(2),
  },
  checkAllBtnContainer: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  checkAllBtn: {
    fontWeight: 'bold',
  },
  checkTypography: {
    margin: theme.spacing(0, 1),
    fontWeight: 'bold',
  },
  version: {
    position: 'fixed',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

const FILLABLE_TYPES = ['multi-choice', 'text-input', 'number-input'];

function App({ structure, savedAnswers }) {
  // Get style classes we defined earlier
  const classes = useStyles(theme);

  // let initialAnswers = JSON.parse(document.getElementById('save-input').value || '{}');
  let initialAnswers = savedAnswers; // from save file
  if (!Object.keys(initialAnswers).length) {
    initialAnswers = JSON.parse(localStorage.getItem(structure.serialNumber) || '{}'); // from local storage
  }

  // List of elements that can be filled by the user
  const fillableElements = structure.sections
    .map((s) => s.elements.filter((e) => FILLABLE_TYPES.includes(e.type)))
    .flat(1);
  /* elementsFeedback will be a state variable containing feedback information
    for the user. For example, whether to show red (error) text, and what text
    to display */
  const initialElementsFeedback = {};
  fillableElements.forEach((element) => {
    initialElementsFeedback[element.id] = {
      error: false,
      showHelperText: false,
      helperText: ' ',
    };
  });

  // ** STATE VARIABLES **
  const [answers, setAnswers] = React.useState(initialAnswers);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [elementsFeedback, setElementsFeedback] = React.useState(initialElementsFeedback);
  const [topBarElevation, setTopBarElevation] = React.useState(false);

  // Gets called when the component finishes loading for the first time
  const componentDidMount = () => {
    // Update document title if it isn't set
    document.title = structure.mainHeader;
    // Handle scrolling
    window.addEventListener('scroll', () => {
      setTopBarElevation(window.pageYOffset !== 0);
    }, { passive: true });
  };

  // Method gets called when the component is about to be removed
  // It's good to disconnect here any event listeners created in componentDidMount
  const componentWillUnmount = () => {
    window.removeEventListener('scroll', null);
  };

  useEffect((...args) => {
    componentDidMount(...args);
    return componentWillUnmount;
  }, []);

  // Listen for when `answers` changes, then update the localStorage
  useEffect(() => {
    localStorage.setItem(structure.serialNumber, JSON.stringify(answers));
  }, [answers]);

  // Setting the language in the localization object (named `strings`)
  /* If the language is not set in the activity, the browser's default
    language is selected (this is implemented in the localization library) */
  const lang = structure.language;
  if (lang !== undefined && strings.getLanguage() !== lang) {
    strings.setLanguage(lang);
  }

  /**
   * Given the current status of the section after checking, update its elements' feedback
   * properties (whether to display text, what text to display, whether to mark it in red)
   * @param sectionAnswerStatus {Object} See definition in `../../checking.js`
   */
  const updateElementsFeedback = (sectionAnswerStatus) => {
    setElementsFeedback(produce(elementsFeedback, (newElementsFeedback) => {
      sectionAnswerStatus.elementStatuses.forEach((elementAnswerStatus) => {
        if (elementAnswerStatus.fillable) {
          const newElementFeedback = newElementsFeedback[elementAnswerStatus.elementId];
          newElementFeedback.showHelperText = elementAnswerStatus.fillable;
          newElementFeedback.error = !elementAnswerStatus.elementComplete;
          if (elementAnswerStatus.elementComplete) {
            newElementFeedback.helperText = getPhrase(true); // Good text
          } else if (elementAnswerStatus.hasCorrectAnswer && !elementAnswerStatus.answerCorrect) {
            newElementFeedback.helperText = getPhrase(false); // Wrong answer, bad text
          } else {
            newElementFeedback.helperText = strings.answerMissing;
          }
        }
      });
    }));
  };

  // Gets called from one of the sections when an element's answer is changed
  const handleAnswer = (elementId, answer) => {
    // Reset form feedback text & color
    setElementsFeedback(produce(elementsFeedback, (newElementsFeedback) => {
      newElementsFeedback[elementId].helperText = ' ';
      newElementsFeedback[elementId].showHelperText = false;
      newElementsFeedback[elementId].error = false;
    }));
    // Update the answers state variable
    setAnswers(produce(answers, (newAnswers) => {
      newAnswers[elementId] = answer;
    }));
  };

  // Gets called when the "download activity" button is pressed
  const handleSaveActivity = () => {
    const filename = prompt('Save as:');
    if (filename && filename !== '') {
      download(`${filename}.hapi.html`, makeActivityContainer(structure, answers, filename, ACTIVITY_URL));
    }
  };

  // Gets called when the "reset activity" button is pressed
  // Prompt for confirmation, erase all the answers and reload
  const handleResetActivity = () => {
    if (window.confirm(strings.dialogResetActivity)) {
      setAnswers({});
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.location.reload();
    }
  };

  /**
   * Gets called when the "Check answers" at the end of the section is pressed
   * @param sectionId The ID of the section that the student wishes to check
   */
  const handleCheckSection = (sectionId) => {
    const sectionStructure = structure.sections.find((s) => s.id === sectionId);
    updateElementsFeedback(checkSection(sectionStructure, answers));
  };

  /*
   * Gets called when the "Check all" button is pressed.
   * Checks all of the activity's sections and drops confetti if everything is complete.
   * If not, automatically scrolls to the first problematic element.
  */
  const handleSubmitActivity = () => {
    const activityAnswerStatus = checkActivity(structure, answers);
    activityAnswerStatus.sectionStatuses.forEach((sectionAnswerStatus) => {
      updateElementsFeedback(sectionAnswerStatus);
    });
    if (activityAnswerStatus.activityComplete) {
      dropConfetti();
      setShowSuccess(true); // Display the "Activity complete" green snackbar
    } else {
      document
        .getElementById(activityAnswerStatus.firstIncompleteElementId)
        .scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Gets called when the x button on the green success snackbar is pressed
  /* (The "success snackbar" is the green bar that appears at the bottom when
    the activity is complete) */
  const handleSuccessSnackbarClose = () => {
    setShowSuccess(false);
  };

  const rtl = strings.direction === 'rtl';

  return (
    // Providing the theme we declared earlier
    <ThemeProvider theme={theme}>
      <RTL active={rtl}>
        <CssBaseline />
        <div id="back-to-top-anchor" />
        <TopBar
          elevation={topBarElevation}
          mainHeader={structure.mainHeader}
          onDownload={handleSaveActivity}
          onReset={handleResetActivity}
        />
       {/* This empty toolbar provides spacing at the top */}
        <Toolbar />
        <TableOfContents structure={structure} />
        <Container maxWidth="md" className={classes.container}>
          {structure.sections.map((section) => (
            <Section
              structure={section}
              answers={answers}
              elementsFeedback={elementsFeedback}
              onAnswer={handleAnswer}
              onCheck={handleCheckSection}
              id={section.id}
              key={section.id}
            />
          ))}
          {/* Rendering the "Check all" button only when there are fillable elements */}
          {fillableElements.length ? (
            <Box className={classes.checkAllBtnContainer}>
              <Fab
                variant="extended"
                color="secondary"
                className={classes.checkAllBtn}
                onClick={handleSubmitActivity}
              >
                <CheckIcon />
                <Typography className={classes.checkTypography}>
                  {strings.actionCheckAll}
                </Typography>
              </Fab>
            </Box>
          ) : <></>}
          <SuccessSnackbar
            open={showSuccess}
            onClose={handleSuccessSnackbarClose}
            rtl={rtl}
          />
        </Container>
        {/* When you click anywhere inside a ScrollTop it scrolls to the top */}
        <ScrollTop>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </RTL>
      <p className={classes.version}>{version}</p>
    </ThemeProvider>
  );
}

App.propTypes = {
  structure: activityStructureType,
  savedAnswers: PropTypes.shape(),
};

App.defaultProps = {
  structure: {},
  savedAnswers: {},
};

export default App;
