class MultiChoiceAnswer extends React.Component {
    render() {
      const radioId = this.props.name + '-radio';
      return /*#__PURE__*/React.createElement("div", {
        key: this.props.name + '-inner-div'
      }, /*#__PURE__*/React.createElement("input", {
        type: "radio",
        name: this.props.inputName,
        value: this.props.name,
        id: radioId,
        key: radioId
      }), /*#__PURE__*/React.createElement("label", {
        htmlFor: radioId,
        key: this.props.name + '-label'
      }, this.props.text));
    }

  }