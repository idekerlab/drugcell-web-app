import React from 'react';
import logo from './logo.svg';
import { Results } from './features/results/Results'
import { BrowserRouter } from 'react-router-dom';
import './App.css';

import AppShell from './components/AppShell'

const App = props => {
  

  return (
    <BrowserRouter>
    <AppShell {...props}>
      <Results />
    </AppShell>
   </BrowserRouter>
  );
}

export default App;
