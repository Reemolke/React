import React from 'react';

function Galeria(props) {
  return (
    <div className="galeria">
      {props.urls.map((url, index) => (
        <img key={index} src={url} alt={`Meme ${index}`} className="meme-image" />
      ))}
    </div>
  );
}

export default Galeria;
