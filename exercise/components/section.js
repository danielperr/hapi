class Section extends React.Component {
    render() {
        const elements = [];
        this.props.elements.forEach((element, index) => {
        let obj;
        const name = this.props.name + '-element' + index;

        switch (element.type) {
            case 'label':
            obj = /*#__PURE__*/React.createElement(LabelElement, {
                text: element.text,
                name: name,
                key: name
            });
            break;

            case 'image':
            obj = /*#__PURE__*/React.createElement(ImageElement, {
                src: element.src,
                name: name,
                key: name
            });
            break;

            case 'youtube':
            obj = /*#__PURE__*/React.createElement(YoutubeElement, {
                src: element.src,
                name: name,
                key: name
            });
            break;

            case 'textinput':
            obj = /*#__PURE__*/React.createElement(TextInputElement, {
                text: element.text,
                name: name,
                key: name
            });
            break;

            case 'multichoice':
            obj = /*#__PURE__*/React.createElement(MultiChoiceElement, {
                text: element.text,
                correct: element.correct,
                incorrect: element.incorrect,
                name: name,
                key: name
            });
            break;

            default:
            obj = /*#__PURE__*/React.createElement("label", {
                key: name
            }, "element type not available.");
        }

        elements.push( /*#__PURE__*/React.createElement("div", {
            className: "element",
            key: name + '-div'
        }, obj, /*#__PURE__*/React.createElement("br", null)));
        });
        return /*#__PURE__*/React.createElement("div", {
        className: "section"
        }, /*#__PURE__*/React.createElement(SectionHeader, {
        text: this.props.header,
        name: this.props.name + '-header'
        }), /*#__PURE__*/React.createElement("div", {
        className: "section-elements",
        key: this.props.name + '-div'
        }, elements));
    }

}