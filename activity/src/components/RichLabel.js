import React from "react";
import ReactDOMServer from "react-dom/server";
import { Remarkable } from "remarkable";
import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  p: {
    padding: 0,
  },
}));

export function RichLabel(props) {
  const classes = useStyles();

  const md = new Remarkable({
    html: false,  // Enable HTML tags in source
    xhtmlOut: false,  // Use '/' to close single tags (<br />)
    breaks: false,  // Convert '\n' in paragraphs into <br />
  });

  const imageRule = (tokens, idx, _options, _env) => {
    return ReactDOMServer.renderToString(
      <img src={tokens[idx].src} className="markdown-image" />
    );
  };

  md.renderer.rules.image = imageRule;

  return (
    <label
      className={props.className}
      htmlFor={props.htmlFor}
      dangerouslySetInnerHTML={{
        __html: md.render(props.children),
      }}
    ></label>
  );
}
