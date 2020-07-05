import React from 'react';
import { ElementLabel } from './ElementLabel';
import { ElementImage } from "./ElementImage";
import { ElementYoutube } from "./ElementYoutube";
import { ElementSingleLineTextInput } from "./ElementSingleLineTextInput";
import { ElementMultiLineTextInput } from "./ElementMultiLineTextInput";
import { ElementMultiChoice } from "./ElementMultiChoice";
import { SectionHeader } from "./SectionHeader";
import { ElementMathInput } from './ElementMathInput';


export class Section extends React.Component {
    constructor(props) {
        super(props);
        this.answers = {};
        //
        this.handleAnswer = this.handleAnswer.bind(this);
    }

    handleAnswer(questionId, answer) {
        console.log('Section::handleAnswer()')
        this.answers[questionId] = answer;
        this.props.onAnswer(this.answers);
    }

    render() {
        const elements = [];
        this.props.elements.forEach((element) => {
            let obj;
            const answer = this.props.answers[element.id] || "";
            switch (element.type) {
                case 'label':
                    obj = <ElementLabel text={element.text}
                                        id={element.id}
                                        key={element.id} />;
                    break;
                case 'image':
                    obj = <ElementImage src={element.src}
                                        id={element.id}
                                        key={element.id} />;
                    break;
                case 'youtube':
                    obj = <ElementYoutube youtubeId={element.youtubeId}
                                          id={element.id}
                                          key={element.id} />;
                    break;
                case 'single-line-text-input':
                    obj = <ElementSingleLineTextInput text={element.text}
                                                      answer={answer}
                                                      onAnswer={this.handleAnswer}
                                                      id={element.id}
                                                      key={element.id} />;
                    break;
                case 'multi-line-text-input':
                        obj = <ElementMultiLineTextInput text={element.text}
                                                         answer={answer}
                                                         onAnswer={this.handleAnswer}
                                                         id={element.id}
                                                         key={element.id} />;
                        break;
                case 'multi-choice':
                    obj = <ElementMultiChoice text={element.text}
                                              correct={element.correct}
                                              incorrect={element.incorrect}
                                              answer={answer}
                                              onAnswer={this.handleAnswer}
                                              id={element.id}
                                              key={element.id} />;
                    break;
                // case 'math-input':
                //     obj = <ElementMathInput text={element.text}
                //                             value={element.value}
                //                             onAnswer={this.handleAnswer}
                //                             id={element.id}
                //                             key={element.id} />
                //     break;
                default:
                    obj = <label>{"אלמנט לא מזוהה"}</label>;
            }
            elements.push(<div className="element"
                               id={element.id}
                               key={element.id + "-D"}>
                                   {obj}
                                   <br />
                          </div>);
        });
        return (<div className="section">
                    <SectionHeader text={this.props.header}
                                   name={this.props.id + "-H"} />
                    <div className="section-elements"
                         key={this.props.id + "-D"}>
                             {elements}
                    </div>
               </div>);
    }
}
