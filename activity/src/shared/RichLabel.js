import React, { useRef, useEffect } from "react";

// import ReactMarkdown from 'react-markdown';
import Markdown from 'markdown-to-jsx';
import { withStyles } from "@material-ui/core";
import renderMathInElement from 'katex/dist/contrib/auto-render';

const CustomCss = withStyles({
  '@global': {
    'p': {
      marginTop: 0,
      marginBottom: 0,
    },
    'img': {
      maxWidth: '50%',
    },
    '.katex': {
      direction: 'ltr',
      flip: false,
      marginRight: '4px',
      marginLeft: '4px',
    },
    '.katex-html': {
      display: 'inline-flex',
      flexDirection: 'row',
    }
  },
})(() => null);

function RichLabel(props) {
  const labelRef = useRef(null);

  useEffect(() => {
    if (labelRef.current) {
      renderMathInElement(labelRef.current, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
        ],
      });
    }
  }, [labelRef]);

  return (
    <React.Fragment>
      <CustomCss />
      <label
        className={props.className}
        htmlFor={props.htmlFor}
        ref={labelRef}
      >
        {/* <ReactMarkdown
          source={props.children}
          renderers={{link: props =>
            <a
              href={props.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.children}
            </a>}}
        /> */}
        <Markdown>
          {props.children}
        </Markdown>
      </label>
    </React.Fragment>
  );
}

export default RichLabel;
