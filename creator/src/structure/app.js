import React, { useState, useEffect } from 'react';

import produce from 'immer';
import styled from 'styled-components';

import { makeid, httpGet } from '../shared/utils';
import { saveWorkFile, exportToActivity } from '../shared/file-utils';
import { DEFAULT_STRUCTURE, DEFAULT_SECTION } from '../shared/constants';
import Editable from '../shared/editable';
import Section from './section';
import Menu from './menu';


// const SingleFileAutoSubmit = (props) => {
//   const toast = (innerHTML) => {
//     const el = document.getElementById("toast");
//     el.innerHTML = innerHTML;
//     el.className = "show";
//     setTimeout(() => {
//       el.className = el.className.replace("show", "");
//     }, 3000);
//   };

//   const getUploadParams = () => {
//     return { url: "https://httpbin.org/post" };
//   };

//   const handleChangeStatus = ({ meta, remove }, status) => {
//     if (status === "headers_received") {
//       toast(`${meta.name} uploaded!`);
//     } else if (status === "aborted") {
//       toast(`${meta.name}, upload failed...`);
//     }
//   };

//   const handleSubmit = (files, allFiles) => {
//     try {
//       props.changeStructure(
//         JSON.parse(JSON.parse(files[0].xhr.response).files.file)
//       );
//     } catch (error) {
//       console.log(error);
//     }

//     allFiles.forEach((f) => f.remove());
//   };

//   return (
//     <React.Fragment>
//       <div id="toast">Upload</div>
//       <Dropzone
//         className="dropzone"
//         getUploadParams={getUploadParams}
//         onChangeStatus={handleChangeStatus}
//         maxFiles={1}
//         multiple={false}
//         canCancel={true}
//         onSubmit={handleSubmit}
//         inputContent=""
//         InputComponent={null}
//         styles={{
//           dropzone: {
//             pointerEvents: "none",
//             position: "fixed",
//             top: 0,
//             right: 0,
//             width: "100%",
//             height: "100%",
//             overflow: "hidden",
//           },
//           dropzoneActive: { borderColor: "green" },
//         }}
//       />
//       <br />
//     </React.Fragment>
//   );
// };


const EMPTY_ACTIVITY_URL = 'https://hapi-app.netlify.app/empty.html';

function App({ }) {
  
  const initialStructure = DEFAULT_STRUCTURE;
  initialStructure.id = makeid(20);
  const [structure, setStructure] = useState(initialStructure);
  const [savedFlag, setSavedFlag] = useState(true);  // Whether the file is saved and safe to exit
  
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

  // useEffect(() => {
  //   // Fetch and store the empty activity in a variable, emptyActivityFile.

  //   document
  //     .getElementById("fileinput")
  //     .addEventListener("change", readSingleFile, false);
  //   return () => {
  //     document
  //       .getElementById("fileinput")
  //       .removeEventListener("change");
  //   };
  // }, []);

  useEffect(() => {
    setSavedFlag(false);
  }, [structure]);

  useEffect(() => {
    // window.onbeforeunload = function(){ if (!savedFlag) { return true } };
  }, [savedFlag]);

  const handleLoad = (contents) => {
    setStructure(JSON.parse(contents));
  }
  
  const handleSave = () => {
    saveWorkFile(JSON.stringify(structure, null, 2));
    setSavedFlag(true);
  };

  const handleExport = () => {
    exportToActivity(httpGet(EMPTY_ACTIVITY_URL), JSON.stringify(structure));
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
      <p style={{position: "fixed", bottom: "0px", right: "14px"}}><span role="img" aria-label="smiling face">😃</span> Prototype Hapi</p>
      <Menu
        onLoad={handleLoad}
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
