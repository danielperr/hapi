import React from 'react';


export class MainHeader extends React.Component {
    render() {
        return /*#__PURE__*/React.createElement("h1", {
            className: "main-header"
        }, this.props.text);
    }
}
