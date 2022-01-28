import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AppContext from './context/AppContext';

//below: nesting App in AppContext to access state from the context
// so App becomes child of AppContext and the source of props.children used in AppContext
ReactDOM.render(
  <React.StrictMode>
    <AppContext>
      <App />
    </AppContext>  
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
