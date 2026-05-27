import { useState, useEffect } from 'react';

export function useDashboardData() {
  const [data, setData] = useState({ users: [], products: [], orders: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    
    // Simulamos la carga asíncrona original
    const timer = setTimeout(() => {
      setData({
        users: [
          { id: 1, name: 'Sergio', role: 'Admin' },
          { id: 2, name: 'Ana', role: 'Developer' },
          { id: 3, name: 'Luis', role: 'Designer' },
        ],
        products: [
          { id: 1, name: 'Laptop', price: 1000 },
          { id: 2, name: 'Mouse', price: 50 },
          { id: 3, name: 'Keyboard', price: 120 },
        ],
        orders: [
          { id: 1, total: 300 },
          { id: 2, total: 900 },
        ],
      });
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Función genérica para borrar elementos y evitar repetir la misma lógica 3 veces
  const deleteItem = (type, id) => {
    setData((prev) => ({
      ...prev,
      [type]: prev[type].filter((item) => item.id !== id),
    }));
  };

  return { data, loading, deleteItem };
}