import Home from './screens/Home.jsx';
import {BrowserRouter , Routes, Route } from "react-router-dom";

import Room from './screens/Room';
function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/rooms/:roomName" element={<Room/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
