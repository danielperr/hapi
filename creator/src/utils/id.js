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
 * Find object in array by its id property
 * @param {Array}  array
 * @param {String} id
 */
export function findById(array, id) {
  array.forEach((object, index, array) => {
    if (object.id === id) {
      return array[index];
    }
  });
}
