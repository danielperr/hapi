import React, { useState } from 'react';
import produce from 'immer';
import Editable from '../editable/editable';
import Section from '../section/section';
import { makeid } from '../../utils';
import { DEFAULT_STRUCTURE, DEFAULT_SECTION } from '../../constants';
import './app.css';

function App(props) {
  const initialStructure = DEFAULT_STRUCTURE;
  initialStructure.id = makeid(20);
  const [structure, setStructure] = useState(initialStructure);

  const handleChangeMainHeader = (text) => {
    setStructure(produce(structure, newStructure => {
      newStructure.mainHeader = text;
    }));
  };

  const handleUpdateSection = (updatedSection) => {
    setStructure(produce(structure, newStructure => {
      newStructure.sections.forEach(section => {
        if (section.id === updatedSection.id) {
          Object.assign(section, updatedSection);
        }
      })
    }));
  };

  const handleClickAddSection = () => {
    setStructure(produce(structure, newStructure => {
      newStructure.sections.push(produce(DEFAULT_SECTION, newSection => { newSection.id = makeid(10); }));
    }));
  };

  const handleDeleteSection = (sectionId) => {
    setStructure(produce(structure, newStructure => {
      newStructure.sections.forEach((section, index, object) => {
        if (section.id === sectionId) {
          object.splice(index, 1);
        }
      });
    }))
  };

  const sections = [];
  structure.sections.forEach(section => {
    sections.push(
      <Section
        structure={section}
        onUpdate={handleUpdateSection}
        onDelete={handleDeleteSection}
        key={section.id}
      />);
  });

  return (
    <div className="app">
      <div className="menu">
        <textarea dir="ltr" value={JSON.stringify(structure)} readOnly={true}></textarea>
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
