import React from 'react';
import AppBar from './components/app-bar';
import MainView from './components/views/main.view';

interface Props {};

const App: React.FC<Props> = () => {
  return (
    <div className="app">
      <AppBar className="appbar" />
      <MainView className="mainview" />
    </div>
  );
};

export default App;
