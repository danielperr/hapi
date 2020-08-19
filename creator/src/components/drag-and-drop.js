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

    //Retrieve the first (and only!) File from the FileList object
    let file = e.dataTransfer.files[0];

    if (file) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var contents = e.target.result;
        try {
          console.log(JSON.parse(contents));
          props.changeStructure(JSON.parse(contents));
        } catch {
          alert("Corrupted format")
        }
      };
      reader.readAsText(file);
    } else {
      alert("Failed to load file");
    }

  }

  return "";
}

export default DragAndDrop;
