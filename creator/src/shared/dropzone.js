import React, { createRef, useState } from "react";

function Dropzone(props) {
  const { children, onRead, ...divProps } = props;

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
  }

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    fileInputRef.current.files = e.dataTransfer.files;
    readFile();
    setDragHovering(false);
  };

  const handleFileChange = (e) => {
    readFile();
  };

  const readFile = () => {
    try {
      const file = fileInputRef.current.files[0];
      const fr = new FileReader();
      fr.onload = function() {
        onRead(fr.result);
      };
      fr.readAsText(file);
    } catch {
      // No file supplied
    }
  };

  return (
    <React.Fragment>
      <div
        ref={containerRef}
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{ backgroundColor: dragHovering ? '#FFFFDD' : 'inherit' }}
        {...divProps}
        id="container"
      >
        {children}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{display: 'none'}}
      />
    </React.Fragment>
  );
}

export default Dropzone;
