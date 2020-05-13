class YoutubeElement extends React.Component {
    render() {
      return /*#__PURE__*/React.createElement("iframe", {
        className: "multichoice-element",
        width: "560",
        height: "315",
        src: this.props.src,
        frameBorder: "0",
        allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
        allowFullScreen: true,
        key: this.props.name
      });
    }

  }