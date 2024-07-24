import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../src/components/Home';
import PixiGame1 from './components/PixiGame1';
import PixiGame2 from '../src/components/PixiGame2';
import PixiGame3 from '../src/components/PixiGame3';
import PixiGame4 from '../src/components/PixiGame4';
import PixiGame5 from'../src/components/PixiGame5';
import PixiGame6 from '../src/components/PixiGame6';
import PixiGame7 from '../src/components/PixiGame7';
import PixiGame8 from '../src/components/PixiGame8';
import PixiGame9 from '../src/components/PixiGame9';
import PixiGame10 from '../src/components/PixiGame10';
import Completed from '../src/components/Completed';

function App() {
  const [lang, setLang] = useState('English'); // default language is English

  // useEffect(() => {
  //   const handlePointerDown = () => {
  //     console.log(lang);
  //   };

  //   window.addEventListener('pointerdown', handlePointerDown);

  //   return () => {
  //     window.removeEventListener('pointerdown', handlePointerDown);
  //   };
  // }, [lang]);

  return (
    <Router basename="/games/wordsearching">
      <Routes>
        <Route path="/" element={<Home lang={lang} setLang={setLang} />} />
        <Route path="/game1" element={<PixiGame1 lang={lang} />} />
        <Route path="/game2" element={<PixiGame2 lang={lang} />} />
        <Route path="/game3" element={<PixiGame3 lang={lang} />} />
        <Route path="/game4" element={<PixiGame4 lang={lang} />} />
        <Route path="/game5" element={<PixiGame5 lang={lang} />} />
        <Route path="/game6" element={<PixiGame6 lang={lang} />} />
        <Route path="/game7" element={<PixiGame7 lang={lang} />} />
        <Route path="/game8" element={<PixiGame8 lang={lang} />} />
        <Route path="/game9" element={<PixiGame9 lang={lang} />} />
        <Route path="/game10" element={<PixiGame10 lang={lang} />} />
        <Route path="/Completed" element={<Completed />} />
      </Routes>
    </Router>
  );
}

export default App;
