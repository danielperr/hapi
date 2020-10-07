import React, { useEffect } from "react";

import { scroller } from "react-scroll";

import { ThemeProvider, createMuiTheme, makeStyles } from "@material-ui/core/styles";
import { CssBaseline, Container, Box, Fab, Snackbar, IconButton, Toolbar, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import { strings } from '../shared/localization';
import RTL from './RTL';
import TopBar from './TopBar';
import AppTableOfContents from "./AppTableOfContents";
import { dropConfetti } from "./confetti";
import ScrollTop from "./ScrollTop";
import Section from '../section/Section';
import { getPhrase } from "../shared/utils";

const thisFileCodeSnapshot = document.documentElement.cloneNode(true);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#ff8f00",
      contrastText: "#ffffff",
    },
    background: {
      default: "#E8EAF6",
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
    fontWeight: "bold",
    // width: '150px',
    // minWidth: '150px',
    // padding: theme.spacing(0, 1),
  },
  root: {
    background: "#4caf50",
  },
  checkTypography: {
    margin: theme.spacing(0, 1),
    fontWeight: 'bold',
  }
}));

function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function SaveAs(answersString) {
  let thisFileCode = thisFileCodeSnapshot.cloneNode(true);
  let x = thisFileCode.querySelectorAll("#save-input");

  x.forEach(function (element) {
    if (element.id === "save-input") {
      element.value = answersString;
    }
  });

  const filename = prompt("Save as:");
  if (filename !== "" && filename !== null) {
    download(filename + ".hapi.html", thisFileCode.innerHTML);
  }
}

