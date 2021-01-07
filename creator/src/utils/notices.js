const ERROR = 1;
const WARNING = 2;

export const notice_templates = {
  emptyActivityHeader: {
    level: ERROR,
    title: 'כותרת ריקה לפעילות',
    description: 'חייבת להיות כותרת לפעילות.'
  },
  emptySection: {
    level: ERROR,
    title: 'יחידה ריקה',
    description: 'יחידה חייבת להכיל לפחות רכיב אחד.'
  },
  emptySectionHeader: {
    level: WARNING,
    title: 'כותרת ריקה ליחידה',
    description: 'מומלץ לכתוב כותרת מתאימה עבור כל יחידה.'
  },
  emptyElementText: {
    level: WARNING,
    title: 'חסר כיתוב לרכיב'
  },
  emptyYoutubeId: {
    level: WARNING,
    title: 'לא סופק סרטון יוטיוב',
  },
  emptyMultichoiceOption: {
    level: WARNING,
    title: 'ישנה תשובה ריקה',
    description: 'התשובות חייבות להכיל טקסט.'
  },
  emptyMultichoiceCorrect: {
    level: WARNING,
    title: 'אף תשובה לא נכונה בשאלה',
    description: 'חייבת להיות תשובה נכונה בשאלה.'
  },
  invalidNumberInputRange: {
    level: WARNING,
    title: 'התחום שצוין לא הגיוני',
    description: 'תחום התשובה הנכונה לא הגיוני (אולי התבלבלת בין המינימום למקסימום?)'
  },
}
