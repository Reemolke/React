import React from 'react';

function Galeria(props) {
  return (
    <div className="galeria">
      {Object.entries(props.urls).map(([index, url]) => (
        <img key={index} src={url} alt={index}  className="meme-image"/>
      ))}
    </div>
  );
}

export default Galeria;
