import React from 'react';


export default function Checkbox({ children, id }) {
  return (
    <div className="checkbox">
      <input type="checkbox" id={id} />
      <label htmlFor={id}>{children}</label>
    </div>
  )
}
