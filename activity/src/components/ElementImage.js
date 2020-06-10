import React from 'react';


export class ElementImage extends React.Component {
    render() {
        return <img className="image-element center"
                    src={this.props.src}
                    key={this.props.name} />;
    }
}
