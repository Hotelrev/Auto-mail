import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Notification from './Components/Notification';

const App = () => {
  const [email, setEmail] = useState('');
  const [hotelName, setHotelName] = useState('');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const dummyMessage = 'Dear {{hotelName}},\n\nWe want to make money from you. We hope to see you soon!\n\nBest regards,\nUsenobong Etokakpan. \nChief Executive Officer. \nHotelrev.';

  const handleSendEmail = async () => {
    setLoading(true);
    setNotification({ message: '', type: '' });

    setTimeout(async () => {
      try {
        const response = await axios.post('/send-email', {
          email,
          hotelName,
        });

        if (response.status === 200) {
          setNotification({ message: 'Email sent successfully!', type: 'success' });
          setEmail('');
          setHotelName('');
        } else {
          throw new Error('Failed to send email');
        }
      } catch (error) {
        setNotification({ message: 'Error sending email.', type: 'error' });
      } finally {
        setLoading(false);
        setTimeout(() => {
          setNotification({ message: '', type: '' });
        }, 2000); 
      }
    }, 2000);
  };

  const renderedMessage = dummyMessage.replace('{{hotelName}}', hotelName || '________');

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded shadow-md">
        <h1 className="text-2xl mb-6 text-center">Automated Emailing System</h1>
        <div className="mb-4">
          <label className="block text-sm mb-2">Hotel Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-none outline-none rounded bg-gray-700 text-white"
            placeholder="Enter hotel email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-2">Hotel Name:</label>
          <input
            type="text"
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
            className="w-full p-2 border border-none outline-none rounded bg-gray-700 text-white"
            placeholder="Enter hotel name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-2">Message Preview:</label>
          <textarea
            value={renderedMessage}
            readOnly
            className="w-full p-2 border border-none outline-none rounded bg-gray-700 text-white h-40"
          />
        </div>
        <button
          onClick={handleSendEmail}
          disabled={loading}
          className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold transition-colors duration-200"
        >
          {loading ? '...' : 'Send Email'}
        </button>
      </div>
      {notification.message && (
        <Notification message={notification.message} type={notification.type} />
      )}
    </div>
  );
};

export default App;
