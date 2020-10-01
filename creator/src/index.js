import React from 'react';
import ReactDOM from 'react-dom';

import App from './main/app';
import './index.css';

console.log(`Copyright (c) 2020 Amir Kedem, Daniel Peretz and Boaz Katz
https://github.com/1ZouLTReX1/iFigures
${process.env.NODE_ENV} environment
`)

const initialOverride = {
  "mainHeader": "פעילות ריקה",
  "sections": [
    {
      "header": "יחידה ריקה",
      "elements": [
        {
          "type": "multi-choice",
          "id": "wfqQwgnT0P",
          "correct": [
            "x5p9g74IoB"
          ],
          "options": [
            {
              "text": "תשובה ראשונה",
              "id": "x5p9g74IoB"
            },
            {
              "text": "תשובה שנייה",
              "id": "Wb6cbed1lF"
            },
            {
              "text": "תשובה שלישית",
              "id": "JY2zjo8QBa"
            }
          ],
          "text": "שאלה"
        }
      ],
      "id": "s7IkILYh4f"
    }
  ],
  "id": "cQnmiv3DAT5gy6QC1xSB"
};

ReactDOM.render(
  <React.StrictMode>
    <App initial={initialOverride} />
  </React.StrictMode>,
  document.getElementById('root')
);
