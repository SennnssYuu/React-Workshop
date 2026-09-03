import {createContext,useState} from 'react';
import Menu from './components/Menu';
import Quiz from './components/Quiz';
import Score from './components/Score';

import './App.css';

export const DataContext = createContext();

function App() {
  const [appState, setAppState] = useState('menu');
  const [score, setScore] = useState(0);
  return (
    <div className="App">
      <DataContext.Provider value = {{appState, setAppState, score, setScore}}>
        <h1>Web Development Quiz</h1>
          {appState === 'menu' && <Menu />}
          {appState === 'quiz' && <Quiz />}
          {appState === 'score' && <Score />}
      </DataContext.Provider>
    </div>
  );
}

export default App;
