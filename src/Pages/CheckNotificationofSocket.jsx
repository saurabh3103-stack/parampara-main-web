import { useEffect, useState } from 'react';
import io from 'socket.io-client';

// Connect to the WebSocket server
const socket = io('http://34.131.10.8:3000'); // Adjust the URL if needed

function CheckNotificationofSocket() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Listen for notifications from the server
    socket.on('notification', (data) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        data.message,
      ]);
    });

    // Cleanup on unmount
    return () => {
      socket.off('notification');
    };
  }, []);

  return (
    <div>
      <h1>Order Notifications</h1>
      <div>
        {notifications.map((notification, index) => (
          <div key={index}>{notification}</div>
        ))}
      </div>
    </div>
  );
}

export default CheckNotificationofSocket;
