import React from 'react';

const Notification = ({ message, type }) => {
  return (
    <div
      className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow-md text-white transform transition-transform duration-300 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      } animate-pop`}
    >
      {message}
    </div>
  );
};

export default Notification;
