import React, { useState } from 'react';
import './App.css';
import BotonSaludo from './components/BotonSaludo';
import Formulario from './components/Formulario';
import Galeria from './components/Galeria';
import Cronometro from './components/Cronometro';

function App() {
  const [texto, setTexto] = useState("Texto por defecto");
  const [color, setColor] = useState("green");
  const [nombre, setNombre] = useState("Riquelmer");
  const [mensaje,setMensaje] = useState("Mensaje");
  const memeUrls = [
    "https://tse1.mm.bing.net/th?id=OIP.njSnicd2tB3nzmSjYBzVZAHaKF&pid=Api",  // Doge Meme PNG
    "https://tse3.mm.bing.net/th?id=OIP.fTTQd0hYG7hjVdWcGhAFYgHaIV&pid=Api",  // Funny Memes - Free Large Images
    "https://tse3.mm.bing.net/th?id=OIP.8D5EHPwVsALy_T_FfMrmkAHaHa&pid=Api",  // Gato Meme Imagens – Freepik
    "https://tse3.mm.bing.net/th?id=OIP.vkja0cPPukI_yLNJupoYuAHaFj&pid=Api",  // Don't worry, there's plenty of fish in the sea (Photo by Francesco)
    "https://i.kym-cdn.com/photos/images/original/002/735/538/c9a"   // Meme Images – Pixabay
  ];
  
  
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
      <label>
        Nombre
        <input 
          type="text" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
          style={{ marginLeft: '10px', padding: '5px' }}
        />
      </label>
      <label>
        Mensaje
        <input 
          type="text" 
          value={mensaje} 
          onChange={(e) => setMensaje(e.target.value)} 
          style={{ marginLeft: '10px', padding: '5px' }}
        />
      </label>
      <Formulario nombre={nombre} mensaje={mensaje}/>
      </section>
      <section>
        <h2>Galería</h2>
        <div class="Galeria"><Galeria urls = {memeUrls}></Galeria></div>
      </section>
      <section>
        <h2>Cronómetro</h2>
        <Cronometro/>
      </section>
    </div>
  );
}

export default App;
