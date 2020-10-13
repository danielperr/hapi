import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/App';

import './style.css';

let structure = {};

if (process.env.NODE_ENV && process.env.NODE_ENV !== 'production') {
  structure = JSON.parse(atob(process.env.REACT_APP_STRUCTURE));
}

ReactDOM.render(
  <React.StrictMode>
    <App structure={structure} />
  </React.StrictMode>,
  document.getElementById('root')
);
