import '../styles/Notification.css';

import React, { useState, useEffect } from 'react';


const Notification = ({ 
  message, 
  duration = 4500, // Увеличено до 4.5 секунд
  type = 'info' 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  if (!message || !isVisible) return null;

  return (
    <div className={`notification notification-${type} ${isVisible ? 'visible' : ''}`}>
      <div className="notification-content">
        {message}
      </div>
    </div>
  );
};

export default Notification;