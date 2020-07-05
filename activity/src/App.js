import React from 'react';
import { Section } from './components/Section'
import { MainHeader } from './components/MainHeader'

document.addEventListener('keypress', function (e) {
    if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
    }
});

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.answers = {};
        //
        this.handleAnswer = this.handleAnswer.bind(this);
    }

    handleAnswer(sectionAnswers) {
        console.log('App::handleAnswer()')
        Object.assign(this.answers, sectionAnswers);
        console.log(this.answers)
    }

    render() {
        const sections = [];
        this.props.structure.sections.forEach((section) => {
            sections.push(<Section header={section.header}
                                   elements={section.elements}
                                   onAnswer={this.handleAnswer}
                                   id={section.id}
                                   key={section.id} />);
        });
        return (<div>
                    <form>
                        <center>
                            <MainHeader text={this.props.structure.mainHeader} />
                            <div className="container">
                                {sections}
                            </div>
                        </center>
                    </form>
                </div>);
    }
}
