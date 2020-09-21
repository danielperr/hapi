import React, { useState, useEffect } from "react";

import produce from "immer";
import styled from 'styled-components';

import { makeid } from "../shared/utils";
import { DEFAULT_STRUCTURE, DEFAULT_SECTION } from "../shared/constants";
import Editable from "../shared/editable";
import DragAndDrop from "../shared/drag-and-drop";
import Section from "./section";
import Menu from './menu';


// Cache the empty activity file.
let emptyActivityFile = "";

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

function InjectStructureToActivity(emtpyActivity, structure) {
  // Copy the file to f
  let f = emtpyActivity.slice();

  const index = f.indexOf("structure=");
  const firstSign = f.indexOf("{", index);
  const secondSign = f.indexOf("}", index + 1);
  f = f.substring(0, firstSign) + structure + f.substring(secondSign + 1);
  return f;
}

function Export(emptyActivity, structure) {
  const filename = prompt("Save as:");
  if (filename !== "" && filename !== null) {
    download(
      filename + ".hapi.html",
      InjectStructureToActivity(emptyActivity, structure)
    );
  }
}

/*
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
*/

function App(props) {
  const initialStructure = DEFAULT_STRUCTURE;

  initialStructure.id = makeid(20);
  const [structure, setStructure] = useState(initialStructure);
  const [savedFlag, setSavedFlag] = useState(true);  // Whether the file is saved and safe to exit

  function httpGet(theUrl) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", theUrl, true);
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4 /*&& xmlhttp.status == 200*/) {
        emptyActivityFile = xmlhttp.responseText;
        console.log("File fetched successfully");
      }
    };
    xmlhttp.send();
  }
  
  function readSingleFile(evt) {
    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0];

    if (f) {
      var r = new FileReader();
      r.onload = function (e) {
        var contents = e.target.result;
        try {
          console.log(JSON.parse(contents));
          changeStructure(JSON.parse(contents));
        } catch {
          alert("Corrupted format");
        }
      };
      r.readAsText(f);
    } else {
      alert("Failed to load file");
    }
  }

  useEffect(() => {
    // Fetch and store the empty activity in a variable, emptyActivityFile.
    httpGet("https://hapi-app.netlify.app/empty.html"); 

    document
      .getElementById("fileinput")
      .addEventListener("change", readSingleFile, false);
    return () => {
      document
        .getElementById("fileinput")
        .removeEventListener("change", readSingleFile, false);
    };
  }, []);

  useEffect(() => {
    setSavedFlag(false);
  }, [structure]);

  useEffect(() => {
    window.onbeforeunload = function(){ if (!savedFlag) { return true } };
  }, [savedFlag]);

  const handleSave = () => {
    SaveWorkFile(JSON.stringify(structure, null, 2));
    setSavedFlag(true);
  };

  const handleExport = () => {
    Export(emptyActivityFile, JSON.stringify(structure));
  };

  const handleChangeMainHeader = (text) => {
    setStructure(
      produce(structure, (newStructure) => {
        newStructure.mainHeader = text;
      })
    );
  };

  const handleUpdateSection = (updatedSection) => {
    setStructure(
      produce(structure, (newStructure) => {
        newStructure.sections.forEach((section, i) => {
          if (section.id === updatedSection.id) {
            newStructure.sections[i] = updatedSection;
          }
        });
      })
    );
  };

  const handleClickAddSection = () => {
    setStructure(
      produce(structure, (newStructure) => {
        newStructure.sections.push(
          produce(DEFAULT_SECTION, (newSection) => {
            newSection.id = makeid(10);
          })
        );
      })
    );
  };

  const handleDeleteSection = (sectionId) => {
    setStructure(
      produce(structure, (newStructure) => {
        newStructure.sections.forEach((section, index, object) => {
          if (section.id === sectionId) {
            object.splice(index, 1);
          }
        });
      })
    );
  };

  const handleMoveUpSection = (sectionId) => {
    setStructure(
      produce(structure, (newStructure) => {
        let o = newStructure.sections;
        let i = o
          .map((s) => {
            return s.id;
          })
          .indexOf(sectionId);
        if (i > 0) {
          [o[i], o[i - 1]] = [o[i - 1], o[i]];
        }
      })
    );
  };

  const handleMoveDownSection = (sectionId) => {
    setStructure(
      produce(structure, (newStructure) => {
        let o = newStructure.sections;
        let i = o
          .map((s) => {
            return s.id;
          })
          .indexOf(sectionId);
        if (i >= 0 && i < o.length - 1) {
          [o[i], o[i + 1]] = [o[i + 1], o[i]];
        }
      })
    );
  };

  const sections = [];
  structure.sections.forEach((section) => {
    sections.push(
      <Section
        structure={section}
        onUpdate={handleUpdateSection}
        onDelete={handleDeleteSection}
        onMoveUp={handleMoveUpSection}
        onMoveDown={handleMoveDownSection}
        key={section.id}
      />
    );
  });

  const changeStructure = (newStructure) => {
    setStructure(newStructure);
  };

  return (
    <StyledApp>
      {/*<SingleFileAutoSubmit changeStructure={changeStructure} />*/}
      <DragAndDrop changeStructure={changeStructure} />
      <p style={{position: "fixed", bottom: "0px", right: "14px"}}><span role="img" aria-label="smiling face">😃</span> Prototype Hapi</p>
      <Menu
        onSave={handleSave}
        onExport={handleExport}
      />
      <div>
        <Editable size={1} onChange={handleChangeMainHeader}>
          {structure.mainHeader}
        </Editable>
      </div>
      {sections}
      <br />
      <button onClick={handleClickAddSection}>
        <b>הוסף יחידה</b>
      </button>
    </StyledApp>
  );
}

const StyledApp = styled.div`
  min-width: 800px;
  max-width: 800px;
  padding: 32px;

  @media (max-width: 900px) {
    padding: 0;
    max-width: none;
  }
`;

export default App;
