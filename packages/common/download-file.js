/**
 * Downloads a file named `filename` with the textual contents `contents` to the user's computer
 * using the browser download feature.
 * @param {String} filename
 * @param {String} contents
 */
export default function downloadFile(filename, contents) {
  const element = document.createElement('a');
  element.setAttribute(
    'href',
    `data:text/plain;charset=utf-8,${encodeURIComponent(contents)}`,
  );
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
