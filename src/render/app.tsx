import React from 'react';
import AppBar from './components/app-bar';

// type Props = {};

const App: React.FC = () => {
  return (
    <>
      <AppBar />
      <div className="test">This is from the app</div>
    </>
  );
};

export default App;
