import React from "react";
import { RichLabel } from "./RichLabel";

export class ElementLabel extends React.Component {
  render() {
    return <RichLabel className="label-element">{this.props.text}</RichLabel>;
  }
}
