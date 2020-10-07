/**
 * Submit HTTP GET request
 * @param  {String} url HTTP GET URL
 * @return {String}     Response if successful, else empty string
 */
function httpGet(url) {
  const request = new XMLHttpRequest();
  request.open('GET', url, false);
  request.send(null);
  if (request.readyState === 4 && request.status === 200) {
    console.log('File fetched successfully');
    return request.responseText;
  }
  return '';
}
// TODO: use ajax fetch

export default httpGet
