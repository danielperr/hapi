class LabelElement extends React.Component {
    render() {
        return /*#__PURE__*/React.createElement("label", {
            className: "label-element",
            key: this.props.name,
            dangerouslySetInnerHTML: {
                __html: this.props.text
            }
        });
    }
}
