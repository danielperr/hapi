import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/App';

import './style.css';

// const structureEn = {
//   "serialNumber": "bJbiiGDGd29p7xJPI4xk",
//   "language": "en",
//   "mainHeader": "Objects in Motion - Part 1",
//   "sections": [{
//       "header": "Test",
//       "id": "km8hGF9kA8",
//       "elements": [{
//         "type": "number-input",
//         "text": "How much is 2 + 3?",
//         "id": "a8HJvwa243",
//         "min": "4.5",
//         "max": "5.5",
//       }],
//     }, {
//       "header": "Watching a Video",
//       "id": "cwcXgOAKpC",
//       "elements": [{
//         "type": "label",
//         "text": "Watch the video and answer the following questions.",
//         "id": "hYF8kvGV49"
//       }, {
//         "type": "youtube",
//         "youtubeId": "HPpvh1-ZeLQ",
//         "id": "Xg77GHD91r"
//       }, {
//         "type": "text-input",
//         "text": "Write in your own words, how do you create the illusion that a circle is moving on the screen?",
//         "id": "HHbrsIPQD4"
//       }]
//     }, {
//       "header": "The First Code Block",
//       "id": "9Icl3Pg1Jn",
//       "elements": [{
//         "type": "label",
//         "text": "Open a new ifigures page by clicking on the following link: [empty ifigure](https://webhome.weizmann.ac.il/home/ifigures/ifigure.ifig.html)\n\nCopy the following code to the first code block (on the top left side, see attached image) and run it.",
//         "id": "KjaUH3GiYA"
//       }, {
//         "type": "image",
//         "src": "https://webhome.weizmann.ac.il/home/ifigures/Hapi/SimulatingMotion/Ex1/images/1.png",
//         "id": "RdF0Nw2lHr"
//       }, {
//         "type": "multi-choice",
//         "text": "After you ran it, what happened?",
//         "id": "Ob4YXMJI1S",
//         "correct": ["dfN7KqKAvc"],
//         "options": [{
//           "text": "A blue circle formed on the screen and nothing else happened",
//           "id": "dfN7KqKAvc",
//         }, {
//           "text": "Nothing happened that can be seen",
//           "id": "bERliHW5id"
//         }, {
//           "text": "A simulation of a moving ball was created",
//           "id": "BezdSQlolS"
//         }],
//       }, {
//         "type": "multi-choice",
//         "text": "Run the cell over and over again. What's happening?",
//         "id": "wmNXgWxrYt",
//         "correct": ["Z1uCwirDbE"],
//         "options": [{
//           "text": "Nothing seems to be happening",
//           "id": "Z1uCwirDbE"
//         }, {
//           "text": "When pressed again the circle disappears",
//           "id": "RmjQJmbAeX"
//         }, {
//           "text": "Each time the circle moves",
//           "id": "Xqf0Qri5VA"
//         }]
//       }]
//     },
//   ]
// };

