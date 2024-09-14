import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import FormularioLargo from './components/FormularioLargo';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <FormularioLargo />
    </>
  );
}

export default App;
