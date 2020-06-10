import React from 'react';


export class ElementLabel extends React.Component {
    render() {
        return <label className="label-element"
                      key={this.props.name}
                      dangerouslySetInnerHTML={{__html: this.props.text}}></label>
                      // Setting HTML this way to allow rich text formatting and links
                      // FIXME (xss vulnerability): make use of formatting components?
    }
}
