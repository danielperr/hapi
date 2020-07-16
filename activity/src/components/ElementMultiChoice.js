import React from 'react';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { shuffle } from '../utils';
import { RichLabel } from './RichLabel';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  formHelperText: {
    margin: theme.spacing(1, 1, 2, 0),
    textAlign: "right",
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
  richLabel: {
    cursor: 'pointer',
  },
}));

export function ElementMultiChoice(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState(' ');
  const [answers, setAnswers] = React.useState([...props.correct, ...props.incorrect]);
  let answerDOMs = [];

  useEffect(() => {
    setAnswers(shuffle(answers));
  }, [])

  answers.forEach(answer => {
    answerDOMs.push(
      <FormControlLabel
        value={answer.id}
        control={<Radio checked={(props.answer && answer.id == props.answer)} id={answer.id}/>}
        label={<RichLabel htmlFor={answer.id} className={classes.richLabel}>{answer.text}</RichLabel>}
      />
    )
  });
  
  const correctIds = props.correct.map(answer => {
    return answer.id;
  });

  const handleRadioChange = (event) => {
    const selectedAnswerId = event.target.value
    props.onAnswer(props.id, selectedAnswerId);
    setValue(selectedAnswerId);
    setHelperText(' ');
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (correctIds.includes(value)) {
      setHelperText('כל הכבוד');
      setError(false);
    } else {
      setHelperText('תשובה לא נכונה');
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl component="fieldset" error={ error } className={ classes.formControl }>
        <FormLabel component="legend">{ props.text }</FormLabel>
        <RadioGroup aria-label="quiz" name="quiz" value={ value } onChange={ handleRadioChange }>
          { answerDOMs }
        </RadioGroup>
        <FormHelperText margin="normal" fullWidth className={ classes.formHelperText }>
          { helperText }
        </FormHelperText>
        <Button type="submit" variant="outlined" color="primary" className={ classes.button }>
          Check Answer
        </Button>
      </FormControl>
    </form>
  );
}





/* <ElementMultiChoice text={element.text}
                       correct={element.correct}
                       incorrect={element.incorrect}
                       answer={answer}
                       onAnswer={this.handleAnswer}
                       id={element.id}
                       key={element.id} />; */
// import React from 'react';
// import { MultiChoiceAnswer } from './MultiChoiceAnswer';
// import { RichLabel } from './RichLabel';
// import { shuffle } from '../utils'
// import IconMenuBook from '@material-ui/icons/MenuBook';

// export class ElementMultiChoice extends React.Component {
//     constructor(props) {
//         super(props);
//         //
//         this.handleAnswer = this.handleAnswer.bind(this);

//         this.elementAnswers = [...this.props.correct, ...this.props.incorrect]
//         this.elementAnswers = shuffle(this.elementAnswers);
//     }

//     handleAnswer(answer) {
//         this.props.onAnswer(this.props.id, answer);
//     }

//     render() {
//         const answers = [];
//         this.elementAnswers.forEach(answer => {
//             answers.push(
//                 <MultiChoiceAnswer text={answer.text}
//                                         inputName={this.props.id}
//                                         checked={(this.props.answer && answer.id == this.props.answer)}
//                                         onAnswer={this.handleAnswer}
//                                         id={answer.id}
//                                         key={answer.id} />)
//         });

//         return (<div className="multi-choice-element"
//                      id={this.props.id}
//                      key={this.props.id + "-D"}>
//                          <RichLabel>
//                              {this.props.text}
//                          </RichLabel>
//                          <div className="answers"
//                               key={this.props.id + "-AD"}>
//                                   {answers}
//                          </div>
//                 </div>);
//     }
// }
