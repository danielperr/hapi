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
        this.importAnswers = this.importAnswers.bind(this);
    }
    
    componentDidMount() {
        this.importAnswers();
    }

    handleAnswer(sectionAnswers) {
        Object.assign(this.answers, sectionAnswers);
        this.forceUpdate();
        localStorage.setItem(this.props.structure.serialNumber, JSON.stringify(this.answers));
        console.log(this.answers)
    }

    importAnswers() {
        this.answers = JSON.parse(localStorage.getItem(this.props.structure.serialNumber)) || {};
        this.forceUpdate();
    }

    render() {
        const sections = [];
        this.props.structure.sections.forEach((section) => {
            sections.push(<Section header={section.header}
                                   elements={section.elements}
                                   answers={this.answers}
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
