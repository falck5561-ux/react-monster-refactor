import { useState } from 'react';

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (text) => {
    setNotifications((prev) => [
      ...prev,
      { id: Date.now(), text },
    ]);
  };

  return { notifications, addNotification };
}