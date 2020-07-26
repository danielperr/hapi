import React from 'react';
import { Paper, Button, FormControl, FormHelperText, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ElementLabel } from './ElementLabel';
import { ElementImage } from "./ElementImage";
import { ElementYoutube } from "./ElementYoutube";
import { ElementSingleLineTextInput } from "./ElementSingleLineTextInput";
import { ElementMultiLineTextInput } from "./ElementMultiLineTextInput";
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
      error: true,
      showError: false,
      helperText: ' ',
    }
  })
  const [validations, setValidations] = React.useState(initialValidations);
  const [isValidated, setIsValidated] = React.useState(false);
  const [sectionChecked, setSectionChecked] = React.useState(false);

  const checkablesAmount = props.elements.filter(element => element.correct !== undefined).length;
  let correctQuestions = new Set();



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


  const checkThisSection = () => {
    setIsValidated(true);
    console.log('check')
    props.elements.forEach((element) => {
      if (element.correct !== undefined) {
        const questionId = element.id;
        validations[questionId].showError = true;
        let error = true;
        if (questionId in answers) {
          // Check if the answer is right
          const answer = props.answers[element.id] || "";
          if (element.correct.includes(answer)) {
            correctQuestions.add(questionId);
            error = false;
          }
        }
        const validationsCopy = Object.assign({}, validations);
        validationsCopy[questionId].error = error;
        validationsCopy[questionId].helperText = getPhrase(!error);
        setValidations(validationsCopy);
      }
    })
  }


  if (props.check && !isValidated) {
    checkThisSection();
    // Return if all inputs are filled and/or correct
    console.log('props.id = ' + props.id);
    console.log('checkablesAmount = ' + checkablesAmount)
    console.log('correctQuestions.size = ' + correctQuestions.size)
    props.onCheck(props.id, (checkablesAmount === correctQuestions.size));
  } else if (!props.check && isValidated) {
    setIsValidated(false);
  }

  const elements = [];
  props.elements.forEach((element) => {
    let obj;
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

      case 'single-line-text-input':
        obj = <ElementSingleLineTextInput text={element.text}
          answer={answer}
          onAnswer={handleAnswer}
          id={element.id}
          key={element.id} />;
        break;

      case 'multi-line-text-input':
        obj = <ElementMultiLineTextInput text={element.text}
          answer={answer}
          onAnswer={handleAnswer}
          id={element.id}
          key={element.id} />;
        break;

      case 'multi-choice':
        const questionId = element.id;
        const validationState = validations[questionId];
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
