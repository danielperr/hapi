import React from 'react';
import { RichLabel } from './RichLabel';


export class ElementMultiLineTextInput extends React.Component {
    constructor(props) {
        super(props);
        /* */
        this.answer = "";
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onAnswer(this.props.id, e.target.value);
    }

    render() {
        return (<div id={this.props.id} 
                     className="text-input-element"
                     key={this.props.id + "-D"}>
                        <RichLabel>
                            {this.props.text}
                        </RichLabel>
                        <textarea onChange={this.handleChange}
                                  placeholder="טקסט"
                                  className="multiline-input-element" 
                                  key={this.props.id + "-I"} />
                </div>);
    }
}