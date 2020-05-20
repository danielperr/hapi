class MultiLineTextInputElement extends React.Component {
    render() {
        return /*#__PURE__*/React.createElement("div", {
            className: "text-input-element",
            tag: this.props.name + '-inner-div'
        }, /*#__PURE__*/React.createElement("label", {
            key: this.props.name + '-label'
        }, this.props.text), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
            type: "text",
            name: this.props.name,
            tag: this.props.name + '-input'
        }));
    }
}
