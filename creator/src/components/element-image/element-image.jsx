import React from "react";
import Editable from "../editable";
import produce from "immer";
import "./element-image.css";

function ElementImage({ structure, onUpdate }) {
  const handleChange = (text) => {
    onUpdate(
      produce(structure, (newStructure) => {
        newStructure.src = text;
      })
    );
  };

  return (
    <>
      <Editable onChange={handleChange}>{structure.src}</Editable>
      <br />
      <br />
      <img
        className="element-image"
        src={structure.src}
        onerror="this.onerror=null; this.src='https://www.0404.co.il/wp-content/uploads/2019/10/valley-3916972__480.jpg';" 
      />
    </>
  );
}

export default ElementImage;
