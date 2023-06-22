import React, { useState } from 'react';
import "../Assets/css/styleRV.css"
const ReviewCRUD = () => {
  const [stars, setStars] = useState([false, false, false, false, false]);

  const handleClick = (index) => {
    const newStars = [...stars];
    for (let i = 0; i <= index; i++) {
      newStars[i] = true;
    }
    setStars(newStars);
  };

  return (
    <div>
      {stars.map((filled, index) => (
        <span
          key={index}
          className={`starRV ${filled ? 'filled' : ''}`}
          onClick={() => handleClick(index)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default ReviewCRUD;
