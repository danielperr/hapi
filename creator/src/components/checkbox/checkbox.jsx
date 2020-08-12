import React from 'react';


export default function Checkbox({ children, id, checked, onCheck }) {

  const handleChange = e => {
    onCheck(e.target.checked);
  };

  return (
    <div className="checkbox">
      <input type="checkbox" id={id} checked={checked.toString()} onChange={handleChange} />
      <label htmlFor={id}>{children}</label>
    </div>
  );
}
