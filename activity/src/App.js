import React from 'react';
import { Section } from './components/Section'
import { MainHeader } from './components/MainHeader'
import { TopBar} from './components/TopBar'
import { ThemeProvider } from '@material-ui/core/styles';
import { indigo, purple, lightGreen, red, blue, green } from '@material-ui/core/colors';
import { pink } from '@material-ui/core/colors';

import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: red[500],
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            // light: will be calculated from palette.primary.main,
            main: green[400],
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffcc00',
        },
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold: 3,
        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
    },
});


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
                            <ThemeProvider theme={ theme }>
                            <TopBar progress={66}/>
                            <MainHeader text={this.props.structure.mainHeader} />
                            <div className="container">
                                {sections}
                            </div>
                            </ThemeProvider>
                        </center>
                    </form>
                </div>);
    }
}