function App(props) {
  const classes = useStyles(theme);

  let initialAnswers = JSON.parse(
    document.getElementById("save-input").value || "{}"
  );
  if (!Object.keys(initialAnswers).length) {
    // Get answers from local storage
    initialAnswers =
      JSON.parse(localStorage.getItem(props.structure.serialNumber)) || {};
  }
  const [answers, setAnswers] = React.useState(initialAnswers);
  const sectionCount = props.structure.sections.length;
  const [showSuccess, setShowSuccess] = React.useState(false);

  const lang = props.structure.language;
  if (lang !== undefined && strings.getLanguage() !== lang) {
    strings.setLanguage(lang);
  }

  const [topBarElevation, setTopBarElevation] = React.useState(0); // top bar elevation value (shadow)
  const handleScroll = () => {
    setTopBarElevation(window.pageYOffset !== 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll');
  }, []);

  /* When the user answers a question */
  const handleAnswer = (elementId, answer) => {
    const validationsCopy = Object.assign({}, elementsValidations);
    validationsCopy[elementId].helperText = " ";
    validationsCopy[elementId].showHelperText = false;
    validationsCopy[elementId].error = false;
    setElementsValidations(validationsCopy);

    const answersCopy = Object.assign({}, answers, { [elementId]: answer });
    setAnswers(answersCopy);
    localStorage.setItem(
      props.structure.serialNumber,
      JSON.stringify(answersCopy)
    );
  };

  const scrollTo = (eId, offset) => {
    scroller.scrollTo(eId, {
      duration: 1000,
      delay: 100,
      smooth: "easeInOutQuint",
      offset: offset,
    });
  };

  /* When the user attempts to check the whole activity */
  const handleSubmit = () => {
    let finishedSections = 0;

    props.structure.sections.forEach((se) => {
      finishedSections += checkSection(se) ? 1 : 0;
    });

    /* Find the first element that has an error and scroll to it */
    let elementId = "";
    allFillableElements.some((el) => {
      if (elementsValidations[el.id].error === true) {
        elementId = el.id;
        // acts as a break.
        return true;
      }
      return false;
    });

    if (elementId !== "") {
      scrollTo(elementId, -100);
    }

    if (finishedSections === sectionCount) {
      dropConfetti();
      setShowSuccess(true);
    }
  };

  /* Prompt for confirmation, erase all the answers and reload the activity */
  const resetActivity = () => {
    var conf = window.confirm(
      strings.dialogResetActivity
    );
    if (conf) {
      setAnswers({});
      localStorage.setItem(props.structure.serialNumber, JSON.stringify({}));
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.location.reload();
    }
  };

  /* When the user closes the success snackbar */
  const handleSuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSuccess(false);
  };

  const getSectionById = (sectionId) => {
    let section;
    props.structure.sections.forEach((se) => {
      if (se.id === sectionId) {
        section = se;
      }
    });

    return section;
  };

  const fillableTypes = ["multi-choice", "text-input", "number-input"];
  const allFillableElements = props.structure.sections
    .map((s) => s.elements.filter((e) => fillableTypes.includes(e.type)))
    .flat(1);
  const initialValidations = {};
  // {questionId: {error: (boolean), showHelperText: (boolean), helperText: (string)}}
  allFillableElements.forEach((element) => {
    initialValidations[element.id] = {
      error: false,
      showHelperText: false,
      helperText: " ",
    };
  });

  const [elementsValidations, setElementsValidations] = React.useState(
    initialValidations
  );

  const checkMultiChoiceElement = (
    element,
    elementId,
    answer,
    correctElements
  ) => {
    const validationsCopy = Object.assign({}, elementsValidations);
    let error = true;

    if (answer !== "") {
      // Check if the answer is right
      if (element.correct.includes(answer)) {
        correctElements.add(elementId);
        error = false;
      }

      validationsCopy[elementId].helperText = getPhrase(!error);
    } else {
      // This element has no answer in App's answers therefore its emepty and has to be filled.
      validationsCopy[elementId].helperText = strings.answerMissing;
    }

    validationsCopy[elementId].showHelperText = true;
    validationsCopy[elementId].error = error;
    setElementsValidations(validationsCopy);
  };

  const checkTextInputElement = (
    element,
    elementId,
    answer,
    correctElements
  ) => {
    const validationsCopy = Object.assign({}, elementsValidations);
    let error = true;

    if (
      elementId in answers &&
      answer.replace(/[ (\r\n|\r|\n)]/gi, "") !== ""
    ) {
      // Check if there is an answer, if there is then the element is correct.
      correctElements.add(elementId);
      error = false;

      validationsCopy[elementId].helperText = " ";
    } else {
      // This element has no answer in App's answers therefore its emepty and has to be filled.
      validationsCopy[elementId].helperText = strings.answerMissing;
    }

    validationsCopy[elementId].showHelperText = true;
    validationsCopy[elementId].error = error;
    setElementsValidations(validationsCopy);
  };

  const checkNumberInputElement = (
    element,
    elementId,
    answer,
    correctElements
  ) => {
    const validationsCopy = Object.assign({}, elementsValidations);
    let error = true;

    if (answer !== "") {
      // Check if the answer is right, which means the number is witin th given range.
      if (element.min <= answer && answer <= element.max) {
        correctElements.add(elementId);
        error = false;
      }

      validationsCopy[elementId].helperText = getPhrase(!error);
    } else {
      // This element has no answer in App's answers therefore its emepty and has to be filled.
      validationsCopy[elementId].helperText = strings.answerMissing;
    }

    validationsCopy[elementId].showHelperText = true;
    validationsCopy[elementId].error = error;
    setElementsValidations(validationsCopy);
  };

  /* Check section and return whether it's completely finished;
     section is an object */
  const checkSection = (section) => {
    let correctElements = new Set();

    section.elements.forEach((element) => {
      const questionId = element.id;
      const answer = answers[questionId] || "";

      switch (element.type) {
        case "text-input":
          checkTextInputElement(element, questionId, answer, correctElements);
          break;
        case "multi-choice":
          checkMultiChoiceElement(element, questionId, answer, correctElements);
          break;
        case "number-input":
          checkNumberInputElement(element, questionId, answer, correctElements);
          break;
        default:
          break;
      }
    });

    const fillableAmount = section.elements.filter((e) =>
      fillableTypes.includes(e.type)
    ).length;
    return correctElements.size === fillableAmount;
  };

  /* Same as 'checkSection' but the argument is id (string) and not section (object) */
  const checkSectionById = (sectionId) => {
    const section = getSectionById(sectionId);
    return checkSection(section);
  };

  const sections = [];
  props.structure.sections.forEach((section) => {
    sections.push(
      <Section
        header={section.header}
        elements={section.elements}
        answers={answers}
        validations={elementsValidations}
        onAnswer={handleAnswer}
        onCheck={checkSectionById}
        id={section.id}
        key={section.id}
      />
    );
  });

  const rtl = strings.direction === 'rtl';

  return (
    <ThemeProvider theme={theme}>
      <RTL active={rtl}>
        <CssBaseline />
        <div id="back-to-top-anchor" />
        <TopBar
          elevation={topBarElevation}
          mainHeader={props.structure.mainHeader}
          onDownload={() => {
            SaveAs(JSON.stringify(answers));
          }}
          onReset={resetActivity}
        />
        <Toolbar />
        <AppTableOfContents {...props}></AppTableOfContents>
        <Container maxWidth="md" className={classes.container}>
          {sections}
          <Box className={classes.checkAllBtnContainer}>
            <Fab
              variant="extended"
              color="secondary"
              className={classes.checkAllBtn}
              onClick={handleSubmit}
            >
              <CheckIcon />
              <Typography className={classes.checkTypography}>
                {strings.actionCheckAll}
              </Typography>
            </Fab>
          </Box>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: rtl ? "right" : "left",
            }}
            ContentProps={{
              classes: {
                root: classes.root,
              },
            }}
            open={showSuccess}
            autoHideDuration={6000}
            onClose={handleSuccessClose}
            message={strings.activityComplete}
            action={
              <React.Fragment>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={handleSuccessClose}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          />
        </Container>
        <ScrollTop {...props}>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </RTL>
    </ThemeProvider>
  );
}

export default App;
