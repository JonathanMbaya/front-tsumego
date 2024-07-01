import React from 'react';
import './App.css';
// import Goban from './components/react-goban/Goban';
import Goban from './components/react-goban/SuccessGoban';

function App() {

  return (
    <div className="App">
      <h1>Tsumego</h1>
      <h1>Niveau 1</h1>

      <Goban className='react-goban'/>
    </div>
  );
}

export default App;
