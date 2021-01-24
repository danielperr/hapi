/* eslint-disable no-param-reassign */
/**
 * @typedef {Object} DNDReorderResult
 * @property {Boolean} shouldUpdate - Does the component need to update the structure
 * @property {Object} [newStructure] - The new structure to update
 */

import produce from 'immer';

/**
 * Move item from list to another index
 * @param {Array}   list
 * @param {Number}  startIndex  Index of the item before reordering
 * @param {Number}  endIndex    Desired index of said item
 */
function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

/**
 * Gets called after a drag and drop action was performed by the user.
 * Reorders the structure according to the drag event result (dndResult), which is supplied by
 * the drag n drop library 'react-beautiful-dnd'.
 * @param dndResult {Object}
 * @param currentStructure {Object}
 * @returns {DNDReorderResult}
 */
export default function dndReorder(dndResult, currentStructure) {
  const { source, destination, type } = dndResult;

  // Dropped nowhere
  if (!destination) {
    return { shouldUpdate: false };
  }

  // Did not move
  if (
    source.droppableId === destination.droppableId
    && source.index === destination.index
  ) {
    return { shouldUpdate: false };
  }

  // Reorder sections
  if (type === 'SECTION') {
    return {
      shouldUpdate: true,
      newStructure: produce(currentStructure, (newStructure) => {
        newStructure.sections = reorder(
          newStructure.sections,
          source.index,
          destination.index,
        );
      }),
    };
  }

  // Reorder elements
  if (type === 'ELEMENT') {
    // Element is in the same section as before
    if (source.droppableId === destination.droppableId) {
      return {
        shouldUpdate: true,
        newStructure: produce(currentStructure, (newStructure) => {
          newStructure.sections.forEach((section, index, sections) => {
            if (section.id === destination.droppableId) {
              sections[index].elements = reorder(
                section.elements,
                source.index,
                destination.index,
              );
            }
          });
        }),
      };
    }

    // Element is moving between sections
    return {
      shouldUpdate: true,
      newStructure: produce(currentStructure, (newStructure) => {
        let element;
        newStructure.sections.forEach((section, index, sections) => {
          if (section.id === source.droppableId) {
            [element] = sections[index].elements.splice(source.index, 1);
          }
        });
        newStructure.sections.forEach((section, index, sections) => {
          if (section.id === destination.droppableId) {
            sections[index].elements.splice(destination.index, 0, element);
          }
        });
      }),
    };
  }

  // Reorder multi choice options
  // Option is in the same element
  if (source.droppableId === destination.droppableId) {
    return {
      shouldUpdate: true,
      newStructure: produce(currentStructure, (newStructure) => {
        newStructure.sections.forEach((section) => {
          section.elements.forEach((element, index, elements) => {
            if (element.id === destination.droppableId) {
              elements[index].options = reorder(
                element.options,
                source.index,
                destination.index,
              );
            }
          });
        });
      }),
    };
  }

  return { shouldUpdate: false };
}
