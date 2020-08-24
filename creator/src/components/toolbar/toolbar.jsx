import React from 'react';
import './toolbar.css';

function Toolbar({ children }) {
  const childrenWithClases = [];
  children.forEach((child, index) => {
    if (React.isValidElement(child)) {
      childrenWithClases.push(React.cloneElement(child, {
        className: `${child.props.className} toolbar-child`,
        key: `toolbarChild${index}`,
      }));
    }
  });

  return <div className="toolbar">{childrenWithClases}</div>;
}

export default Toolbar;
