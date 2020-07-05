import React from 'react';
import { RichLabel } from './RichLabel';


export class ElementSingleLineTextInput extends React.Component {
    constructor(props) {
        super(props);
        //
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onAnswer(this.props.id, e.target.value)
    }

    render() {
        return (<div className="text-input-element"
                     key={this.props.id + "-D"}>
                         <RichLabel>
                             {this.props.text}
                         </RichLabel>
                         <input type="text"
                                onChange={this.handleChange}
                                id={this.props.id}
                                key={this.props.id + "-input"} />
                </div>);
    }
}
