import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

//*DEFINED
Object.defineProperty(Array.prototype, 'groupBy', {
  value: function (property) {
      return this.reduce(function (accumulator, obj) {
        let key = obj[property]
        if (!accumulator[key]) {
          accumulator[key] = []
        }
        accumulator[key].push(obj)
        return accumulator
      }, {})
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter basename='/'>
    <App />
  </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
