import { DropResult } from 'react-beautiful-dnd';
import { findById, modifyById } from './id';

/**
 * Move item from list to another index
 * @param {Array}   list
 * @param {Number}  startIndex  Index of the item before reordering
 * @param {Number}  endIndex    Desired index of said item
 */
export function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
