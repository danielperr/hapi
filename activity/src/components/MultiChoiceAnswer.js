import React from 'react';
import { RichLabel } from './RichLabel';


export class MultiChoiceAnswer extends React.Component {
    constructor(props) {
        super(props);
        //
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        console.log('MultiChoiceAnswer::handleSelect()')
        this.props.onAnswer(this.props.id)
    }

    render() {
        return (<div id={this.props.id}
                     key={this.props.id + "-D"}>
                    <input type="radio"
                           name={this.props.inputName}
                           checked={this.props.checked}
                           onChange={this.handleChange}
                           id={this.props.id + "-R"}
                           key={this.props.id + "-R"} />
                    <RichLabel htmlFor={this.props.id + "-R"}>
                                   {this.props.text}
                    </RichLabel>
                </div>);
    }
}
