
import React, { useEffect } from 'react';
import './Completion.css'; 

const Completion = ({ onRestart }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRestart(); 
    }, 5000);

    return () => clearTimeout(timer); 
  }, [onRestart]);

  return (
    <div className="completion-container">
      <h2>Thank You for Your Feedback!</h2>
      <p>We appreciate your time and effort in helping us improve our service.</p>
    </div>
  );
};

export default Completion;
