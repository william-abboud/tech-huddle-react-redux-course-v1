import './main.scss';
import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';

function MyComponent() {
  return <div>Hello World</div>;
}

ReactDOM.render(
  <MyComponent />, document.getElementById("root")
);
