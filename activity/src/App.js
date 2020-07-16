import React from 'react';
import Grid from '@material-ui/core/Grid'
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { indigo, purple, green, yellow, grey} from '@material-ui/core/colors';
import { CssBaseline, Toolbar, Container } from '@material-ui/core';
import { Section } from './components/Section'
import { MainHeader } from './components/MainHeader'
import { TopBar} from './components/TopBar'


const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#7b1fa2",
        },
        secondary: {
            main: "#ffca28",
            contrastText: '#ffcc00',
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
    spacing: 8,
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
        this.state = { progress: 0 };
        //
        this.handleScroll = this.handleScroll.bind(this);
        this.handleAnswer = this.handleAnswer.bind(this);
        this.importAnswers = this.importAnswers.bind(this);
    }
    
    componentDidMount() {
        this.importAnswers();
        window.addEventListener('scroll', this.handleScroll);
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = Math.round(100 * winScroll / height);
        this.setState({ progress: scrolled, });
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
        return (<React.Fragment>
                    <CssBaseline />
                    <ThemeProvider theme={ theme }>
                        <TopBar progress={this.state.progress}/>
                        <Toolbar />
                        <Container maxWidth="md">
                            <Grid spacing={4}
                                  direction="column"
                                  alignItems="stretch">
                                      {sections}
                            </Grid>
                        </Container>
                    </ThemeProvider>
                </React.Fragment>);
    }
}
