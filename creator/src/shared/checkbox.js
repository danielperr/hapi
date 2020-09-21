import React from 'react';

import { makeid } from '../shared/utils';

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
        key={makeid(4)}  // checkbox won't uncheck otherwise, this is a dumb workaround.
      />
      <label htmlFor={id}>{children}</label>
    </div>
  );
}
