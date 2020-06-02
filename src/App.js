import React from 'react';
import logo from './logo.svg';
import { Results } from './features/results/Results'
import './App.css';

import AppShell from './components/AppShell'

const App = props => {
  return (
    <AppShell {...props}>
      <Results />
    </AppShell>
  );
}

export default App;
