import React from "react";

export class SectionHeader extends React.Component {
  render() {
    return (
      <h1 className="section-header" name={this.props.name}>
        {this.props.text}
      </h1>
    );
  }
}
