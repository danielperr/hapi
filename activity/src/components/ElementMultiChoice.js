import React from 'react';
import { MultiChoiceAnswer } from './MultiChoiceAnswer';
import { RichLabel } from './RichLabel';
import { shuffle } from '../utils'
import IconMenuBook from '@material-ui/icons/MenuBook';

export class ElementMultiChoice extends React.Component {
    constructor(props) {
        super(props);
        //
        this.handleAnswer = this.handleAnswer.bind(this);

        this.elementAnswers = [...this.props.correct, ...this.props.incorrect]
        this.elementAnswers = shuffle(this.elementAnswers);
    }

    handleAnswer(answer) {
        this.props.onAnswer(this.props.id, answer);
    }

    render() {
        const answers = [];
        this.elementAnswers.forEach(answer => {
            answers.push(
                <MultiChoiceAnswer text={answer.text}
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
                                  {answers}
                         </div>
                </div>);
    }
}
