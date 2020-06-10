import React from 'react';
import { ElementLabel } from './ElementLabel';
import { ElementImage } from "./ElementImage";
import { ElementYoutube } from "./ElementYoutube";
import { ElementSingleLineTextInput } from "./ElementSingleLineTextInput";
import { ElementMultiLineTextInput } from "./ElementMultiLineTextInput";
import { ElementMultiChoice } from "./ElementMultiChoice";
import { SectionHeader } from "./SectionHeader";


export class Section extends React.Component {
    render() {
        const elements = [];
        this.props.elements.forEach((element, index) => {
            let obj;
            const name = this.props.name + '-element' + index;

            switch (element.type) {
                case 'label':
                    obj = /*#__PURE__*/React.createElement(ElementLabel, {
                        text: element.text,
                        name: name,
                        key: name
                    });
                    break;

                case 'image':
                    obj = /*#__PURE__*/React.createElement(ElementImage, {
                        src: element.src,
                        name: name,
                        key: name
                    });
                    break;

                case 'youtube':
                    obj = /*#__PURE__*/React.createElement(ElementYoutube, {
                        youtubeId: element.youtubeId,
                        name: name,
                        key: name
                    });
                    break;

                case 'single-line-text-input':
                    obj = /*#__PURE__*/React.createElement(ElementSingleLineTextInput, {
                        text: element.text,
                        name: name,
                        key: name
                    });
                    break;

                case 'multi-line-text-input':
                        obj = /*#__PURE__*/React.createElement(ElementMultiLineTextInput, {
                            text: element.text,
                            name: name,
                            key: name
                        });
                        break;

                case 'multi-choice':
                    obj = /*#__PURE__*/React.createElement(ElementMultiChoice, {
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
