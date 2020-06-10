import React from 'react';


export class ElementLabel extends React.Component {
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
