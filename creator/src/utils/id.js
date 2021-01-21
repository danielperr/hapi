import produce from 'immer';
import { v1 as uuid } from 'uuid';

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

/**
 * Replace all ids in given object with new generated ids of length 10.
 * An id string is found by looking after the pattern /"id":"(.*?)"/
 * When an id is found all of its occurences are replaced in the object.
 * object is immutable.
 * @param {Object} object
 * @returns {Object} result
 */
export function replaceIds(object) {
  return JSON.parse(JSON.stringify(produce(object, (draftObject) => {
    let json = JSON.stringify(draftObject);
    const re = /"id":"(.*?)"/g;
    let match;
    do {
      match = re.exec(json);
      if (match) {
        json = json.replaceAll(match[1], uuid(10));
      }
    } while (match);
    Object.assign(draftObject, JSON.parse(json));
  })));
}
