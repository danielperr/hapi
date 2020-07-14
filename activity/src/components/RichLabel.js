import React from "react";
import ReactDOMServer from "react-dom/server";
import { Remarkable } from "remarkable";

export class RichLabel extends React.Component {
  constructor(props) {
    super(props);
    this.md = new Remarkable({
      html: false, // Enable HTML tags in source
      xhtmlOut: false, // Use '/' to close single tags (<br />)
      breaks: false, // Convert '\n' in paragraphs into <br>
    });

    const imageRule = (tokens, idx, _options, _env) => {
      return ReactDOMServer.renderToString(
        <img src={tokens[idx].src} className="markdown-image" />
      );
    };
    this.md.renderer.rules.image = imageRule;
  }
  render() {
    return (
      <label
        className={this.props.className}
        htmlFor={this.props.htmlFor}
        dangerouslySetInnerHTML={{
          __html: this.md.render(this.props.children),
        }}
      ></label>
    );
    // Setting HTML this way to allow rich text formatting and links
    // FIXME (xss vulnerability): make use of formatting components?
  }
}
