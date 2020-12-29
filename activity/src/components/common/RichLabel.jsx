import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { BlockMath, InlineMath } from 'react-katex';
import { withStyles } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import math from 'remark-math';
import 'katex/dist/katex.min.css';

const CustomCss = withStyles({
  '@global': {
    p: {
      marginTop: 0,
      marginBottom: 0,
    },
    img: {
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

function RichLabel({
  className,
  htmlFor,
  href,
  children,
}) {
  const labelRef = useRef(null);

  return (
    <>
      <CustomCss />
      <label
        className={className}
        htmlFor={htmlFor}
        ref={labelRef}
      >
        <ReactMarkdown
          plugins={[math]}
          renderers={{
            link: () => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            ),
            // eslint-disable-next-line react/prop-types
            inlineMath: ({ value }) => <InlineMath math={value} />,
            // eslint-disable-next-line react/prop-types
            math: ({ value }) => <BlockMath math={value} />,
          }}
        >
          {children}
        </ReactMarkdown>
      </label>
    </>
  );
}

RichLabel.propTypes = {
  className: PropTypes.string,
  htmlFor: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
};

RichLabel.defaultProps = {
  className: '',
  htmlFor: '',
  href: '',
};

export default RichLabel;
