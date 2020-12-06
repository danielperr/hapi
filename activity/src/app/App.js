import React, { useEffect } from 'react';

import produce from 'immer';
import { scroller } from 'react-scroll';
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Container, Box, Fab, Toolbar, Typography } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import RTL from './RTL';
import ScrollTop from './ScrollTop';
import AppTableOfContents from './AppTableOfContents';
import TopBar from './TopBar';
import Section from '../section/Section';
import SuccessSnackbar from './SuccessSnackbar';
import { strings } from '../shared/localization';
import { download, getPhrase } from '../shared/utils';
import { dropConfetti } from './confetti';

const thisFileCodeSnapshot = document.documentElement.cloneNode(true);

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

const useStyles = makeStyles((theme) => ({
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
}));

const FILLABLE_TYPES = ['multi-choice', 'text-input', 'number-input'];

function App({ structure }) {
  /* styles */
  const classes = useStyles(theme);

  /* answers */
  let initialAnswers = JSON.parse(document.getElementById('save-input').value || '{}'); // from file save
  if (!Object.keys(initialAnswers).length) {
    initialAnswers = JSON.parse(localStorage.getItem(structure.serialNumber) || '{}'); // from local storage
  }
  const [answers, setAnswers] = React.useState(initialAnswers);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const allFillableElements = structure.sections
    .map((s) => s.elements.filter((e) => FILLABLE_TYPES.includes(e.type)))
    .flat(1);
  const initialElementsFeedback = {};
  allFillableElements.forEach((element) => {
    initialElementsFeedback[element.id] = {
      error: false,
      showHelperText: false,
      helperText: ' ',
    };
  });
  // provides the helper text data and the error flag for each fillable element
  const [elementsFeedback, setElementsFeedback] = React.useState(initialElementsFeedback);

  useEffect(() => {
    document.title = structure.mainHeader;
  }, []);

  useEffect(() => {
    // update local storage when an answer changes
    localStorage.setItem(structure.serialNumber, JSON.stringify(answers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers]);

  /* topbar elevation */
  const [topBarElevation, setTopBarElevation] = React.useState(0);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      setTopBarElevation(window.pageYOffset !== 0);
    }, { passive: true });
    return () => { window.removeEventListener('scroll'); };
  }, []);

  /* language */
  const lang = structure.language;
  if (lang !== undefined && strings.getLanguage() !== lang) {
    strings.setLanguage(lang);
  }

  /**
   * check the given section
   * @returns array of incorrect or empty elements' ids (empty array if section is complete)
   */
  const checkSection = (section) => {
    const errorElements = [];
    setElementsFeedback(produce(elementsFeedback, (newElementsFeedback) => {
      // we give the draft state of elementsFeedback to the functions to mutate
      section.elements.forEach((element) => {
        const answer = answers[element.id] || '';
        let correct;
        switch (element.type) {
          case 'multi-choice':
            if (element.correct === undefined) { return; }
            if (!element.options.map((o) => o.id).includes(element.correct[0])) { return; }
            correct = answer !== '' && element.correct.includes(answer);
            break;
          case 'text-input':
            correct = answer.replace(/[ (\r\n|\r|\n)]/gi, '') !== '';
            break;
          case 'number-input':
            correct = answer !== '' && element.min <= answer && answer <= element.max;
            break;
          default: return;
        }
        newElementsFeedback[element.id].helperText = answer === '' ? strings.answerMissing : getPhrase(correct);
        newElementsFeedback[element.id].showHelperText = true;
        newElementsFeedback[element.id].error = !correct;
        if (!correct) {
          errorElements.push(element.id);
        }
      });
    }));
    return errorElements;
  };

  /* when a question's value changes */
  const handleAnswer = (elementId, answer) => {
    // reset form feedback text & color
    setElementsFeedback(produce(elementsFeedback, (newElementsFeedback) => {
      newElementsFeedback[elementId].helperText = ' ';
      newElementsFeedback[elementId].showHelperText = false;
      newElementsFeedback[elementId].error = false;
    }));
    setAnswers(produce(answers, (newAnswers) => {
      newAnswers[elementId] = answer;
    }));
  };

  /* check the whole activity and display confirmation if complete */
  const handleSubmitActivity = () => {
    if (structure.sections.every((section) => {
      const errorElementsIds = checkSection(section);
      if (errorElementsIds.length) {
        scroller.scrollTo(errorElementsIds[0], {
          duration: 1000,
          delay: 100,
          smooth: 'easeInOutQuint',
          offset: -100,
        });
      }
      return !errorElementsIds.length;
    })) {
      dropConfetti();
      setShowSuccess(true);
    }
  };

  /* save activity to a file */
  const handleSaveActivity = () => {
    const answersString = JSON.stringify(answers);
    const thisFileCode = thisFileCodeSnapshot.cloneNode(true);
    thisFileCode.querySelectorAll('#save-input').forEach((element) => {
      if (element.id === 'save-input') {
        element.value = answersString;
      }
    });
    const filename = prompt('Save as:');
    if (filename !== '' && filename !== null) {
      download(`${filename}.hapi.html`, thisFileCode.innerHTML);
    }
  };

  /* prompt for confirmation, erase all the answers and reload */
  const handleResetActivity = () => {
    if (window.confirm(strings.dialogResetActivity)) {
      setAnswers({});
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.location.reload();
    }
  };

  const handleCheckSection = (sectionId) => {
    const section = structure.sections.find((s) => s.id === sectionId);
    return checkSection(section);
  };

  /* success snackbar on close */
  const handleSuccessSnackbarClose = () => {
    setShowSuccess(false);
  };

  const rtl = strings.direction === 'rtl';

  return (
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
        <Toolbar />
        <AppTableOfContents structure={structure} />
        <Container maxWidth="md" className={classes.container}>
          {structure.sections.map((section) => (
            <Section
              header={section.header}
              elements={section.elements}
              answers={answers}
              feedback={elementsFeedback}
              onAnswer={handleAnswer}
              onCheck={handleCheckSection}
              id={section.id}
              key={section.id}
            />
          ))}
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
          <SuccessSnackbar
            open={showSuccess}
            onClose={handleSuccessSnackbarClose}
            rtl={rtl}
          />
        </Container>
        <ScrollTop>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </RTL>
    </ThemeProvider>
  );
}

export default App;
