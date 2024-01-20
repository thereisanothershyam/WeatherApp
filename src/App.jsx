// src/App.js
// eslint-disable-next-line no-unused-vars
import React from 'react';
import Weather from './Weather';
import './App.css';
import PostGrid from './components/PostGrid';

function App() {
  return (
    <div className="App">
      <Weather />
     <header className="App-header">
     <h1>React API Grid App</h1>
     <PostGrid />
   </header>
   </div>
  );
}

export default App;
