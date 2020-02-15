import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

if (typeof console != "undefined")
    if (typeof console.log != 'undefined')
        console.olog = console.log;
    else
        console.olog = function () {
        };

console.log = function (message) {
    console.olog(message);
    let debugDiv;
    if (debugDiv = document.getElementById('debugDiv')) {
        debugDiv.innerText = (message);
    }

};
console.error = console.debug = console.info = console.warn = console.log;

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
