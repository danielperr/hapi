class MultiChoiceElement extends React.Component {
    render() {
      const answers = [];
      const name = this.props.name + '-answer';
      let index = 0;
      this.props.correct.forEach(answer => {
        answers.push( /*#__PURE__*/React.createElement(MultiChoiceAnswer, {
          text: answer,
          inputName: this.props.name,
          name: name + index,
          key: name + index
        }));
        index++;
      });
      this.props.incorrect.forEach(answer => {
        answers.push( /*#__PURE__*/React.createElement(MultiChoiceAnswer, {
          text: answer,
          inputName: this.props.name,
          name: name + index,
          key: name + index
        }));
        index++;
      });
      return /*#__PURE__*/React.createElement("div", {
        className: "multi-choice-element",
        key: this.props.name + '-innner-div'
      }, /*#__PURE__*/React.createElement("label", {
        key: this.props.name + '-label'
      }, this.props.text), /*#__PURE__*/React.createElement("div", {
        className: "answers",
        key: this.props.name + '-answers-div'
      }, answers));
    }

  }