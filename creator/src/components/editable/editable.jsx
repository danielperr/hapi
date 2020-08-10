import React from 'react';
import './editable.css';

function Editable({ children, size, onChange }) {

  const handleChange = (e) => {
    onChange(e.target.value);
  }

  let sizeCName = ''
  if (size !== undefined) {
    sizeCName = `h${size}`
  }

  return (
    <textarea className={`editable ${sizeCName}`} value={children} onChange={handleChange}></textarea>
  );
}

export default Editable;
