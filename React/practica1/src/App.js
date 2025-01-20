import React, { useState } from 'react';
import './App.css';
import BotonSaludo from './components/BotonSaludo';
import Formulario from './components/Formulario';
import Galeria from './components/Galeria';
import Cronometro from './components/Cronometro';

function App() {
  const [texto, setTexto] = useState("Texto por defecto");
  const [color, setColor] = useState("green");
  const memeUrls = {
    "Doge Meme": "https://tse1.mm.bing.net/th?id=OIP.njSnicd2tB3nzmSjYBzVZAHaKF&pid=Api",
    "Old Meme": "https://tse3.mm.bing.net/th?id=OIP.fTTQd0hYG7hjVdWcGhAFYgHaIV&pid=Api",
    "Gato Meme": "https://tse3.mm.bing.net/th?id=OIP.8D5EHPwVsALy_T_FfMrmkAHaHa&pid=Api",
    "Fish Meme": "https://tse3.mm.bing.net/th?id=OIP.vkja0cPPukI_yLNJupoYuAHaFj&pid=Api",
    "Judgemental Cat": "https://i.kym-cdn.com/photos/images/original/002/735/538/c9a"
};

  
  
  const manejarClick = () => {
    alert("¡Botón presionado con texto: " +texto+ " y color: "+color+"!");
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>React Práctica</h1>
      <section>
      <h2>Configurador de Botón</h2>
      
      <label>
        Texto del botón:
        <input 
          type="text" 
          value={texto} 
          onChange={(e) => setTexto(e.target.value)} 
          style={{ marginLeft: '10px', padding: '5px' }}
        />
      </label>
      
      <br /><br />
      
      <label>
        Color del botón:
        <select 
          value={color} 
          onChange={(e) => setColor(e.target.value)} 
          style={{ marginLeft: '10px', padding: '5px' }}
        >
          <option value="green">Verde</option>
          <option value="blue">Azul</option>
          <option value="red">Rojo</option>
          <option value="purple">Morado</option>
          <option value="orange">Naranja</option>
        </select>
      </label>
      
      <br /><br />
      
      <BotonSaludo 
        texto={texto} 
        color={color} 
        onClick={manejarClick} 
      />
      </section>
      <section>
      <h2>Formulario</h2>
      
      <Formulario/>
      </section>
      <section>
        <h2>Galería</h2>
        <Galeria urls = {memeUrls}></Galeria>
      </section>
      <section>
        <h2>Cronómetro</h2>
        <Cronometro/>
      </section>
    </div>
  );
}

export default App;
