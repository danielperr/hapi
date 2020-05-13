class SectionHeader extends React.Component {
    render() {
      return /*#__PURE__*/React.createElement("h2", {
        className: "section-header",
        name: this.props.name
      }, this.props.text);
    }

  }