import React, { useState } from 'react';
import Editable from './components/Editable';
import Section from './components/Section';
import { makeid, deepcopy } from './utils';
import logo from './logo.svg';
import './App.css';


const DEFAULT_STRUCTURE = {
  mainHeader: "פעילות ריקה",
  sections: [],
};

const DEFAULT_SECTION = {
  header: "יחידה ריקה",
  elements: [],
};

export const DEFAULT_ELEMENT = {
  type: "label",
};


function App(props) {
  const initialStructure = DEFAULT_STRUCTURE;
  initialStructure.id = makeid(20);
  const [structure, setStructure] = React.useState(props.structure);

  const handleChangeMainHeader = (text) => {
    const structureCopy = deepcopy(structure)
    Object.assign(structureCopy, {mainHeader: text})
    setStructure(structureCopy);
  }

  const handleChangeSection = (updatedSection) => {
    let structureCopy = deepcopy(structure);
    structureCopy.sections.forEach(section => {
      if (section.id === updatedSection.id) {
        Object.assign(section, updatedSection);
        console.log({section, updatedSection});
      }
    })
    setStructure(structureCopy);
  }

  const handleClickAddSection = () => {
    const structureCopy = deepcopy(structure);
    const newSection = deepcopy(DEFAULT_SECTION);
    console.log(DEFAULT_SECTION)
    newSection.id = makeid(10);  // FIXME: check if id exists
    structureCopy.sections.push(newSection);
    setStructure(structureCopy);
  }

  const sections = [];
  structure.sections.forEach(section => {
    sections.push(<Section structure={section} onChange={handleChangeSection} />);
  });

  return (
    <div className="app">
      <div className="menu">
        <textarea dir="ltr" value={JSON.stringify(structure)}></textarea>
      </div>
      <Editable size={1} onChange={handleChangeMainHeader}>{structure.mainHeader}</Editable>
      {sections}
      <br />
      <button onClick={handleClickAddSection}><b>הוסף יחידה</b></button>
    </div>
  );
}

export default App;
