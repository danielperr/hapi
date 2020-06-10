import React from 'react';


// <ElementYoutube name="" youtubeId="" />
export class ElementYoutube extends React.Component {
    render() {
        // When creating this element pass the yotube Id only
        const youtubeId = this.props.youtubeId;
        return (<div style={{position: "relative",
                             paddingBottom: "56.25%",
                             paddingTop: 25,
                             height: 0}}
                     key={this.props.name + "-div"}>
                         <iframe style={{position: "absolute",
                                         top: 0,
                                         left: 0,
                                         width: "100%",
                                         height: "100%"}}
                                 className="youtube-embed embed"
                                 src={`https://www.youtube.com/embed/${youtubeId}`}
                                 frameBorder="0"
                                 allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                 allowFullScreen={true}
                                 title="video"
                                 key={this.props.name}></iframe>
                </div>);
    }
}

/*
class YoutubeElement extends React.Component {
    render() {
        return React.createElement("iframe", {
            className: "youtube-embed embed",
            src: this.props.src,
            frameBorder: "0",
            allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
            allowFullScreen: true,
            title: "video",
            key: this.props.name
        });
    }
}
*/