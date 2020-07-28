import React from 'react';
import { RichLabel } from './RichLabel';
import { addStyles, EditableMathField } from 'react-mathquill'

addStyles()


export class ElementMathInput extends React.Component {
    constructor (props) {
        super(props);
        this.state = { latex: this.props.value };
    }

    render() {
        return (<div className="math-input-element"
                     key={this.props.name + "-innder-div1"}>
                         <RichLabel>
                             {this.props.text}
                         </RichLabel>
                         <input type="hidden"
                                name={this.props.name}
                                key={this.props.name + "-input"}
                                value={this.state.latex || ''} />
                         <div dir="ltr"
                              className="math-input-div"
                              key={this.props.name + "-inner-div2"}>
                                  <EditableMathField latex={this.props.value}
                                                     key={this.props.name + "-mathfield"}
                                                     onChange={(mathField) => { this.setState({ latex: mathField.latex() }) }} />
                         </div>
                </div>);
    }
}
