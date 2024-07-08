import React from 'react';
// import BoardGoban from './components/Boardgame/BoardGoban';
import routes from './routes/PublicRouter';
import './App.css';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <RouterProvider router={routes}/>
    </div>
  );
}

export default App;
