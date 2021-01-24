/* eslint-disable no-alert */
/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react';

import { Container, CssBaseline, Toolbar } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import produce from 'immer';

import { activityStructureType } from '../../../../common/prop-types';
import { checkActivity, checkSection } from '../../checking';
import { getPhrase } from '../../utils';
import { makeActivityContainer } from '../../../../common/make-activity-file';
import { strings } from '../../localization';
import { version } from '../../../package.json';
import CheckAllButton from './CheckAllButton';
import RTL from './RTL';
import ScrollToTopButton from './ScrollToTopButton';
import Section from '../section/Section';
import SuccessSnackbar from './SuccessSnackbar';
import TableOfContents from './TableOfContents';
import TopBar from './TopBar';
import downloadFile from '../../../../common/download-file';
import dropConfetti from '../../confetti';
import theme from '../../theme';

const ACTIVITY_URL = 'https://hapi-app.netlify.app/empty.html';

// const thisFileCodeSnapshot = document.documentElement.cloneNode(true);

/**
 * `makeStyles` is a function provided by the Material UI library. It's a method to specify styling
 * for out react component instead of CSS. This approach is used throughout the whole project.
 * Later we will reference this `useStyles` hook in the component to extract these style classes.
 */
const useStyles = makeStyles(() => ({
  container: {
    marginTop: theme.spacing(2),
  },
  version: {
    position: 'fixed',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

const FILLABLE_TYPES = ['multi-choice', 'text-input', 'number-input'];

/**
 * HAPI Activity App
 */
function App({ structure, savedAnswers }) {
  // Get style classes we defined earlier
  const classes = useStyles();

  let initialAnswers = savedAnswers;
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

  /* Setting the language in the localization object (named `strings`).
    If the language is not set in the activity, the browser's default
    language is selected (this is implemented in the localization library) */
  const lang = structure.language;
  if (lang !== undefined && strings.getLanguage() !== lang) {
    strings.setLanguage(lang);
  }

  useEffect(() => {
    // This is getting called only once when the component finishes loading.
    document.title = structure.mainHeader;
    window.addEventListener('scroll', () => {
      setTopBarElevation(window.pageYOffset !== 0);
    }, { passive: true });

    return () => {
      // This is getting called when the component is about to be removed
      window.removeEventListener('scroll', null);
    };
  }, []);

  useEffect(() => {
    // `useEffect` listens for when the `answers` prop changes and calls this line
    localStorage.setItem(structure.serialNumber, JSON.stringify(answers));
  }, [answers]);

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

  /**
   * Gets called whenever the student changes the answer to an element.
   * For example, when clicking on a multi choice option or when typing into a text input.
   * @param elementId {String} The ID of the element of which the student updated his answer
   * @param answer {Any} The answer to the element
   */
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

  /**
   * Gets called when the "download activity" button is pressed
   */
  const handleSaveActivity = () => {
    const filename = prompt('Save as:');
    if (filename && filename !== '') {
      downloadFile(`${filename}.hapi.html`, makeActivityContainer(structure, answers, filename, ACTIVITY_URL));
    }
  };

  /**
   * Gets called when the "Reset activity" button is pressed
   * Prompts for confirmation, erases all the answers and reloads
   */
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
   * Gets called when the "Check answers" button at the end of the section is pressed
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

  /**
   * Gets called when the x button on the green success snackbar is pressed
   * (The "success snackbar" is the green bar that appears at the bottom when the activity is
   * complete)
   */
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
          {fillableElements.length && <CheckAllButton onClick={handleSubmitActivity} />}
          <SuccessSnackbar
            open={showSuccess}
            onClose={handleSuccessSnackbarClose}
            rtl={rtl}
          />
        </Container>
        <ScrollToTopButton />
      </RTL>
      <p className={classes.version}>{version}</p>
    </ThemeProvider>
  );
}

App.propTypes = {
  structure: activityStructureType,
  savedAnswers: PropTypes.objectOf(PropTypes.string),
};

App.defaultProps = {
  structure: {},
  savedAnswers: {},
};

export default App;
