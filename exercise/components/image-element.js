class ImageElement extends React.Component {
render() {
    return /*#__PURE__*/React.createElement("img", {
    className: "image-element",
    src: this.props.src,
    key: this.props.name
    });
}

}