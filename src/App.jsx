// import './App.css'
// import PixiComponent from './PixiComponent'
import Home from './Home'
import PixiComponent2 from './PixiComponent2'
import PixiGame2 from './PixiGame2'
 import PixiComponent3 from './PixiGame3'
// import PixiComponent4 from './PixiGame4'
import { BrowserRouter as Path, Route, Routes } from 'react-router-dom'
function App() {

  return (
    <Path>
      <Routes>
        <Route exact path='/' element = {<Home/>}/>
        <Route exact path='/game1' element = {<PixiComponent2/>}/>
        <Route exact path='/game2' element = {<PixiGame2/>}/>
        <Route exact path='/game3' element = {<PixiComponent3/>}/>
        {/* <Route exact path='/game4' element={<PixiComponent4/>}/> */}
      </Routes>
    </Path>
  )
}


export default App