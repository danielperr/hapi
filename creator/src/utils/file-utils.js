
/**
 * Download a file at the client
 * @param {String} filename File name
 * @param {String} text     File contents
 */
export function downloadFileWithContents(filename, text) {
  const element = document.createElement("a");
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

/**
 * Download a creator project file
 * @param {String} structure Project structure
 */
export function saveWorkFile(structure) {
  const filename = prompt("Save as:");
  if (filename !== "" && filename !== null) {
    downloadFileWithContents(filename + ".hapi.txt", structure);
  }
}

/**
 * Inject structure to structureless activity
 * @param {String} emptyActivity Empty activity HTML (without structure)
 * @param {String} structure     Project structure to inject
 */
export function injectStructureToActivity(emptyActivity, structure) {
  let f = emptyActivity.slice();
  const index = f.indexOf("structure:");
  const firstSign = f.indexOf("{", index);
  const secondSign = f.indexOf("}", index + 1);
  return f.substring(0, firstSign) + structure + f.substring(secondSign + 1);
}

/**
 * Export creator project structure to html activity
 * @param {String} emptyActivity Empty activity HTML (without structure)
 * @param {String} structure     Current project structure
 */
export function exportToActivity(emptyActivity, structure) {
  const filename = prompt("Save as:");
  if (filename !== "" && filename !== null) {
    downloadFileWithContents(
      filename + ".hapi.html",
      injectStructureToActivity(emptyActivity, structure)
    );
  }
}