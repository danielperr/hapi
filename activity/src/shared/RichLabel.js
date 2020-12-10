import React, { useRef, useEffect } from "react";

import { withStyles } from "@material-ui/core";
import ReactMarkdown from 'react-markdown';
import { InlineMath, BlockMath } from 'react-katex';
import math from 'remark-math';
import 'katex/dist/katex.min.css';

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
  },
})(() => null);

function RichLabel(props) {
  const labelRef = useRef(null);

  return (
    <React.Fragment>
      <CustomCss />
      <label
        className={props.className}
        htmlFor={props.htmlFor}
        ref={labelRef}
      >
        <ReactMarkdown
          plugins={[math]}
          renderers={{
            link: (prohtmlKatexps) => (
              <a
                href={props.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {props.children}
              </a>
            ),
            inlineMath: ({value}) => <InlineMath math={value} />,
            math: ({value}) => <BlockMath math={value} />
          }}
        >
          {props.children}
        </ReactMarkdown>
      </label>
    </React.Fragment>
  );
}

export default RichLabel;
