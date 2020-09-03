import React from "react";

import ReactMarkdown from 'react-markdown';
import { withStyles } from "@material-ui/core";

const CustomCss = withStyles({
  '@global': {
    'p': {
      marginTop: 0,
      marginBottom: 0,
    },
    'img': {
      maxWidth: '50%',
    },
  },
})(() => null);

function RichLabel(props) {
  return (
    <>
      <CustomCss />
      <label
        className={props.className}
        htmlFor={props.htmlFor}
        // dangerouslySetInnerHTML={{
        //   __html: md.render(props.children),
        // }}
      >
        <ReactMarkdown
          source={props.children}
          renderers={{link: props =>
            <a
              href={props.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.children}
            </a>}}
        />
      </label>
    </>
  );
}

export default RichLabel;
