import React from "react";

import RichLabel from "../shared/RichLabel";

class ElementLabel extends React.Component {
  render() {
    return <RichLabel className="label-element">{this.props.text}</RichLabel>;
  }
}

export default ElementLabel;