// const structureHe = {
//   "serialNumber": "bJbiiGDGd29p7xJPI4xk",
//   "mainHeader": "הדמיית תנועה - פעילות ראשונה",
//   "sections": [{
//       "header": "בדיקה",
//       "id": "km8hGF9kA8",
//       "elements": [{
//         "type": "number-input",
//         "text": "כמה זה 2 + 3?",
//         "id": "a8HJvwa243",
//         "min": "4.5",
//         "max": "5.5",
//       }],
//     }, {
//       "header": "צפייה בסרטון",
//       "id": "cwcXgOAKpC",
//       "elements": [{
//         "type": "label",
//         "text": "צפו בסרטון הבא ולאחר מכן ענו על השאלות.",
//         "id": "hYF8kvGV49"
//       }, {
//         "type": "youtube",
//         "youtubeId": "HPpvh1-ZeLQ",
//         "id": "Xg77GHD91r"
//       }, {
//         "type": "text-input",
//         "text": "כתבו במילים שלכם, כיצד גורמים לאשליה שעיגול נע על המסך?",
//         "id": "HHbrsIPQD4"
//       }]
//     }, {
//       "header": "הקוד הראשון",
//       "id": "9Icl3Pg1Jn",
//       "elements": [{
//         "type": "label",
//         "text": "פתחו דף ifigures חדש ע״י לחיצה על הקישור הבא [empty ifigure](https://webhome.weizmann.ac.il/home/ifigures/ifigure.ifig.html)\n\nהשתמשו בחלון שלפניכם, העתיקו את הקוד הראשון (בצד שמאל מתחת לחלון code1, ראו תמונה מצורפת) והריצו אותו.",
//         "id": "KjaUH3GiYA"
//       }, {
//         "type": "image",
//         "src": "https://webhome.weizmann.ac.il/home/ifigures/Hapi/SimulatingMotion/Ex1/images/1.png",
//         "id": "RdF0Nw2lHr"
//       }, {
//         "type": "multi-choice",
//         "text": "לאחר שהרצתם, מה קרה?",
//         "id": "Ob4YXMJI1S",
//         "correct": ["dfN7KqKAvc"],
//         "options": [{
//           "text": "נוצר עיגול כחול על המסך ולא קרה שום דבר נוסף.",
//           "id": "dfN7KqKAvc",
//         }, {
//           "text": "לא קרה כלום שניתן לראות.",
//           "id": "bERliHW5id"
//         }, {
//           "text": "נוצרה הדמיה של כדור זז",
//           "id": "BezdSQlolS"
//         }],
//       }, {
//         "type": "multi-choice",
//         "text": "הריצו את התא שוב ושוב. מה קורה?",
//         "id": "wmNXgWxrYt",
//         "correct": ["Z1uCwirDbE"],
//         "options": [{
//           "text": "לא נראה שקורה משהו.",
//           "id": "Z1uCwirDbE"
//         }, {
//           "text": "כשלוחצים שוב העיגול נעלם.",
//           "id": "RmjQJmbAeX"
//         }, {
//           "text": "בכל פעם העיגול זז.",
//           "id": "Xqf0Qri5VA"
//         }]
//       }]
//     }, {
//       "header": "הקוד השני",
//       "id": "g1sJYxF4Z1",
//       "elements": [{
//         "type": "label",
//         "text": "העתיקו את הקוד השני (בצד שמאל מתחת לחלון code2, ראו תמונה מצורפת).",
//         "id": "oOnvOgSxKn"
//       }, {
//         "type": "image",
//         "src": "https://webhome.weizmann.ac.il/home/ifigures/Hapi/SimulatingMotion/Ex1/images/2.png",
//         "id": "HF1JBwk7x1"
//       }, {
//         "type": "multi-choice",
//         "text": "הריצו אותו שוב ושוב. מה קורה?",
//         "id": "Q06Thlc1Hf",
//         "correct": ["wdu0rUm6tw"],
//         "options": [{
//           "text": "בכל פעם העיגול זז.",
//           "id": "wdu0rUm6tw"
//         }, {
//           "text": "העיגול נעלם.",
//           "id": "URLWrW0cd3"
//         }, {
//           "text": "לא נראה שקורה משהו.",
//           "id": "Hfv2EYOzDs"
//         }]
//       }, {
//         "type": "multi-choice",
//         "text": "מה מטרת הפקודה clf לדעתכם?",
//         "id": "FX2jjGyIva",
//         "correct": ["CrYWHRRl7i"],
//         "options": [{
//           "text": "לנקות את המסך כל פעם לפני שמציירים את העיגול במקום החדש.",
//           "id": "CrYWHRRl7i"
//         }, {
//           "text": "אין לה מטרה.",
//           "id": "9TPxiEQppA"
//         }, {
//           "text": "להכריז שהולכים להיות מוגדרים משתנים בהמשך.",
//           "id": "zpbcJlh9GC"
//         }]

