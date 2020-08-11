import React, { useState } from 'react';
import Editable from '../editable/editable';
import Section from '../section/section';
import { makeid, deepcopy } from '../../utils';
import { DEFAULT_STRUCTURE, DEFAULT_SECTION } from '../../constants';
import './app.css';

function App(props) {
  const initialStructure = DEFAULT_STRUCTURE;
  initialStructure.id = makeid(20);
  const [structure, setStructure] = React.useState(initialStructure);

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
      <div>
        <Editable size={1} onChange={handleChangeMainHeader}>{structure.mainHeader}</Editable>
      </div>
      {sections}
      <br />
      <button onClick={handleClickAddSection}><b>הוסף יחידה</b></button>
    </div>
  );
}

export default App;
