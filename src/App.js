import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Menu } from 'antd';
import Router from './router';

function App() {
  return (
    <BrowserRouter>
      <Router></Router>
    </BrowserRouter>
  );
}

export default App;
