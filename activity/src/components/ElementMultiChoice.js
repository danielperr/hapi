import React from 'react';
import { MultiChoiceAnswer } from './MultiChoiceAnswer';


export class ElementMultiChoice extends React.Component {
    render() {
        const answers = [];
        const name = this.props.name + '-answer';
        let index = 0;
        this.props.correct.forEach(answer => {
            answers.push( /*#__PURE__*/React.createElement(MultiChoiceAnswer, {
                text: answer,
                inputName: this.props.name,
                name: name + index,
                key: name + index
            }));
            index++;
        });
        this.props.incorrect.forEach(answer => {
            answers.push( /*#__PURE__*/React.createElement(MultiChoiceAnswer, {
                text: answer,
                inputName: this.props.name,
                name: name + index,
                key: name + index
            }));
            index++;
        });
        return (<div className="multi-choice-element"
                     key={this.props.name + "-inner-div"}>
                         <label key={this.props.name + "-label"}>{this.props.text}</label>
                         <div className="answers"
                              key={this.props.name + "-answers-div"}>
                                  {answers}
                         </div>
                </div>);
    }
}