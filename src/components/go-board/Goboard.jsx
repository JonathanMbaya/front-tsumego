import React, { useState } from 'react';
import Board from '@sabaki/go-board';

function App() {
  // Initialisation du plateau avec un état React
  const initialBoard = [
    [ 0, 0, 1, 0,-1,-1, 1, 0, 0],
    [ 1, 0, 1,-1,-1, 1, 1, 1, 0],
    [ 0, 0, 1,-1, 0, 1,-1,-1, 0],
    [ 1, 1, 1,-1,-1,-1, 1,-1, 0],
    [ 1,-1, 1, 1,-1, 1, 1, 1, 0],
    [-1,-1,-1,-1,-1, 1, 0, 0, 0],
    [ 0,-1,-1, 0,-1, 1, 1, 1, 1],
    [ 0, 0, 0, 0, 0,-1,-1,-1, 1],
    [ 0, 0, 0, 0, 0, 0, 0,-1, 0]
  ];

  const [board, setBoard] = useState(new Board(initialBoard));

  const makeMove = (sign, position) => {
    if (board.get(position) === 0) {
      let newBoard = board.makeMove(sign, position);
      setBoard(newBoard);
    }
  };

  return (
    <div className="App">
      <div className="board">
        {board.signMap.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className={`cell cell-${cell}`} onClick={() => makeMove(1, [rowIndex, cellIndex])}>
                {cell === 1 ? '⚫' : cell === -1 ? '⚪' : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
