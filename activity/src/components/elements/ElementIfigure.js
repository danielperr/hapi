import React from "react";

class ElementIfigure extends React.Component {
  render() {
    return (
      <iframe
        title="iFigure applet"
        className="ifigure-embed embed"
        frameBorder="0"
        src="https://webhome.weizmann.ac.il/home/ifigures/ifigure.ifig.html"
        scrolling="no"
      ></iframe>
    );
  }
}

export default ElementIfigure;
