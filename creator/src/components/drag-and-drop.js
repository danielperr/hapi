import React, { useEffect } from "react";

function DragAndDrop(props) {
  var dropZone = document.getElementById("dropzone");

  useEffect(() => {
    // componentDidMount
    // 1
    window.addEventListener("dragenter", function (e) {
      showDropZone();
    });

    // 2
    dropZone.addEventListener("dragenter", allowDrag);
    dropZone.addEventListener("dragover", allowDrag);

    // 3
    dropZone.addEventListener("dragleave", function (e) {
      console.log("dragleave");
      hideDropZone();
    });

    // 4
    dropZone.addEventListener("drop", handleDrop);

    return () => {
      // componentWillUnmount
      // 1
      window.removeEventListener("dragenter", function (e) {
        showDropZone();
      });

      // 2
      dropZone.removeEventListener("dragenter", allowDrag);
      dropZone.removeEventListener("dragover", allowDrag);

      // 3
      dropZone.removeEventListener("dragleave", function (e) {
        console.log("dragleave");
        hideDropZone();
      });

      // 4
      dropZone.removeEventListener("drop", handleDrop);
    };
  }, []);

  function showDropZone() {
    dropZone.style.display = "block";
  }

  function hideDropZone() {
    dropZone.style.display = "none";
  }

  function allowDrag(e) {
    if (true) {
      // Test that the item being dragged is a valid one
      e.dataTransfer.dropEffect = "copy";
      e.preventDefault();
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    hideDropZone();

    let files = e.dataTransfer.files;

    files = [...files];
    files.forEach(viewFile);
  }

  function b64_to_utf8( str ) {
    return decodeURIComponent(escape(window.atob( str )));
 }

  function viewFile(file) {
    let reader = new FileReader()
    reader.readAsDataURL(file);
    reader.onloadend = function() {
      const text = reader.result;
      const data = text.substring(text.indexOf("base64,") + 7,);
      let jsonObj = JSON.parse(b64_to_utf8(data));
      console.log(jsonObj);
      props.changeStructure(jsonObj);
    }
  }

  return ("");
}

export default DragAndDrop;
