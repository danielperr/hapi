import React from 'react';
import { Paper, Button, FormControl, FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ElementLabel } from './ElementLabel';
import { ElementImage } from "./ElementImage";
import { ElementYoutube } from "./ElementYoutube";
import { ElementTextInput } from "./ElementTextInput";
import { ElementMultiChoice } from "./ElementMultiChoice";
import { SectionHeader } from "./SectionHeader";
import { ElementMathInput } from './ElementMathInput';
import { getPhrase } from '../utils';


const useStyles = makeStyles((theme) => ({
  sectionPaper: {
    marginBottom: theme.spacing(4),
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
}));


/*
  Provides an area for placing visuals and interactives.
  Each section is like a page
  <Section
    header (string): section title
    elements (list): list of elements of this section
    answers (object): answers for questions (provided from a save)
    onAnswer (function): callback fcn for when an answer changes - accepts (answers (object))
    id (string): id of the section
  />
*/
export function Section(props) {
  const classes = useStyles();
  const [answers, setAnswers] = React.useState({});
  const [checkText, setCheckText] = React.useState('');
  const [error, setError] = React.useState(false);
  // {questionId: {error: (boolean), showError: (boolean), helperText: (string)}}
  const initialValidations = {};
  props.elements.forEach((element) => {
    initialValidations[element.id] = {
      error: false,
      showError: false,
      helperText: ' ',
    }
  })
  const [validations, setValidations] = React.useState(initialValidations);
  const [isValidated, setIsValidated] = React.useState(false);
  const [sectionChecked, setSectionChecked] = React.useState(false);

  const handleAnswer = (questionId, answer) => {
    answers[questionId] = answer;
    props.onAnswer(answers);
    setError(false);
    setCheckText("");
    // setIsValidated(false);
    validations[questionId].showError = false;
    validations[questionId].helperText = ' ';
    setValidations(validations);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    checkThisSection();
  }

  const checkMultiChoiceElement = (elementId, answer) => {
    const questionId = element.id;
    validations[questionId].showError = true;
    let error = true;

    if (questionId in answers) {
      // Check if the answer is right
      const answer = props.answers[element.id] || "";
      if (element.correct.includes(answer)) {
        checkInputElement(answer);
        correctQuestions.add(questionId);
        error = false;
      }
    }
    const validationsCopy = Object.assign({}, validations);
    validationsCopy[questionId].error = error;
    validationsCopy[questionId].helperText = getPhrase(!error);
    setValidations(validationsCopy);
  }
  
  const checkInputElement = (value) => {
    const questionId = element.id;
    validations[questionId].showError = true;
    let error = true;

    checkInputElement()

    if (questionId in answers) {
      // Check if the answer is right
      const answer = props.answers[element.id] || "";
      if (element.correct.includes(answer)) {
        checkInputElement(answer);
        correctQuestions.add(questionId);
        error = false;
      }
    }
    const validationsCopy = Object.assign({}, validations);
    validationsCopy[questionId].error = error;
    validationsCopy[questionId].helperText = getPhrase(!error);
    setValidations(validationsCopy);
  }

  const checkThisSection = () => {
    setIsValidated(true);

    props.elements.forEach((element) => {
      const questionId = element.id;
      if (questionId in answers) {
        // Check if the answer is right
        const answer = props.answers[element.id] || "";
        switch (element.type) {
          case 'text-input':
            checkInputElement(questionId, answer);
            break;
    
          case 'multi-choice':
            checkMultiChoiceElement(questionId, answer);
            break;
          
          default:
            break;
        }
      }
    })
  }


  if (props.check && !isValidated) {
    checkThisSection();
    // Return if all inputs are filled and/or correct
    props.onCheck(props.id, (checkablesAmount === correctQuestions.size));
  } else if (!props.check && isValidated) {
    setIsValidated(false);
  }

  const elements = [];
  props.elements.forEach((element) => {
    let obj, validationState;

    const answer = props.answers[element.id] || "";

    if (answer !== "") {
      answers[element.id] = answer;
    }

    switch (element.type) {
      case 'label':
        obj = <ElementLabel text={element.text}
          id={element.id}
          key={element.id} />;
        break;

      case 'image':
        obj = <ElementImage src={element.src}
          id={element.id}
          key={element.id} />;
        break;

      case 'youtube':
        obj = <ElementYoutube youtubeId={element.youtubeId}
          id={element.id}
          key={element.id} />;
        break;

      case 'text-input':
        validationState = validations[element.id];
        obj = <ElementTextInput
          text={element.text}
          multiline={element.multiline}
          error={validationState.error}
          showError={validationState.showError}
          helperText={validationState.helperText}
          answer={answer}
          onAnswer={handleAnswer}
          id={element.id}
          key={element.id} />;
        break;

      case 'multi-choice':
        validationState = validations[element.id];
        obj = <ElementMultiChoice
          text={element.text}
          correct={element.correct}
          options={element.options}
          dontShuffle={element.dontShuffle}
          error={validationState.error}
          showError={validationState.showError}
          helperText={validationState.helperText}
          answer={answer}
          onAnswer={handleAnswer}
          id={element.id}
          key={element.id}
        />;
        break;

      default:
        obj = <label>{"אלמנט לא מזוהה"}</label>;
    }
    elements.push(<div className="element"
      id={element.id}
      key={element.id + "-D"}>
      {obj}
      <br />
    </div>);
  });


  return (
    <Paper
      // elevation={5}
      className={classes.sectionPaper}
    >
      <SectionHeader
        text={props.header}
        name={props.id + "-H"}
      />
      <form
        onSubmit={handleSubmit}
        className="section-elements"
        key={props.id + "-D"}
      >
        {elements}
        {checkablesAmount > 0 &&
          <FormControl
            error={error}
          >
            <FormHelperText>{checkText}</FormHelperText>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                בדוק תשובות
              </Button>
          </FormControl>
        }
      </form>
    </Paper>
  );
}
