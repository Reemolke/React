import './App.css';
import Stick from './components/stick.js';
function App() {
  return (
    <div class="index">
      <div class="botones">
        <Stick/>
        <div class="botonAtras"></div>
        <div class="botonDelante"></div>
      </div>
    </div>
  );
}

export default App;
