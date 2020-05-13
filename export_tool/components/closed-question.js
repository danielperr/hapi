
class ClosedQuestion extends React.Component {
    constructor(props) {
      super(props);
      this.state = { selected: false, correct: false };
      this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(e) {
        const answerIndex = e.target.value;
        if (answerIndex == this.props.correctAnswer)
            this.setState({ correct: true, selected: true });
        else
            this.setState({ correct: false, selected: true });
    }
  
    render() {
      const answers = this.props.answers.map((answer, i) => {
        const id = 'answer-' + this.props.name + '-' + i;
        return React.createElement(ClosedAnswer, {
          name: this.props.name,
          id: id,
          key: id,
          index: i,
          onSelect: this.handleSelect
        }, answer);
      });

      let stateClassName = ''
      if (this.state.selected)
        stateClassName = this.state.correct ? 'correct' : 'incorrect';

      return React.createElement("div", {
            className: 'question ' + stateClassName,
            id: 'question-' + this.props.name
        }, React.createElement("span", null, this.props.children), React.createElement('div', {
            className: 'closed-answers'
        }, answers));
    }
  
  } // <ClosedQuestion name="" answers={['']} correctAnswer=""> question? </ClosedQuestion>