import React from 'react';

// class ElementIfigure extends React.Component {
function ElementIfigure() {
  return (
    <iframe
      title="iFigure applet"
      className="ifigure-embed embed"
      frameBorder="0"
      src="https://webhome.weizmann.ac.il/home/ifigures/ifigure.ifig.html"
      scrolling="no"
    />
  );
}

export default ElementIfigure;
