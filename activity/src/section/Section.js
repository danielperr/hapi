import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button } from '@material-ui/core';

import SectionHeader from './SectionHeader';
import {
  ElementLabel,
  ElementImage,
  ElementYoutube,
  ElementDocs,
  ElementTextInput,
  ElementMultiChoice,
  ElementNumberInput,
  ElementLatex,
} from '../elements';
import { strings } from '../shared/localization';

const useStyles = makeStyles((theme) => ({
  sectionPaper: {
    borderRadius: '8px',
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
function Section(props) {
  const classes = useStyles();

  const checkablesTypes = ['multi-choice', 'number-input'];
  const checkablesAmount = props.elements.filter(element => checkablesTypes.includes(element.type)).length;

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

    const feedback = props.feedback[element.id] || "";
    const answer = props.answers[element.id] || "";

    switch (element.type) {
      case 'label':
        obj = <ElementLabel 
          text={element.text}
          id={element.id}
          key={element.id} 
        />;
        break;

      case 'image':
        obj = <ElementImage 
          src={element.src}
          id={element.id}
          key={element.id} 
        />;
        break;

      case 'docs':
        obj = <ElementDocs 
          src={element.src}
          id={element.id}
          key={element.id}
        />
        break;

      case 'youtube':
        obj = <ElementYoutube 
          youtubeId={element.youtubeId}
          id={element.id}
          key={element.id} 
        />;
        break;
      
      case 'latex':
        obj = <ElementLatex
          latex={element.latex}
          id={element.id}
          key={element.id}
        />;
        break;
        
      case 'text-input':
        obj = <ElementTextInput
          text={element.text}
          multiline={element.multiline}
          error={feedback.error}
          showHelperText={feedback.showHelperText}
          helperText={feedback.helperText}
          answer={answer}
          onAnswer={handleAnswer}
          id={element.id}
          key={element.id}
        />;
        break;

      case 'multi-choice':
        obj = <ElementMultiChoice
          text={element.text}
          correct={element.correct}
          options={element.options}
          dontShuffle={element.dontShuffle}
          error={feedback.error}
          showHelperText={feedback.showHelperText}
          helperText={feedback.helperText}
          answer={answer}
          onAnswer={handleAnswer}
          id={element.id}
          key={element.id}
        />;
        break;
      
      case 'number-input':
        obj = <ElementNumberInput
          text={element.text}
          error={feedback.error}
          helperText={feedback.helperText}
          showHelperText={feedback.showHelperText}
          answer={answer}
          onAnswer={handleAnswer}
          id={element.id}
          key={element.id}
        />;
        break;
      
      default:
        obj = <label>{strings.unknownElement}</label>;
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
      id={props.id}
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
            {strings.actionCheckAnswer}
          </Button>
        }
      </form>
    </Paper>
  );
}

export default Section;
