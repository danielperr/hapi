import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import { App } from './App';

const structure = {
    "mainHeader": "תרגול - הדמית תנועה",
    "sections": [{
        "header": "צפו בסרטון הבא",
        "id": "cwcXgOAKpC",
        "elements": [{
            "type": "youtube",
            "youtubeId": "E7wJTI-1dvQ",
            "id": "Xg77GHD91r"
        }, {
            "type": "single-line-text-input",
            "text": "כתבו במילים שלכם, כיצד גורמים לאשליה שעיגול נע על המסך?",
            "id": "HHbrsIPQD4"
        }]
    }, {
        "header": "הקוד הראשון",
        "id": "9Icl3Pg1Jn",
        "elements": [{
            "type": "label",
            "text": "פתחו דף ifigures חדש ע״י לחיצה על הקישור הבא [empty ifigure](https://www.google.com)\n\nהשתמשו בחלון שלפניכם, העתיקו את הקוד הראשון (בצד שמאל מתחת לחלון code1, ראו תמונה מצורפת) והריצו אותו.",
            "id": "KjaUH3GiYA"
        }, {
            "type": "image",
            "src": "https://image.shutterstock.com/image-photo/colorful-flower-on-dark-tropical-260nw-721703848.jpg",
            "id": "RdF0Nw2lHr"
        }, {
            "type": "multi-choice",
            "text": "לאחר שהרצתם, מה קרה?",
            "id": "Ob4YXMJI1S",
            "correct": [{
                "text": "נוצר עיגול כחול על המסך ולא קרה שום דבר נוסף.",
                "id": "dfN7KqKAvc"
            }],
            "incorrect": [{
                "text": "לא קרה כלום שניתן לראות.",
                "id": "bERliHW5id"
            }, {
                "text": "נוצרה הדמיה של כדור זז",
                "id": "BezdSQlolS"
            }]
        }, {
            "type": "multi-choice",
            "text": "הריצו את התא שוב ושוב. מה קורה?",
            "id": "wmNXgWxrYt",
            "correct": [{
                "text": "לא נראה שקורה משהו.",
                "id": "Z1uCwirDbE"
            }],
            "incorrect": [{
                "text": "כשלוחצים שוב העיגול נעלם.",
                "id": "RmjQJmbAeX"
            }, {
                "text": "בכל פעם העיגול זז.",
                "id": "Xqf0Qri5VA"
            }]
        }]
    }, {
        "header": "הקוד השני",
        "id": "g1sJYxF4Z1",
        "elements": [{
            "type": "label",
            "text": "העתיקו את הקוד השני (בצד שמאל מתחת לחלון code2, ראו תמונה מצורפת).",
            "id": "oOnvOgSxKn"
        }, {
            "type": "image",
            "src": "https://www.bigstockphoto.com/images/homepage/module-6.jpg",
            "id": "HF1JBwk7x1"
        }, {
            "type": "multi-choice",
            "text": "הריצו אותו שוב ושוב. מה קורה?",
            "id": "Q06Thlc1Hf",
            "correct": [{
                "text": "בכל פעם העיגול זז.",
                "id": "wdu0rUm6tw"
            }],
            "incorrect": [{
                "text": "העיגול נעלם.",
                "id": "URLWrW0cd3"
            }, {
                "text": "לא נראה שקורה משהו.",
                "id": "Hfv2EYOzDs"
            }]
        }, {
            "type": "multi-choice",
            "text": "מה מטרת הפקודה clf לדעתכם?",
            "id": "FX2jjGyIva",
            "correct": [{
                "text": "לנקות את המסך כל פעם לפני שמציירים את העיגול במקום החדש.",
                "id": "CrYWHRRl7i"
            }],
            "incorrect": [{
                "text": "אין לה מטרה.",
                "id": "9TPxiEQppA"
            }, {
                "text": "להכריז שהולכים להיות מוגדרים משתנים בהמשך.",
                "id": "zpbcJlh9GC"
            }]
        }, {
            "type": "multi-line-text-input",
            "text": "תכתבו הרבה שורות פה",
            "id": "IwHcswgPUb"
        }]
    }]
  };

ReactDOM.render(
  <React.StrictMode>
    <App structure={structure} />
  </React.StrictMode>,
  document.getElementById('root')
);
