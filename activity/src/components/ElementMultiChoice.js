import React from 'react';
import { MultiChoiceAnswer } from './MultiChoiceAnswer';
import { RichLabel } from './RichLabel';
import { shuffle } from '../utils'


export class ElementMultiChoice extends React.Component {
    constructor(props) {
        super(props);
        //
        this.handleAnswer = this.handleAnswer.bind(this);
    }

    handleAnswer(answer) {
        console.log('ElementMultiChoice::handleAnswer()')
        this.props.onAnswer(this.props.id, answer);
    }

    render() {
        const answers = shuffle([...this.props.correct, ...this.props.incorrect]);
        const answerComponents = [];
        answers.forEach(answer => {
            answerComponents.push(<MultiChoiceAnswer text={answer.text}
                                            inputName={this.props.id}
                                            checked={(this.props.answer && answer.id == this.props.answer)}
                                            onAnswer={this.handleAnswer}
                                            id={answer.id}
                                            key={answer.id} />)
        });
        return (<div className="multi-choice-element"
                     id={this.props.id}
                     key={this.props.id + "-D"}>
                         <RichLabel>
                             {this.props.text}
                         </RichLabel>
                         <div className="answers"
                              key={this.props.id + "-AD"}>
                                  {answerComponents}
                         </div>
                </div>);
    }
}
