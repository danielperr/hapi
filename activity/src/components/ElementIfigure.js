import React from 'react';


export class ElementIfigure extends React.Component {
    render() {
        return <iframe className="ifigure-embed embed"
                       frameBorder="0"
                       src="https://webhome.weizmann.ac.il/home/ifigures/ifigure.ifig.html"
                       scrolling="no" ></iframe>;
    }
}
