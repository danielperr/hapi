import React from 'react';
import './toolbar.css';

function Toolbar({ children }) {
  const childrenWithClases = [];
  children.forEach(child => {
    if (React.isValidElement(child)) {
      childrenWithClases.push(React.cloneElement(child, {className: "toolbar-child"}));
    }
  });

  return <div className="toolbar">{childrenWithClases}</div>;
}

export default Toolbar;
