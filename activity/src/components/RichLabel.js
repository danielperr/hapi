import React from 'react';
import { Remarkable } from 'remarkable';


export class RichLabel extends React.Component {
    constructor (props) {
        super(props);
        this.md = new Remarkable({
            html: false, // Enable HTML tags in source
            xhtmlOut: false, // Use '/' to close single tags (<br />)
            breaks: false, // Convert '\n' in paragraphs into <br>
        });
        console.log(this.md.render(this.props.children));
    }
    render() {
        return (<label className={this.props.className}
                      htmlFor={this.props.htmlFor}
                      dangerouslySetInnerHTML={{__html: this.md.render(this.props.children)}}>
               </label>);
                      // Setting HTML this way to allow rich text formatting and links
                      // FIXME (xss vulnerability): make use of formatting components?
    }
}
