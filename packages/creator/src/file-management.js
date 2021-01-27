/* eslint-disable no-alert */
import downloadFile from '../../common/download-file';

/**
 * Download a creator project file
 * @param {String} structure Project structure
 */
export function saveWorkFile(structure) {
  const filename = prompt('Save as:');
  if (filename !== '' && filename !== null) {
    downloadFile(`${filename}.hapi.txt`, structure);
  }
}

/**
 * Inject structure to structureless activity
 * @param {String} emptyActivity Empty activity HTML (without structure)
 * @param {String} structure     Project structure to inject
 */
export function injectStructureToActivity(emptyActivity, structure) {
  const f = emptyActivity.slice();
  const index = f.lastIndexOf('structure:');
  const firstSign = f.indexOf('{', index);
  const secondSign = f.indexOf('}', index + 1);
  return f.substring(0, firstSign) + structure + f.substring(secondSign + 1);
}

/**
 * Export creator project structure to html activity
 * @param {String} emptyActivity Empty activity HTML (without structure)
 * @param {String} structure     Current project structure
 */
export function exportToActivity(emptyActivity, structure) {
  const filename = prompt('Save as:');
  if (filename !== '' && filename !== null) {
    downloadFile(
      `${filename}.hapi.html`,
      injectStructureToActivity(emptyActivity, structure),
    );
  }
}
