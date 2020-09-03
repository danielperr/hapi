import React from 'react';
import Editable from './editable/editable';
import produce from "immer";

function ElementDocs({ structure, onUpdate }) {

  const handleChange = (text) => {
    onUpdate(produce(structure, (newStructure) => {
        newStructure.src = text;
    }));
  };

  return (
    <>
      <Editable onChange={handleChange}>{structure.src}</Editable>
      <br />
      <br />
      <div
        style={{
          position: "relative",
          paddingBottom: "15%",
          paddingTop: 25,
          height: 0,
        }}
      >
        <iframe
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100px",
          }}
          className="override"
          src={structure.src}
        />
      </div>
    </>
  );
}

export default ElementDocs;
