import { useState } from 'react';
import './App.css';
import { Button } from './components';

function App() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((c) => c + 1);

  return (
    <>
      <Button label={`Count is ${count}`} onClick={increment} />
    </>
  );
}

export default App;
