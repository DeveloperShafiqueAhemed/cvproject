import React, { useRef, useEffect } from 'react';

const BlackAndWhiteImageConverter = () => {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleFileChange = () => {
    const file = fileInputRef.current.files[0];
    const imageUrl = URL.createObjectURL(file);
    convertToBlackAndWhite(imageUrl);
  };

  const convertToBlackAndWhite = (imageUrl) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      const maxWidth = 400; // Maximum width for the canvas
      const scaleFactor = maxWidth / image.width;
      const canvasWidth = image.width * scaleFactor;
      const canvasHeight = image.height * scaleFactor;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);

      const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg; // red
        data[i + 1] = avg; // green
        data[i + 2] = avg; // blue
      }

      ctx.putImageData(imageData, 0, 0);
    };
  };

  return (
    <div>
      <h2>Black and White Image Converter</h2>
      <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} />
      <canvas ref={canvasRef} style={{ border: '1px solid black', maxWidth: '400px' }} />
    </div>
  );
};

export default BlackAndWhiteImageConverter;
