export const noticeMessages = {
  emptyActivityHeader: {
    title: 'כותרת ריקה לפעילות',
    description: 'חייבת להיות כותרת לפעילות.'
  },
  emptySection: {
    title: 'יחידה ריקה',
    description: 'יחידה חייבת להכיל לפחות רכיב אחד.'
  },
  emptySectionHeader: {
    title: 'כותרת ריקה ליחידה',
    description: 'מומלץ לכתוב כותרת מתאימה עבור כל יחידה.'
  },
  emptyElementText: {
    title: 'חסר כיתוב לרכיב'
  },
  emptyYoutubeId: {
    title: 'לא סופק סרטון יוטיוב',
    description: 'אנא ודאו שהקישור מועתק נכונה.',
  },
  emptyMultichoiceOption: {
    title: 'ישנה תשובה ריקה',
    description: 'התשובות חייבות להכיל טקסט.'
  },
  emptyMultichoiceCorrect: {
    title: 'אף תשובה לא נכונה בשאלה',
    description: 'חייבת להיות תשובה נכונה בשאלה.'
  },
  invalidNumberInputRange: {
    title: 'התחום שצוין לא הגיוני',
    description: 'תחום התשובה הנכונה לא הגיוני (אולי התבלבלת בין המינימום למקסימום?)'
  },
}

export function calculateNoticeObjects(structure) {
  const noticeObjects = [];
  structure.sections.forEach((section) => {
    const sectionNotices = [];
    if (!section.elements || !section.elements.length) {
      sectionNotices.push(noticeMessages.emptySection);
    }
    if (!section.header) {
      sectionNotices.push(noticeMessages.emptySectionHeader);
    }
    if (sectionNotices.length) {
      noticeObjects.push({
        id: section.id,
        notices: sectionNotices,
      });
    }

    section.elements.forEach((element) => {
      const elementNotices = [];
      switch (element.type) {
        case 'youtube':
          if (!element.youtubId) {
            elementNotices.push(noticeMessages.emptyYoutubeId);
          }
          break;
        default:
          break;
      }
      if (elementNotices.length) {
        noticeObjects.push({
          id: element.id,
          notices: elementNotices,
        });
      }
    });
  });
  return noticeObjects;
}
