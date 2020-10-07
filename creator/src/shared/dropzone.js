import React, { createRef } from "react";

function Dropzone(props) {
  const { children, onRead } = props;

  const containerRef = createRef();
  const fileInputRef = createRef();

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleDragEnter = () => {
    containerRef.current.style.backgroundColor = '#FFFFDD';
  };

  const handleDragLeave = () => {
    containerRef.current.style.backgroundColor = 'inherit';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    fileInputRef.current.files = e.dataTransfer.files;
    readFile();
    containerRef.current.style.backgroundColor = 'inherit';
  };

  const handleFileChange = (e) => {
    readFile();
  };

  const readFile = () => {
    const file = fileInputRef.current.files[0];
    const fr = new FileReader();
    fr.onload = function() {
      onRead(fr.result);
    };
    fr.readAsText(file);
  };

  return (
    <>
      <div
        ref={containerRef}
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        {...props}
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
    </>
  );
}

export default Dropzone;
