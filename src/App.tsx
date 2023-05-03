import React, { useEffect,} from 'react';
import logo from './logo.svg';
import './App.css';
import readKeys from './utils/halo-reader';

function App() {
  const onPressHandler = async ()=>{
    alert("pressed");
    await readKeys();
  }
  return (
    <div className="App">
      <header className="App-header">
      <button type="button" onClick={onPressHandler}>Click Me</button>
      </header>
    </div>
  );
}

export default App;
