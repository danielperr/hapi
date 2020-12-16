import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/App';

import './style.css';

let structure = {};

// Use dev mode structure in local storage
if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
  const localStorageStructure = localStorage.getItem('devmode-structure');
  try {
    structure = JSON.parse(localStorageStructure);
  } catch {
    alert('There was a problem parsing the current devmode structure');
  }
  if (!Object.entries(structure).length) {
    structure = {
      language: 'en',
      mainHeader: 'Developer Mode Activity',
      sections: [
        {
          header: 'Empty Section',
          elements: [],
        },
      ],
    };
    localStorage.setItem('devmode-structure', JSON.stringify(structure));
  }
}

let insideIframe = true;
try {
  insideIframe = window.self !== window.top;
} catch {}

console.log(`inside iframe: ${insideIframe}`);

if (insideIframe) {
  console.log('waiting for signal...');
  window.addEventListener('message', (event) => {
    console.log(event.data);
    const { message, value } = event.data;
    const { structure, answers } = value;
    if (message === 'getContent') {
      renderApp(structure, answers);
    }
  }, false);
} else {
  renderApp(structure, {});
}

function renderApp(structure, answers) {
  ReactDOM.render(
    <React.StrictMode>
      <App structure={structure} initialAnswers={answers} />
    </React.StrictMode>,
    document.getElementById('root')
  );
}
