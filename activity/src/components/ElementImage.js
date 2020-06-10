import React from 'react';


export class ElementImage extends React.Component {
    render() {
        return /*#__PURE__*/React.createElement("img", {
            className: "image-element center",
            src: this.props.src,
            key: this.props.name
        });
    }
}
