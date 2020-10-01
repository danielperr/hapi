import React, { useState } from 'react';

import produce from 'immer';

import { FormControl, RadioGroup, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

import Checkbox from '../shared/checkbox';
import MultiChoiceOption from './multichoice-option';
import Editable from '../shared/editable';
import { makeid } from '../utils';
import { DEFAULT_MULTICHOICE_OPTION } from '../shared/constants';

const useStyles = makeStyles((theme) => ({
  addIcon: {
    marginTop: theme.spacing(1),
    marginRight: '-6px',
  },
}));

function ElementMultiChoice({ structure, onUpdate }) {
  const classes = useStyles();

  const options = structure.options || [];

  const handleChangeText = text => {
    onUpdate(produce(structure, newStructure => {
      newStructure.text = text;
    }));
  };

  const handleNewOption = () => {
    onUpdate(produce(structure, newStructure => {
      newStructure.options.push(produce(DEFAULT_MULTICHOICE_OPTION, newOption => {
        newOption.id = makeid(10);
      }));
    }));
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

  const handleDestroyOption = optionId => {
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
  
  return (
    <>
      <Editable onChange={handleChangeText}>{structure.text}</Editable>
      <FormControl style={{ width: '100%' }}>
        <RadioGroup name={structure.id} value={(structure.correct || [''])[0]}>
          {options.map((option) => (
            <MultiChoiceOption
              key={option.id}
              structure={option}
              name={structure.id}
              onUpdate={handleUpdateOption}
              onSelectCorrect={handleSelectCorrectOption}
              onDestroy={handleDestroyOption}
              checked={(structure.correct || []).includes(option.id)}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <br />
      <IconButton className={classes.addIcon} onClick={handleNewOption}>
        <AddIcon fontSize="small" />
      </IconButton>
      <br />
      <Checkbox
        id={structure.id + '-shuffle'}
        checked={!(structure.dontShuffle || false)}
        onCheck={handleCheckShuffle}
      >
        לסדר תשובות באופן אקראי?
      </Checkbox>
    </>
  );
}

export default ElementMultiChoice;
