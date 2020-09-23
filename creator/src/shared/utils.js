
/**
 * Generate a random string of letters (upper & lowercase) and numbers of the given length
 * @param {Number} length
 */
export function makeid(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

/**
 * Submit HTTP GET request
 * @param  {String} url HTTP GET URL
 * @return {String}     Response if successful, else empty string
 */
export function httpGet(url) {
  const request = new XMLHttpRequest();
  request.open('GET', url, false);
  request.send(null);
  if (request.readyState === 4 && request.status === 200) {
    console.log('File fetched successfully');
    return request.responseText;
  }
  return '';
}
