import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { indigo, purple, green, yellow, grey } from '@material-ui/core/colors';
import { CssBaseline, Toolbar, Container, Button } from '@material-ui/core';
import { Section } from './components/Section'
import { MainHeader } from './components/MainHeader'
import { TopBar } from './components/TopBar'


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#ffd600",
      contrastText: '#ffcc00',
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
  }
}));


function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function SaveAs(answersString) {
  // Get the code of this file
  document.getElementById("mybestinput").value = answersString;
  let thisFile = document.documentElement.innerHTML;
  let filename = prompt('Save as:');
  if (filename !== '' && filename !== null) {
    download(filename + ".hapi.html", thisFile);
  }
}

document.addEventListener('keypress', function (e) {
  if (e.keyCode === 13 || e.which === 13) {
    e.preventDefault();
    return false;
  }
});

export function App(props) {
  // Get the saved answers on this file
  const classes = useStyles(theme);
  const [_, forceUpdate] = React.useState();
  const [answers, setAnswers] = React.useState(JSON.parse(document.getElementById("mybestinput").value || "{}"));
  const [progress, setProgress] = React.useState(0);
  const [topBarElevation, setTopBarElevation] = React.useState(0);

  useEffect(() => {
    if (!Object.keys(answers).length) {
      // Get the saved answers from local storage
      importAnswers();
    }
    window.addEventListener('scroll', handleScroll);
  }, [])

  const handleScroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = Math.round(100 * winScroll / height);
    setTopBarElevation(scrolled)
    setProgress(scrolled);
  };

  const handleAnswer = (sectionAnswers) => {
    setAnswers(Object.assign({}, answers, sectionAnswers));
    localStorage.setItem(props.structure.serialNumber, JSON.stringify(answers));
    console.log(answers);
  };

  const importAnswers = () => {
    setAnswers(JSON.parse(localStorage.getItem(props.structure.serialNumber)) || {});
  };

  const sections = [];
  props.structure.sections.forEach((section) => {
    sections.push(
      <Section
        header={section.header}
        elements={section.elements}
        answers={answers}
        onAnswer={handleAnswer}
        id={section.id}
        key={section.id}
      />
    );
  });

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TopBar progress={progress} elevation={topBarElevation} />
        <Toolbar />
        <Container
          maxWidth="md"
          className={classes.container}
        >
            {sections}
        </Container>
      </ThemeProvider>
      <Button onClick={() => { SaveAs(JSON.stringify(answers)) }}>Download As</Button>
    </React.Fragment>
  );
}
