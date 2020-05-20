class IfigureEmbed extends React.Component {
    render() { 
        return React.createElement("iframe", {
            className: "ifigure-embed embed",
            frameBorder: '0',
            src: "https://webhome.weizmann.ac.il/home/ifigures/ifigure.ifig.html",
            scrolling: "no",
        });
    }
}
