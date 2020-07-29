import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import { CssBaseline, Toolbar, Container, Button, Box, Fab, Snackbar, IconButton, } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Section } from "./components/Section";
import { TopBar } from "./components/TopBar";
import { dropConfetti } from "./confetti";
import CheckIcon from "@material-ui/icons/Check";


const thisFileCodeSnapshot = document.documentElement.cloneNode(true);

const theme = createMuiTheme({
  direction: "rtl",
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
    // maxWidth: "800px",
    marginTop: theme.spacing(2),
  },
  checkAllBtn: {
    marginTop: theme.spacing(-2),
    marginBottom: theme.spacing(0),
    fontWeight: "bold",
    fontSize: "1rem",
  },
  successSnackbarCloseIcon: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(-2),
  },
  root: {
    background: "#4caf50",
  },
  checkIcon: {
    marginLeft: theme.spacing(1),
  },
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

document.addEventListener("keypress", function (e) {
  if (e.keyCode === 13 || e.which === 13) {
    e.preventDefault();
    return false;
  }
});

export function App(props) {
  // Get the saved answers on this file
  const classes = useStyles(theme);
  const [_, forceUpdate] = React.useState();
  const [answers, setAnswers] = React.useState(
    JSON.parse(document.getElementById("save-input").value || "{}")
  );
  const [isAnswersLoaded, setIsAnswerLoaded] = React.useState(false);

  const [progress, setProgress] = React.useState(0); // top bar progress bar percentage
  const [topBarElevation, setTopBarElevation] = React.useState(0); // top bar elevation value (shadow)

  let [checkAll, setCheckAll] = React.useState(false); // whether to activate the "check answers" button in every section
  const sectionCount = props.structure.sections.length;

  let checkedSections = {};
  const [showSuccess, setShowSuccess] = React.useState(false);

  // console.log('App')

  const handleScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = Math.round((100 * winScroll) / height);
    setTopBarElevation(scrolled);
    // setProgress(scrolled);
  };

  if (!isAnswersLoaded) {
    window.addEventListener('scroll', handleScroll);
    if (!Object.keys(answers).length) {
      // Get the saved answers from local storage
      setAnswers(
        JSON.parse(localStorage.getItem(props.structure.serialNumber)) || {}
      );
      setIsAnswerLoaded(true);
    }
  }

  const handleAnswer = (sectionAnswers) => {
    const answersCopy = Object.assign({}, answers, sectionAnswers);
    setAnswers(answersCopy);
    localStorage.setItem(
      props.structure.serialNumber,
      JSON.stringify(answersCopy)
    );
  };

  const handleSubmit = () => {
    checkedSections = {};
    setCheckAll(true);
  };

  const handleSectionCheck = (sectionId, finished) => {
    checkedSections[sectionId] = finished;
    console.log(checkedSections);
    if (Object.keys(checkedSections).length === sectionCount) {
      let allFinished = true;
      for (const [key, value] of Object.entries(checkedSections)) {
        if (!value) {
          allFinished = false;
          break;
        }
      }
      if (allFinished) {
        dropConfetti();
        setShowSuccess(true);
      }
      setCheckAll(false);
    }
  };

  const resetActivity = () => {
    var conf = window.confirm("כל התשובות בפעילות זו יימחקו. להמשיך?");
    if (conf) {
      setAnswers({});
      localStorage.setItem(
        props.structure.serialNumber,
        JSON.stringify({})
      );
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.location.reload();
    }
  }

  const handleSuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowSuccess(false);
  };

  const sections = [];
  props.structure.sections.forEach((section) => {
    sections.push(
      <Section
        header={section.header}
        elements={section.elements}
        answers={answers}
        onAnswer={handleAnswer}
        check={checkAll}
        onCheck={handleSectionCheck}
        id={section.id}
        key={section.id}
      />
    );
  });

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TopBar
          progress={progress}
          elevation={topBarElevation}
          onDownload={() => {
            SaveAs(JSON.stringify(answers));
          }}
          onReset={resetActivity}
        />
        <Toolbar />
        <Container maxWidth="md" className={classes.container}>
          {sections}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="stretch"
            padding="10px 385px 10px 385px"
          >
            <Fab
              variant="extended"
              color="secondary"
              className={classes.checkAllBtn}
              onClick={handleSubmit}
            >
              <CheckIcon className={classes.checkIcon} />
              בדוק הכל
            </Fab>
          </Box>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            ContentProps={{
              classes: {
                root: classes.root,
              },
            }}
            open={showSuccess}
            autoHideDuration={6000}
            onClose={handleSuccessClose}
            message="כל הכבוד! השלמתם את הפעילות בהצלחה!"
            dir="rtl"
            action={
              <React.Fragment>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={handleSuccessClose}
                  className={classes.successSnackbarCloseIcon}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          />
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}
