import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  formControlLabel: {
    margin: -theme.spacing(0.25),
  },
  formHelperText: {
    margin: theme.spacing(1, 1, 2, 0),
    textAlign: "right",
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
  richLabel: {
    cursor: "pointer",
  },
  divider: {
    marginBottom: theme.spacing(4),
  },
}));

export function ElementTextInput(props) {
  const classes = useStyles();

  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  let [value, setValue] = React.useState(props.answer);
  const [isChanged, setIsChanged] = React.useState(false);

  // if (props.id == 'Iwsci4gu2b') {
  //   console.log('ElementTextInput');
  // }

  const reset = () => {
    setSeconds(0);
    setIsActive(false);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setIsChanged(true);
    setValue(e.target.value);
    setSeconds(0);
    setIsActive(true);
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      if (seconds >= 1) {
        // Pop up a snackbar (Save successfully)
        console.log("saved");
        console.log("answer: " + value);
        props.onAnswer(props.id, value);
        reset();
      } else {
        interval = setInterval(() => {
          setSeconds((seconds) => seconds + 0.5);
        }, 500);
      }
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);


  return (
    <FormControl noValidate autoComplete="off" fullWidth={true} className={props.formControl}>
      <FormLabel component="legend">
          {props.text}
      </FormLabel>
      <br />
        <TextField
            onChange={handleChange}
            defaultValue={props.answer}
            // multiline={false}
            // rows={5}
            // fullWidth={true}
            variant="outlined"
            // InputProps={{ disableUnderline: true }}
        />
      <FormHelperText className={classes.formHelperText}>
        {props.helperText}
      </FormHelperText>
      <Divider className={classes.divider} />
    </FormControl>
  );
}

/*

export function ElementMultiChoice(props) {
  const classes = useStyles();
  const [options, setOptions] = React.useState(props.options);
  let [value, setValue] = React.useState('');
  value = props.answer;
  let optionDoms = [];

  useEffect(() => {
    if (!props.dontShuffle) {
      setOptions(shuffle(options));
    }
  }, [])

  options.forEach(option => {
    optionDoms.push(
      <FormControlLabel
        value={option.id}
        className={classes.formControlLabel}
        control={
          <Radio
            checked={ !!(props.answer && option.id == props.answer) }
            color="secondary"
            id={option.id}
          />
        }
        label={
          <RichLabel
            htmlFor={option.id}
            className={classes.richLabel}
          >
            {option.text}
          </RichLabel>
        }
        key={option.id}
      />
    )
  });

  const handleRadioChange = (event) => {
    const selectedOptionId = event.target.value
    props.onAnswer(props.id, selectedOptionId);
    setValue(selectedOptionId);
  };

  return (
    <FormControl
      fullWidth={true}
      component="fieldset"
      error={props.showError && props.error}
      className={props.formControl}
    >
      <FormLabel
        component="legend"
      >
        {props.text}
      </FormLabel>
      <br />
      <RadioGroup
        aria-label="quiz"
        name="quiz"
        value={value}
        onChange={handleRadioChange}
      >
        {optionDoms}
      </RadioGroup>
      <FormHelperText
        className={classes.formHelperText}
      >
        {props.helperText}
      </FormHelperText>
      <Divider
        className={classes.divider}
      />
    </FormControl>
  );
}

export class ElementMultiLineTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.answer = "";
        //
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onAnswer(this.props.id, e.target.value);
    }

    render() {
        return (<div id={this.props.id} 
                     className="text-input-element"
                     key={this.props.id + "-D"}>
                        <RichLabel>
                            {this.props.text}
                        </RichLabel>
                        <textarea value={this.props.answer}
                                  onChange={this.handleChange}
                                  placeholder="טקסט"
                                  className="multiline-input-element" 
                                  key={this.props.id + "-I"} />
                </div>);
    }
}
 */
