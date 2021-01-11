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
  emptyImageSrc: {
    title: 'חסר קישור לתמונה',
    description: 'אנא ספקו קישור או ודאו שהקישור הנוכחי תקין.',
  },
  emptyYoutubeId: {
    title: 'לא סופק סרטון יוטיוב',
    description: 'אנא ודאו שהקישור מועתק נכונה.',
  },
  emptyLatex: {
    title: 'ביטוי מתמטי ריק',
    description: 'יש למלא ביטוי מתמטי כלשהו.',
  },
  noMultichoiceOptions: {
    title: 'חסרות תשובות בשאלה',
    description: 'בשאלת בחירה חייבות להיות שתי תשובות לפחות.',
  },
  oneMultichoiceOptions: {
    title: 'ישנה רק תשובה אחת בשאלה',
    description: 'בשאלת בחירה חייבות להיות שתי תשובות לפחות.',
  },
  emptyMultichoiceOption: {
    title: 'ישנה תשובה ריקה',
    description: 'התשובות חייבות להכיל טקסט.'
  },
  emptyMultichoiceCorrect: {
    title: 'אף תשובה לא נכונה בשאלה',
    description: 'חייבת להיות תשובה נכונה בשאלה.'
  },
  emptyNumberInputRange: {
    title: 'חסרים ערכים נכונים בשאלה',
    description: 'יש לציין תחום המוגדר כתשובה נכונה בשאלה מספרית',
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
        case 'label':
        case 'text-input':
          if (!element.text) {
            elementNotices.push(noticeMessages.emptyElementText);
          }
          break;
        case 'image':
          if (!element.src) {
            elementNotices.push(noticeMessages.emptyImageSrc);
          }
          break;
        case 'youtube':
          if (!element.youtubId) {
            elementNotices.push(noticeMessages.emptyYoutubeId);
          }
          break;
        case 'latex':
          if (!element.latex) {
            elementNotices.push(noticeMessages.emptyLatex);
          }
          break;
        case 'multi-choice':
          if (!element.text) {
            elementNotices.push(noticeMessages.emptyElementText);
          }
          if (element.options && element.options.length) {
            if (element.options.length === 1) {
              elementNotices.push(noticeMessages.oneMultichoiceOptions);
            }
            element.options.forEach((option) => {
              if (!option.text) {
                elementNotices.push(noticeMessages.emptyMultichoiceOption);
              }
            });
            if (!element.correct || !element.correct.length) {
              elementNotices.push(noticeMessages.emptyMultichoiceCorrect);
            }
          } else {
            elementNotices.push(noticeMessages.noMultichoiceOptions);
          }
          break;
        case 'number-input':
          if (!element.text) {
            elementNotices.push(noticeMessages.emptyElementText);
          }
          if (element.min && element.max) {
            if (element.min > element.max) {
              elementNotices.push(noticeMessages.invalidNumberInputRange);
            }
          } else {
            elementNotices.push(noticeMessages.emptyNumberInputRange);
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
