import React from "react";

// <ElementDocs id="" src="" />
export class ElementDocs extends React.Component {
  render() {
    return (
      <div
        style={{
          position: "relative",
          paddingBottom: "56.25%",
          paddingTop: 25,
          height: 0,
        }}
        key={this.props.id + "-div"}
      >
        <iframe
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100px",
          }}
          className="override"
          src={this.props.src}
        />
      </div>
    );
  }
}