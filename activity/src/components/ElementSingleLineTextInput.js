import React from 'react';
import { RichLabel } from './RichLabel';


export class ElementSingleLineTextInput extends React.Component {
    render() {
        return (<div className="text-input-element"
                     tag={this.props.name + "-innder-div"}>
                         <RichLabel name={this.props.name + "-label"}>
                             {this.props.text}
                         </RichLabel>
                         <input type="text"
                                name={this.props.name}
                                tag={this.props.name + "-input"} />
                </div>);
    }
}
