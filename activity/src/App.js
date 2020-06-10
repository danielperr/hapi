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
    render() {
        const sections = [];
        this.props.data.sections.forEach((section, index) => {
            const sectionName = 'section' + index;
            sections.push(React.createElement(Section, {
                header: section.header,
                elements: section.elements,
                name: sectionName,
                key: sectionName
            }));
        });
        return React.createElement("div", null, React.createElement("form", null, React.createElement(MainHeader, {
            text: this.props.data.mainHeader
        }), React.createElement("div", {
            className: "container"
        }, sections)));
    }
}
