import React from 'react';
import { RichLabel } from './RichLabel';


export class ElementLabel extends React.Component {
    render() {
        return <RichLabel className="label-element"
                          name={this.props.name}>
                              {this.props.text}
                          </RichLabel>
                      // Setting HTML this way to allow rich text formatting and links
                      // FIXME (xss vulnerability): make use of formatting components?
    }
}
