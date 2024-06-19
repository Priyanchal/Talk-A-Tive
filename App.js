import './App.css';
// import ParticlesBackground from './ParticleComp/ParticlesBackground';
// import Particles from 'react-tsparticles';
import {Route} from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Chatpage from './Pages/Chatpage';

function App() {
  return (
    <div className="App">
      {/* <ParticlesBackground/> */}
      <Route path='/' component={Homepage} exact/>
      <Route path='/chats' component={Chatpage}/>
    </div>
  );
}

export default App;
