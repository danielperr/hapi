


class YoutubeEmbed extends React.Component {
    render() { 
        return React.createElement("iframe", {
            className: "embed youtube-embed",
            src: 'https://www.youtube.com/embed/E7wJTI-1dvQ',
            frameBorder: '0',
            allow: 'autoplay; encrypted-media',
            allowFullScreen: true,
            title: 'video',
        });
    }
}

// <ClosedAnswer id="" name="" index="" onSelect=""> answer </ClosedAnswer>
