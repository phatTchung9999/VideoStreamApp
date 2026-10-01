import './App.css';
import { useState } from 'react';
import Index from './component/Index.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <Index 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn}
      />
    </>
  );
}

export default App;
