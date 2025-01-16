import React from 'react';

function Galeria(props) {
  return (
    <div className="galeria">
      {props.urls.map((url, index) => (
        <img key={index} src={url} className="meme-image"/>
      ))}
    </div>
  );
}

export default Galeria;
