import React from 'react';
import { RichLabel } from './RichLabel';


export class ElementMultiLineTextInput extends React.Component {
    render() {
        return (<div className="text-input-element"
                     tag={this.props.name + "-innder-div"}>
                         <RichLabel key={this.props.name + "-label"}>
                             {this.props.text}
                         </RichLabel>
                         <textarea name={this.props.name}
                                   tag={this.props.name + "-input"}
                                   placeholder="טקסט"
                                   className="multiline-input-element" />
                </div>);
    }
}
