import React from 'react';

import { v1 as uuid } from 'uuid';

export default function Checkbox({ children, id, checked, onCheck }) {

  const handleChange = e => {
    if (onCheck !== undefined) {
      onCheck(e.target.checked);
    }
  };

  if (checked === undefined) {
    checked = false;
  }

  return (
    <div>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handleChange}
        key={uuid(4)}  // checkbox won't uncheck otherwise, this is a dumb workaround.
      />
      <label htmlFor={id}>{children}</label>
    </div>
  );
}
