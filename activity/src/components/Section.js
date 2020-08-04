import React from 'react';
import { Paper, Button, FormControl, FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ElementLabel } from './ElementLabel';
import { ElementImage } from "./ElementImage";
import { ElementYoutube } from "./ElementYoutube";
import { ElementTextInput } from "./ElementTextInput";
import { ElementMultiChoice } from "./ElementMultiChoice";
import { ElementNumberInput } from "./ElementNumberInput";
import { SectionHeader } from "./SectionHeader";


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
    onAnswer (function): callback fcn for when an answer changes - accepts (an element Id & the answer)
    id (string): id of the section
  />
*/
export function Section(props) {
  const classes = useStyles();
  const checkablesAmount = props.elements.filter(element => element.type === 'multi-choice').length;

  /* When the user answers on a question (changes its 'answer' state) */
  const handleAnswer = (questionId, answer) => {
    props.onAnswer(questionId, answer);
  };

  /* When the user attempts to check this section */
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onCheck(props.id);
  }

  const elements = [];
  props.elements.forEach((element) => {
    let obj;

    const validationState = props.validations[element.id] || "";
    const answer = props.answers[element.id] || "";

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
        obj = <ElementTextInput
          text={element.text}
          multiline={element.multiline}
          error={validationState.error}
          showHelperText={validationState.showHelperText}
          helperText={validationState.helperText}
          answer={answer}
          onAnswer={handleAnswer}
          id={element.id}
          key={element.id} />;
        break;

      case 'multi-choice':
        obj = <ElementMultiChoice
          text={element.text}
          correct={element.correct}
          options={element.options}
          dontShuffle={element.dontShuffle}
          error={validationState.error}
          showHelperText={validationState.showHelperText}
          helperText={validationState.helperText}
          answer={answer}
          onAnswer={handleAnswer}
          id={element.id}
          key={element.id}
        />;
        break;
      
      case 'number-input':
        obj = <ElementNumberInput
          text={element.text}
          error={validationState.error}
          helperText={validationState.helperText}
          showHelperText={validationState.showHelperText}
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            בדוק תשובות
          </Button>
        }
      </form>
    </Paper>
  );
}