//       }, {
//         "type": "multi-choice",
//         "text": "בתוך הקוד השני, מחקו את השורה עם הפקודה clf. הריצו שוב את הקוד הראשון ואח״כ שוב ושוב את הקוד השני. מה קורה?",
//         "id": "FX2jjGlI2a",
//         "correct": ["C63WHkRl7i"],
//         "options": [{
//           "text": "נוספים עוד ועוד עיגולים חדשים במקומות חדשים",
//           "id": "C63WHkRl7i"
//         }, {
//           "text": "העיגול לא זז",
//           "id": "92PximQppA"
//         }, {
//           "text": "יש הודעת שגיאה",
//           "id": "z1bcJlw9GC"
//         }]
//       }, {
//         "type": "text-input",
//         "text": "תוכלו להסביר למה?",
//         "multiline": 1,
//         "id": "IwHcswgPUb",
//       }, {
//         "type": "label",
//         "text": "החזירו את הפקודה ()clf לשורה הראשונה. הריצו את התא הראשון ואת התא השני כדי לראות שהכל עובד כשורה. רשמו 'x' באחד השדות בצד ימין של המסך (כמו בתמונה המצורפת, המספר יהיה שונה).",
//         "id": "oO156gSxKn"
//       }, {
//         "type": "image",
//         "src": "https://webhome.weizmann.ac.il/home/ifigures/Hapi/SimulatingMotion/Ex1/images/3.png",
//         "id": "HF1Jawy7zv"
//       }, {
//         "type": "multi-choice",
//         "text": "הריצו את התא הראשון (מצד שמאל). מה ערכו של המשתנה x? (כפי שמופיע בצד ימין)",
//         "id": "FX212GlI2a",
//         "correct": ["C6312mRl7i"],
//         "options": [{
//           "text": "0",
//           "id": "C6312mRl7i"
//         }, {
//           "text": "4.4",
//           "id": "38PximQppA"
//         }, {
//           "text": "0.2",
//           "id": "z1bc65z9GC"
//         }]
//       }, {
//         "type": "multi-choice",
//         "text": "הריצו את התא השני פעמיים. מה ערכו כעת של המשתנה x?",
//         "id": "FX2awzlI2a",
//         "correct": ["C62Wtkxl7i"],
//         "options": [{
//           "text": "0.4",
//           "id": "C62Wtkxl7i"
//         }, {
//           "text": "0.2",
//           "id": "71wxemsppA"
//         }, {
//           "text": "0",
//           "id": "41bhJlf9aC"
//         }]
//       }, {
//         "type": "text-input",
//         "text": "הסבירו מדוע:",
//         "multiline": 1,
//         "id": "Iw1cs4gP2b",
//       }]
//     }, {
//       "header": "הלולאה המרכזית",
//       "id": "lj8GRU76gO",
//       "elements": [{
//         "type": "label",
//         "text": "כעת נעבור לתא שמתחת ל-Repeat every 0.01 sec \n\n רשמו בתוך התא את השורה:\n\n`x+=0.02`",
//         "id": "oOnvOgSxKn"
//       }, {
//         "type": "image",
//         "src": "https://webhome.weizmann.ac.il/home/ifigures/Hapi/SimulatingMotion/Ex1/images/4.png",
//         "id": "HF1fx157x1"
//       }, {
//         "type": "multi-choice",
//         "text": "הריצו את התא, מה קורה?",
//         "id": "06T123c1Hf",
//         "correct": ["wduxxUe6tw"],
//         "options": [{
//           "text": "הערך של המשתנה x משתנה ברציפות",
//           "id": "wduxxUe6tw"
//         }, {
//           "text": "העיגול זז",
//           "id": "URLWrW0cd3"
//         }, {
//           "text": "הערך של המשתנה x משתנה ברציפות והעיגול זז",
//           "id": "Hfv2EYOs5s"
//         }]
//       }, {
//         "type": "label",
//         "text": "כעת שנו את קצב החזרה ל 0.5 שניות:",
//         "id": "aOAvOgSxKn"
//       }, {
//         "type": "image",
//         "src": "https://webhome.weizmann.ac.il/home/ifigures/Hapi/SimulatingMotion/Ex1/images/5.png",
//         "id": "HF1fx152x1"
//       }, {
//         "type": "label",
//         "text": "עצרו את הריצה (לחיצה על כפתור העצירה עם הריבוע) והריצו שוב. כעת החזרה קוראת כל 0.5 שניות. כל מה שנכתוב בתוך התא יחזור שוב ושוב בהפרשי זמן כפי שנקבע בכותרת.\n\nנסו להמנע משימוש בקריאה לקוד ()code2 כפי שהיה בסרטון.",
//         "id": "vBfvsg24Kn"
//       }, {
//         "type": "multi-choice",
//         "text": "אילו מהקודים הבאים גורם לתנועת העיגול כפי שבסרטון?",
//         "dontShuffle": 1,
//         "id": "FX2duGyIva",
//         "correct": ["CrY12rtl7i"],
//         "options": [{
//           "text": "![תמונה א](https://webhome.weizmann.ac.il/home/ifigures/Hapi/SimulatingMotion/Ex1/images/6.png)",
//           "id": "12oOiEQppA"
//         }, {
//           "text": "![תמונה ב](https://webhome.weizmann.ac.il/home/ifigures/Hapi/SimulatingMotion/Ex1/images/7.png)",
//           "id": "zp5c62h9GC"
//         }, {
//           "text": "![תמונה ג](https://webhome.weizmann.ac.il/home/ifigures/Hapi/SimulatingMotion/Ex1/images/8.png)",
//           "id": "kjac6vh9GC"
//         }, {
//           "text": "א. ו- ב. אך לא ג",
//           "id": "CrY12rtl7i"
//         }]
//       }, {
//         "type": "text-input",
//         "text": "מדוע לדעתכם?",
//         "multiline": 1,
//         "id": "Iwsci4gu2b",
//       }]
//     }, {
//       "header": "אתגרים",
//       "id": "xD078JIUj7",
//       "elements": [{
//         "type": "label",
//         "text": "1. מה קורה אם משתמשים בפקודה Point במקום Circle? \n1. נסו לגרום לעיגול לנוע באותה מהירות על המסך אך בצורה חלקה.\n1.	נסו לגרום לעיגול לנוע שמאלה.\n1.	נסו לגרום לעיגול לנוע למעלה או למטה.",
//         "id": "o47vOgSxKn"
//       }]
//     }
//   ]
// };

// const structure = structureEn;
// const structure = structureHe;
const structure = {};

ReactDOM.render(
  <React.StrictMode>
    <App structure={structure} />
  </React.StrictMode>,
  document.getElementById('root')
);
