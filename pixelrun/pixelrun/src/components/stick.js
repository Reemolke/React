import React, { useState, useRef, useEffect, useCallback } from 'react';

const Stick = () => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef(null);
  const keyPressed = useRef({}); // Inicializamos como objeto vacío

  // Función para mover el "stick" a las esquinas o bordes
  const moveToMax = useCallback((direction) => {
    setPosition((prevPosition) => {
      switch (direction) {
        case 'W':
          return { ...prevPosition, y: 0 }; // Mover hacia arriba
        case 'A':
          return { ...prevPosition, x: 0 }; // Mover hacia la izquierda
        case 'S':
          return { ...prevPosition, y: 100 }; // Mover hacia abajo
        case 'D':
          return { ...prevPosition, x: 100 }; // Mover hacia la derecha
        case 'WA':
          return { x: 0, y: 0 }; // Diagonal arriba izquierda
        case 'WD':
          return { x: 100, y: 0 }; // Diagonal arriba derecha
        case 'SA':
          return { x: 0, y: 100 }; // Diagonal abajo izquierda
        case 'SD':
          return { x: 100, y: 100 }; // Diagonal abajo derecha
        default:
          return prevPosition;
      }
    });
  }, []);

  // Resetear posición al centro
  const resetPosition = () => {
    setPosition({ x: 50, y: 50 });
  };

  // Detectar teclas presionadas (WASD) y sus combinaciones diagonales
  useEffect(() => {
    const handleKeyDown = (e) => {
      keyPressed.current[e.key.toLowerCase()] = true;

      // Verificar combinaciones de teclas
      if (keyPressed.current['w'] && keyPressed.current['a']) {
        moveToMax('WA'); // Mover diagonal arriba izquierda
      } else if (keyPressed.current['w'] && keyPressed.current['d']) {
        moveToMax('WD'); // Mover diagonal arriba derecha
      } else if (keyPressed.current['s'] && keyPressed.current['a']) {
        moveToMax('SA'); // Mover diagonal abajo izquierda
      } else if (keyPressed.current['s'] && keyPressed.current['d']) {
        moveToMax('SD'); // Mover diagonal abajo derecha
      } else {
        // Comprobar si se presionó una tecla individual
        if (keyPressed.current['w']) {
          moveToMax('W');
        } else if (keyPressed.current['a']) {
          moveToMax('A');
        } else if (keyPressed.current['s']) {
          moveToMax('S');
        } else if (keyPressed.current['d']) {
          moveToMax('D');
        }
      }
    };

    const handleKeyUp = (e) => {
      delete keyPressed.current[e.key.toLowerCase()];

      // Resetear cuando no haya teclas presionadas
      if (Object.keys(keyPressed.current).length === 0) {
        resetPosition();
      }
    };

    // Agregar listeners para las teclas presionadas y liberadas
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      // Limpiar los listeners cuando el componente se desmonte
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [moveToMax]);

  // Lógica para el movimiento del mouse y arrastre
  const handleMouseMove = (e) => {
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const newX = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
    const newY = Math.min(Math.max(e.clientY - rect.top, 0), rect.height);

    setPosition({
      x: (newX / rect.width) * 100,
      y: (newY / rect.height) * 100,
    });
  };

  // Lógica para iniciar el arrastre con el mouse
  const handleMouseDown = (e) => {
    e.preventDefault();
    const moveListener = (e) => handleMouseMove(e);
    const upListener = () => {
      // Restablecer posición al centro cuando se deja de arrastrar
      resetPosition();

      document.removeEventListener('mousemove', moveListener);
      document.removeEventListener('mouseup', upListener);
    };

    document.addEventListener('mousemove', moveListener);
    document.addEventListener('mouseup', upListener);
  };

  return (
    <div
      className="stick"
      ref={containerRef}
      style={{
        position: 'relative',
      }}
      onMouseDown={handleMouseDown}
    >
      <div
        className="bola"
        style={{
          position: 'absolute',
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          backgroundColor: 'blue', // Color de la bola
          cursor: 'pointer',
        }}
      />
    </div>
  );
};

export default Stick;
