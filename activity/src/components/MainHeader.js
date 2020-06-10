import React from 'react';


export class MainHeader extends React.Component {
    render() {
        return <h1 className="main-header">{this.props.text}</h1>
    }
}
