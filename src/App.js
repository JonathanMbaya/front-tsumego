import React from 'react';
import BoardGoban from './components/boardgame/BoardGoban';
import './App.css';


function App() {


  return (
    <div className="App">
      <h1>Tsumego</h1>
      <h1>Niveau 1</h1>

      <BoardGoban className='board'/>

    </div>
  );
}

export default App;
