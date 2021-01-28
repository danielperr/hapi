/**
 * @typedef {Object.<string, string>} Answers
 *
 * @typedef {Object} ElementAnswerStatus
 * @property {String} elementId - The id of the element in question
 * @property {Boolean} fillable - Whether this element can be filled or answered
 * @property {Boolean} answerFilled - Whether the student has entered some answer in the question
 * @property {Boolean} hasCorrectAnswer - Whether the question has a correct answer to check
 * @property {Boolean} answerCorrect - Whether the answer to the element is correct
 * @property {Boolean} elementComplete -
 *           True if the student has done everything that this element requires.
 *           If it's fillable, is it filled? And if it has a correct answer, is it correct?
 *           If the element is not fillable nor has a correct answer, this will be true
 *           (as if the student just had to read the element's content. That's why an activity
 *           with no fillable elements will always be considered to be 'complete').
 *
 * @typedef {Object} SectionAnswerStatus
 * @property {String} sectionId - The id of the section in question
 * @property {Array.<ElementAnswerStatus>} elementStatuses - The statuses of the section's elements
 * @property {Boolean} sectionComplete - Whether all elements have passed the checks
 * @property {String} firstIncompleteElementId - The ID of the first element with problems
 *
 * @typedef {Object} ActivityAnswerStatus
 * @property {Array.<SectionAnswerStatus>} sectionStatuses - The statuses of the activity sections
 * @property {Boolean} activityComplete - Whether all elements and sections have passed the checks
 * @property {String} firstIncompleteElementId - The ID of the first element with problems
 */

/**
 * Checks the element for a missing or incorrect answer and returns its status
 * @param elementStructure {Object}
 * @param answer {String}
 * @returns {ElementAnswerStatus}
 */
export function checkElement(elementStructure, answer) {
  const elementAnswerStatus = {
    elementId: elementStructure.id,
    fillable: true,
    answerFilled: answer && answer.replace(/\s/g, ''),
    hasCorrectAnswer: false,
    elementComplete: true,
  };
  switch (elementStructure.type) {
    case 'text-input':
      break;
    case 'multi-choice':
      if (
        // If the question even has a correct option to check
        elementStructure.correct
        // And if the correct option exists in the options list
        && elementStructure.options.find(({ id }) => elementStructure.correct.includes(id))
      ) {
        elementAnswerStatus.hasCorrectAnswer = true;
        elementAnswerStatus.answerCorrect = elementAnswerStatus.answerFilled
          && elementStructure.correct.includes(answer);
      }
      break;
    case 'number-input':
      elementAnswerStatus.hasCorrectAnswer = elementStructure.min <= elementStructure.max;
      elementAnswerStatus.answerCorrect = elementAnswerStatus.answerFilled
        && answer >= elementStructure.min
        && answer <= elementStructure.max;
      break;
    default:
      elementAnswerStatus.fillable = false;
  }
  if (elementAnswerStatus.fillable) {
    elementAnswerStatus.elementComplete = elementAnswerStatus.elementComplete
      && elementAnswerStatus.answerFilled;
  }
  if (elementAnswerStatus.hasCorrectAnswer) {
    elementAnswerStatus.elementComplete = elementAnswerStatus.elementComplete
      && elementAnswerStatus.answerCorrect;
  }
  return elementAnswerStatus;
}

/**
 * Checks the section's elements and returns its status
 * @param sectionStructure {Object}
 * @param answers {Answers}
 * @returns {SectionAnswerStatus}
 */
export function checkSection(sectionStructure, answers) {
  const sectionAnswerStatus = {
    sectionId: sectionStructure.id,
  };
  sectionAnswerStatus.elementStatuses = sectionStructure.elements.map((elementStructure) => (
    checkElement(elementStructure, answers[elementStructure.id])
  ));
  sectionAnswerStatus.sectionComplete = sectionAnswerStatus.elementStatuses.every(
    ({ elementComplete }) => elementComplete,
  );
  sectionAnswerStatus.firstIncompleteElementId = (sectionAnswerStatus.elementStatuses.find(
    ({ elementComplete }) => !elementComplete,
  ) || {}).elementId;
  return sectionAnswerStatus;
}

/**
 * Checks the activity's elements and returns its status
 * @param activityStructure {Object}
 * @param answers {Answers}
 * @returns {ActivityAnswerStatus}
 */
export function checkActivity(activityStructure, answers) {
  const activityAnswerStatus = {};
  activityAnswerStatus.sectionStatuses = activityStructure.sections.map((sectionStructure) => (
    checkSection(sectionStructure, answers)
  ));
  activityAnswerStatus.activityComplete = activityAnswerStatus.sectionStatuses.every(
    ({ sectionComplete }) => sectionComplete,
  );
  activityAnswerStatus.firstIncompleteElementId = (activityAnswerStatus.sectionStatuses.find(
    ({ firstIncompleteElementId }) => firstIncompleteElementId,
  ) || {}).firstIncompleteElementId;
  return activityAnswerStatus;
}
