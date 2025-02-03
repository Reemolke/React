

import React, { useState, useRef,useEffect } from 'react';

const Stick = () => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef(null);
  const keyPressed = useRef(null);
  const moveToMax = (direction) => {
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    switch (direction) {
      case 'W':
        setPosition({ x: position.x, y: 0 }); // Mover arriba
        break;
      case 'A':
        setPosition({ x: 0, y: position.y }); // Mover a la izquierda
        break;
      case 'S':
        setPosition({ x: position.x, y: 100 }); // Mover abajo
        break;
      case 'D':
        setPosition({ x: 100, y: position.y }); // Mover a la derecha
        break;
      default:
        break;
    }
  };

  // Resetear a la posición original (50%, 50%)
  const resetPosition = () => {
    setPosition({ x: 50, y: 50 });
  };

  // Detectar la tecla presionada (WASD)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!keyPressed.current) {
        keyPressed.current = e.key;
        if (e.key === 'w' || e.key === 'W') {
          moveToMax('W');
        } else if (e.key === 'a' || e.key === 'A') {
          moveToMax('A');
        } else if (e.key === 's' || e.key === 'S') {
          moveToMax('S');
        } else if (e.key === 'd' || e.key === 'D') {
          moveToMax('D');
        }
      }
    };

    const handleKeyUp = (e) => {
      if (keyPressed.current === e.key) {
        keyPressed.current = null;
        resetPosition();
      }
    };

    // Agregar event listeners para las teclas WASD
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Limpiar los event listeners cuando el componente se desmonte
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [position]);

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

  const handleMouseDown = (e) => {
    e.preventDefault();
    const moveListener = (e) => handleMouseMove(e);
    const upListener = () => {
    setPosition({ x: 50, y: 50 });
      document.removeEventListener('mousemove', moveListener);
      document.removeEventListener('mouseup', upListener);
    };

    document.addEventListener('mousemove', moveListener);
    document.addEventListener('mouseup', upListener);
  };

  return (
    <div
        className='stick'
      ref={containerRef}
      style={{
        position: 'relative',
        width: '6vw',
        height: '11vh',
        border: '2px solid #ccc',
      }}
      onMouseDown={handleMouseDown}
    >
      <div className='bola'
        style={{
          position: 'absolute',
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: 'translate(-50%, -50%)',
          width: '6vw',
          height: '11vh',
          borderRadius: '50%',
          cursor: 'pointer',
        }}
        
      />
    </div>
  );
};

export default Stick;
