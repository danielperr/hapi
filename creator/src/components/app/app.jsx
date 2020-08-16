import React, { useState } from "react";
import Editable from "../editable/editable";
import Section from "../section/section";
import { makeid, deepcopy } from "../../utils";
import { DEFAULT_STRUCTURE, DEFAULT_SECTION } from "../../constants";
import "./app.css";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import DragAndDrop from "../drag-and-drop";


function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function SaveWorkFile(structure) {
  const filename = prompt("Save as:");
  if (filename !== "" && filename !== null) {
    download(filename + ".hapi.txt", structure);
  }
}

function LoadWorkFile(structure) {}

function Export(structure) {}

const SingleFileAutoSubmit = (props) => {
  const toast = (innerHTML) => {
    const el = document.getElementById("toast");
    el.innerHTML = innerHTML;
    el.className = "show";
    setTimeout(() => {
      el.className = el.className.replace("show", "");
    }, 3000);
  };

  const getUploadParams = () => {
    return { url: "https://httpbin.org/post" };
  };

  const handleChangeStatus = ({ meta, remove }, status) => {
    if (status === "headers_received") {
      toast(`${meta.name} uploaded!`);
    } else if (status === "aborted") {
      toast(`${meta.name}, upload failed...`);
    }
  };

  const handleSubmit = (files, allFiles) => {
    try {
      props.changeStructure(
        JSON.parse(JSON.parse(files[0].xhr.response).files.file)
      );
    } catch (error) {
      console.log(error);
    }

    console.log();
    allFiles.forEach((f) => f.remove());
  };

  return (
    <React.Fragment>
      <div id="toast">Upload</div>
      <Dropzone
        className="dropzone"
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        maxFiles={1}
        multiple={false}
        canCancel={true}
        onSubmit={handleSubmit}
        inputContent=""
        InputComponent={null}
        styles={{
          dropzone: {
            pointerEvents: "none",
            position: "fixed",
            top: 0,
            right: 0,
            width: "100%",
            height: "100%",
            overflow: "hidden",
          },
          dropzoneActive: { borderColor: "green" },
        }}
      />
      <br />
    </React.Fragment>
  );
};



function App(props) {
  const initialStructure = DEFAULT_STRUCTURE;
  initialStructure.id = makeid(20);
  //const [structure, setStructure] = React.useState(props.structure);
  const [structure, setStructure] = React.useState(initialStructure);

  const handleChangeMainHeader = (text) => {
    const structureCopy = deepcopy(structure);
    Object.assign(structureCopy, { mainHeader: text });
    setStructure(structureCopy);
  };

  const handleChangeSection = (updatedSection) => {
    let structureCopy = deepcopy(structure);
    structureCopy.sections.forEach((section) => {
      if (section.id === updatedSection.id) {
        Object.assign(section, updatedSection);
        console.log({ section, updatedSection });
      }
    });
    setStructure(structureCopy);
  };

  const handleClickAddSection = () => {
    const structureCopy = deepcopy(structure);
    const newSection = deepcopy(DEFAULT_SECTION);
    console.log(DEFAULT_SECTION);
    newSection.id = makeid(10); // FIXME: check if id exists
    structureCopy.sections.push(newSection);
    setStructure(structureCopy);
  };

  const sections = [];
  structure.sections.forEach((section) => {
    sections.push(
      <Section structure={section} onChange={handleChangeSection} />
    );
  });

  const changeStructure = (newStructure) => {
    setStructure(newStructure);
  };

  return (
    <div className="app">
      {/*<SingleFileAutoSubmit changeStructure={changeStructure} />*/}
      <DragAndDrop changeStructure={changeStructure}/>
      <div className="button-menu">
        <button
          onClick={() => {
            SaveWorkFile(JSON.stringify(structure, null, 2));
          }}
        >
          Save Work file
        </button>
        <button>Load Work file</button>
        <button>Export Activity</button>
      </div>
      <div className="menu">
        <textarea
          dir="ltr"
          value={JSON.stringify(structure, null, 2)}
        ></textarea>
      </div>
      <div>
        <Editable size={1} onChange={handleChangeMainHeader} isRich={true}>
          {structure.mainHeader}
        </Editable>
      </div>
      {sections}
      <br />
      <button onClick={handleClickAddSection}>
        <b>הוסף יחידה</b>
      </button>
    </div>
  );
}

export default App;
