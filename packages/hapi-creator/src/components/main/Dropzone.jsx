import React, { createRef, useState } from 'react';

import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';

function Dropzone({ children, onRead, ...divProps }) {
  const [dragHovering, setDragHovering] = useState(false);

  const containerRef = createRef();
  const fileInputRef = createRef();

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleDragEnter = (e) => {
    if (e.target !== containerRef.current) {
      setDragHovering(true);
    }
  };

  const handleDragLeave = (e) => {
    if (e.target !== containerRef.current) {
      setDragHovering(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const readFile = () => {
    try {
      const file = fileInputRef.current.files[0];
      const fr = new FileReader();
      fr.onload = () => {
        onRead(fr.result);
      };
      fr.readAsText(file);
    } catch {
      // No file supplied
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    fileInputRef.current.files = e.dataTransfer.files;
    readFile();
    setDragHovering(false);
  };

  const handleFileChange = () => {
    readFile();
  };

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <Box
        ref={containerRef}
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{ backgroundColor: dragHovering ? '#FFFFDD' : 'inherit' }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...divProps}
        id="container"
      >
        {children}
      </Box>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </>
  );
}

Dropzone.propTypes = {
  children: PropTypes.node.isRequired,
  onRead: PropTypes.func,
};

Dropzone.defaultProps = {
  onRead: () => {},
};

export default Dropzone;
