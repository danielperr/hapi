
class ClosedAnswer extends React.Component {
    render() {
        return React.createElement("div", {
            className: "closed-answer",
            onChange: this.props.onSelect
          }, React.createElement("input", {
            type: "radio",
            id: this.props.id,
            name: this.props.name,
            value: this.props.index
          }), React.createElement("label", {
            className: "clickable",
            htmlFor: this.props.id
          }, this.props.children));
    }
}

// <ClosedAnswer id="" name="" index="" onSelect=""> answer </ClosedAnswer>