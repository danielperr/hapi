import React from 'react';
import Checkbox from './Checkbox';
import MultiChoiceOption from './MultiChoiceOption';
import Editable from './Editable';


export default function ElementMultiChoice({ structure }) {

  const options = [];
  structure.options.forEach((option) => {
    options.push(<MultiChoiceOption structure={option} name={structure.id} select={true} />);
  });
  
  return (
    <>
      <Editable>{structure.text}</Editable>
      <div className="multichoice">
        {options}
      </div>
      <br />
      <Checkbox id={structure.id + '-shuffle'}>לסדר תשובות באופן אקראי?</Checkbox>
    </>
  );
}
