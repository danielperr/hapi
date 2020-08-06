import React from 'react';


export default function Editable({ children, size, onChange }) {

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
