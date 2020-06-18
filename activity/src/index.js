import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import { App } from './App';


const PEILUT = {
  "mainHeader": "תרגול - הדמית תנועה",
  "sections": [{
      "header": "צפו בסרטון הבא",
      "elements": [{
          "type": "youtube",
          "youtubeId": "E7wJTI-1dvQ"
      }, {
          "type": "single-line-text-input",
          "text": "כתבו במילים שלכם, כיצד גורמים לאשליה שעיגול נע על המסך?"
      }]
  }, {
      "header": "הקוד הראשון",
      "elements": [{
          "type": "label",
          "text": "פתחו דף ifigures חדש ע״י לחיצה על הקישור הבא [empty ifigure](https://www.google.com)\n\nהשתמשו בחלון שלפניכם, העתיקו את הקוד הראשון (בצד שמאל מתחת לחלון code1, ראו תמונה מצורפת) והריצו אותו."
      }, {
          "type": "image",
          "src": "https://image.shutterstock.com/image-photo/colorful-flower-on-dark-tropical-260nw-721703848.jpg"
      }, {
          "type": "multi-choice",
          "text": "לאחר שהרצתם, מה קרה?",
          "correct": ["נוצר עיגול כחול על המסך ולא קרה שום דבר נוסף."],
          "incorrect": ["לא קרה כלום שניתן לראות.", "נוצרה הדמיה של כדור זז"]
      }, {
          "type": "multi-choice",
          "text": "הריצו את התא שוב ושוב. מה קורה?",
          "correct": ["לא נראה שקורה משהו."],
          "incorrect": ["בכל פעם העיגול זז.", "כשלוחצים שוב העיגול נעלם."]
      }]
  }, {
      "header": "הקוד השני",
      "elements": [{
          "type": "label",
          "text": "העתיקו את הקוד השני (בצד שמאל מתחת לחלון code2, ראו תמונה מצורפת)."
      }, {
          "type": "image",
          "src": "https://www.bigstockphoto.com/images/homepage/module-6.jpg"
      }, {
          "type": "multi-choice",
          "text": "הריצו אותו שוב ושוב. מה קורה?",
          "correct": ["בכל פעם העיגול זז."],
          "incorrect": ["לא נראה שקורה משהו.", "העיגול נעלם."]
      }, {
          "type": "multi-choice",
          "text": "מה מטרת הפקודה clf לדעתכם?",
          "correct": ["לנקות את המסך כל פעם לפני שמציירים את העיגול במקום החדש."],
          "incorrect": ["אין לה מטרה.", "להכריז שהולכים להיות מוגדרים משתנים בהמשך."]
      }, {
          "type": "multi-line-text-input",
          "text": "תכתבו הרבה שורות פה"
      }]
  }]
};


ReactDOM.render(
  <React.StrictMode>
    <App data={PEILUT} />
  </React.StrictMode>,
  document.getElementById('root')
);
