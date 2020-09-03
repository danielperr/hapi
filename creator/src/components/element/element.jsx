import React from 'react';
import produce from 'immer';
import ElementLabel from '../element-label';
import ElementYoutube from '../element-youtube';
import ElementMultiChoice from '../element-multichoice';
import ElementTextInput from '../element-text-input';
import ElementImage from '../element-image';
import ElementNumberInput from '../element-number-input';
import ArrowButtons from '../arrow-buttons';
import Toolbar from '../toolbar';
import DeleteButton from '../delete-button';
import './element.css';
import ElementDocs from '../element-docs';


export default function Element({ structure, onUpdate, onDelete, onMoveUp, onMoveDown }) {
  const { type } = structure;

  /*
  const terms = {
    'label': ['text'], 
    'image': ['src'], 
    'youtube': ['youtubeId'],
    'multi-choice': ['text', 'options'],
    'text-input': ['text', 'multiline'],
    'number-input': ['text', 'min', 'max'],
  }
  */
  const handleChangeType = (e) => {
    onUpdate(produce(structure, newStructure => { 
      newStructure.type = e.target.value;
      if (newStructure.type == 'multi-choice' && newStructure.options === undefined) {
        newStructure.options = [];
      }
    }));
  };

  const handleUpdateElement = (updatedElement) => {
    onUpdate(updatedElement);
  };

  const handleDeleteSelf = () => {
    onDelete(structure.id);
  };

  const handleClickUp = () => {
    onMoveUp(structure.id);
  };

  const handleClickDown = () => {
    onMoveDown(structure.id);
  };

  const elementProps = {
    structure: structure,
    onUpdate: handleUpdateElement,
  };

  let obj;
  switch (structure.type) {
    case 'label':
      obj = <ElementLabel {...elementProps} />;
      break;
    case 'image':
      obj = <ElementImage {...elementProps} />;
      break;
    case 'youtube':
      obj = <ElementYoutube {...elementProps} />;
      break;
    case 'docs':
      obj = <ElementDocs {...elementProps} />;
      break;
    case 'multi-choice':
      obj = <ElementMultiChoice {...elementProps} />;
      break;
    case 'text-input':
      obj = <ElementTextInput {...elementProps} />;
      break;
    case 'number-input':
      obj = <ElementNumberInput {...elementProps} />;
      break;
    default:
      obj = <span style={{visibility: 'hidden'}}>אלמנט לא תקין</span>;
  }

  return (
    <div className="element">
      <Toolbar>
        <ArrowButtons onClickUp={handleClickUp} onClickDown={handleClickDown} />
        <select value={type} onChange={handleChangeType}>
          <optgroup label="תצוגה">
            <option value="label">טקסט</option>
            <option value="image">תמונה</option>
            <option value="youtube">סרטון</option>
            <option value="docs">Google Docs</option>
          </optgroup>
          <optgroup label="מילוי">
            <option value="multi-choice">שאלת בחירה</option>
            <option value="text-input">שאלת כתיבה</option>
            <option value="number-input">שאלת מספר</option>
          </optgroup>
        </select>
        <DeleteButton onClick={handleDeleteSelf} />
      </Toolbar>
      {obj}
    </div>
  );
}
