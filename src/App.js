
import './App.css';
import Home from './Templates/Home';
import Design from './Templates/Design';
import Shaft from './Templates/Shaft';
import Axle from './Templates/Axle'

import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/Design" element={<Design/>}/>
          <Route exact path="/Design/Shaft" element={<Shaft/>}/>
          <Route exact path="/Design/Axle" element={<Axle/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
