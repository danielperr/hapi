/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-alert */
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/App';
import './style.css';

const DEVMODE_DEFAULT_STRUCTURE = {
  language: 'en',
  mainHeader: 'Developer Mode Activity',
  sections: [
    {
      header: 'Empty Section',
      elements: [],
    },
  ],
};

/**
 * Tells React to render our app from `./components/app/App.jsx` with the given contents.
 * @param {Object} structure
 * @param {Object} answers
 */
function renderApp(structure, answers) {
  // Rendering App inside React.StrictMode without jsx notation
  ReactDOM.render(
    React.createElement(
      React.StrictMode,
      null,
      React.createElement(
        App,
        { structure, savedAnswers: answers },
      ),
    ),
    document.getElementById('root'),
  );
}

/**
 * Gets the activity structure and the saved answers and renders the app.
 * If we're inside an iFrame, wait for the contents to be received via postMessage and render.
 * Else if this is in development environment (from running `npm start` and not `npm run build`),
 *   get the structure from the local storage under `devmode-structure` and render.
 * Else assign an empty structure and render.
 */
function main() {
  let structure = {};
  let answers;
  if (window.self !== window.top) {
    // If we're inside an iFrame, we need to wait to receive the content from the upper frame.
    window.addEventListener('message', (event) => {
      const { message, value } = event.data;
      if (message === 'getContent') {
        structure = value.structure;
        answers = value.answers;
      }
    }, false);
  } else if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
    // If inside development environment, use the development structure from local storage
    const localStorageStructure = localStorage.getItem('devmode-structure');
    try {
      structure = JSON.parse(localStorageStructure);
    } catch {
      alert('There was a problem parsing the current devmode structure');
    }
    if (!Object.entries(structure).length) {
      structure = DEVMODE_DEFAULT_STRUCTURE;
      localStorage.setItem('devmode-structure', JSON.stringify(structure));
    }
  }
  renderApp(structure, answers);
}

main();
