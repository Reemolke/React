import './App.css';
import Stick from './components/stick.js';
import Screen from './components/screen.js';
function App() {
  return (
    
    <div class="index">
      <Screen pagina='2'/>
      <div class="botones">
        <Stick/>
        <div class="botonAtras"></div>
        <div class="botonDelante"></div>
      </div>
    </div>
  );
}

export default App;
