import React from 'react';
import produce from 'immer';
import Checkbox from './checkbox/checkbox';
import MultiChoiceOption from './multichoice-option';
import Editable from './editable/editable';
import { makeid } from '../utils';
import { DEFAULT_MULTICHOICE_OPTION } from '../constants';

function ElementMultiChoice({ structure, onUpdate }) {

  const { id, text } = structure;
  const options = structure.options || [];

  const handleChangeText = text => {
    onUpdate(produce(structure, newStructure => {
      newStructure.text = text;
    }));
  };

  const handleClickAddOption = () => {
    onUpdate(produce(structure, newStructure => {
      newStructure.options.push(produce(DEFAULT_MULTICHOICE_OPTION, newOption => {
        newOption.id = makeid(10);
      }))
    }))
  };

  const handleUpdateOption = updatedOption => {
    onUpdate(produce(structure, newStructure => {
      newStructure.options.forEach(option => {
        if (option.id === updatedOption.id) {
          Object.assign(option, updatedOption);
        }
      })
    }));
  };

  const handleSelectCorrectOption = optionId => {
    onUpdate(produce(structure, newStructure => {
      newStructure.correct = [optionId];
    }));
  };

  const handleDeleteOption = optionId => {
    onUpdate(produce(structure, newStructure => {
      newStructure.options.forEach((option, index, object) => {
        if (option.id === optionId) {
          object.splice(index, 1);
        }
      });
    }));
  };

  const handleCheckShuffle = shuffle => {
    onUpdate((produce(structure, newStructure => {
      if (shuffle) {
        delete newStructure['dontShuffle'];
      } else {
        newStructure.dontShuffle = true;
      }
    })));
  };

  const optionsDom = [];
  options.forEach(option => {
    optionsDom.push(
      <MultiChoiceOption
        structure={option}
        name={id}
        select={true}
        onUpdate={handleUpdateOption}
        onSelectCorrect={handleSelectCorrectOption}
        onDeleteSelf={handleDeleteOption}
        key={option.id}
      />);
  });
  
  return (
    <>
      <Editable onChange={handleChangeText}>{text}</Editable>
      <div className="multichoice">
        {optionsDom}
      </div>
      <br />
      <button onClick={handleClickAddOption}><b>הוסף תשובה</b></button>
      <br /><br />
      <Checkbox id={id + '-shuffle'} checked={!(structure.dontShuffle || false)} onCheck={handleCheckShuffle}>לסדר תשובות באופן אקראי?</Checkbox>
    </>
  );
}

export default ElementMultiChoice;
