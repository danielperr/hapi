import React from "react";

// <ElementYoutube id="" youtubeId="" />
class ElementYoutube extends React.Component {
  render() {
    // When creating this element pass the yotube Id only
    const youtubeId = this.props.youtubeId;
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
            height: "100%",
          }}
          className="youtube-embed embed"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={true}
          title="video"
        />
      </div>
    );
  }
}

export default ElementYoutube;
