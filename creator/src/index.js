import React from 'react';
import ReactDOM from 'react-dom';

import App from './main/app';
import './index.css';

console.log(`Copyright (c) 2020 Amir Kedem, Daniel Peretz and Boaz Katz
https://github.com/1ZouLTReX1/iFigures
${process.env.NODE_ENV} environment
`)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
