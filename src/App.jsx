// import './App.css'
// import PixiComponent from '../src/components/PixiComponent'
import Home from '../src/components/Home'
import PixiGame1 from './components/PixiGame1'
import PixiGame2 from '../src/components/PixiGame2'
 import PixiGame3 from '../src/components/PixiGame3'
// import PixiComponent4 from '../src/components/PixiGame4'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PixiGame4 from '../src/components/PixiGame4'
import PixiGame5 from'../src/components/PixiGame5'
import PixiGame6 from '../src/components/PixiGame6'
import PixiGame7 from '../src/components/PixiGame7'
import PixiGame8 from '../src/components/PixiGame8'
import PixiGame9 from '../src/components/PixiGame9'
import PixiGame10 from '../src/components/PixiGame10'
import Completed from '../src/components/Completed'

function App() {
  return (
    <Router basename="/games/wordsearching">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game1" element={<PixiGame1 />} />
        <Route path="/game2" element={<PixiGame2 />} />
        <Route path="/game3" element={<PixiGame3 />} />
        <Route path="/game4" element={<PixiGame4 />} />
        <Route path="/game5" element={<PixiGame5 />} />
        <Route path="/game6" element={<PixiGame6 />} />
        <Route path="/game7" element={<PixiGame7 />} />
        <Route path="/game8" element={<PixiGame8 />} />
        <Route path="/game9" element={<PixiGame9 />} />
        <Route path="/game10" element={<PixiGame10 />} />
        <Route path="/Completed" element={<Completed />} />
      </Routes>
    </Router>
  );
}
export default App;