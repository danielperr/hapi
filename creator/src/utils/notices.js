const ERROR = 1;
const WARNING = 2;
const INFO = 3;

export const notice_templates = {
  emptyActivityHeader: { level: ERROR, title: 'כותרת ריקה לפעילות', description: 'חייבת להיות כותרת לפעילות.' },
  emptySection: { level: ERROR, title: 'יחידה ריקה', description: 'יחידה חייבת להכיל לפחות רכיב אחד.' },
  emptySectionHeader: { level: WARNING, title: 'כותרת ריקה ליחידה', description: 'מומלץ לכתוב כותרת מתאימה עבור כל יחידה.' },
  emptyElementText: { level: WARNING, title: 'חסר כיתוב לרכיב' },
  emptyMultichoiceOption: { level: WARNING, title: 'ישנה תשובה ריקה', description: 'התשובות חייבות להכיל טקסט.' },
  emptyMultichoiceCorrect: { level: ERROR, title: 'אף תשובה לא נכונה בשאלה', description: 'חייבת להיות תשובה נכונה בשאלה.' },
  invalidNumberInputRange: { level: ERROR, title: 'התחום שצוין לא הגיוני', description: 'תחום התשובה הנכונה לא הגיוני (אולי התבלבלת בין המינימום למקסימום?)' },
}

export function computeNotices(structure) {
  const notices = {
    notices: [],
    sections: structure.sections.map((section) => ({
      id: section.id,
      notices: [],
      elements: section.elements.length && section.elements.map((element) => ({
        id: element.id,
        notices: [],
      }))
    }))
  };

  if (!structure.mainHeader) {
    notices.push(notice_templates.emptyActivityHeader);
  }

  structure.sections.forEach((section) => {
    if (!section.header) {
      notices.sections.find(({ id }) => id === section.id).notices.push(notice_templates.emptySectionHeader);
    }
    if (!section.elements.length) {
      notices.sections.find(({ id }) => id === section.id).notices.push(notice_templates.emptySection);
    }
    
    section.elements.forEach((element) => {
      if (element.type === 'multi-choice') {
        if (!element.correct || !element.correct.length) {
          notices.sections.find(({ id }) => id === section.id).elements
            .find(({ id }) => id === element.id).notices.push(notice_templates.emptyMultichoiceCorrect);
        }
        if (element.options.some((option) => !option.text)) {
          notices.sections.find(({ id }) => id === section.id).elements
            .find(({ id }) => id === element.id).notices.push(notice_templates.emptyMultichoiceOption);
        }
      }
    });
  });

  console.log(notices);
  return notices;
}
