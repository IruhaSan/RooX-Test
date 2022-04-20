import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const Component: FC = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

ReactDOM.render(
  <React.StrictMode>
    <Component />
  </React.StrictMode>,
  document.getElementById('root'),
);
