import React, { useState, useMemo, useEffect } from 'react';

// Importamos nuestros Custom Hooks
import { useBrowserInfo } from './hooks/useBrowserInfo';
import { useNotifications } from './hooks/useNotifications';
import { useDashboardData } from './hooks/useDashboardData';

// Importamos nuestros Componentes de UI
import { SummaryCard } from './components/SummaryCard';
import { ActionSection } from './components/ActionSection';
import { Modal } from './components/Modal';

export default function App() {
  // 1. Uso de Custom Hooks (Lógica encapsulada)
  const { windowWidth, online } = useBrowserInfo();
  const { notifications, addNotification } = useNotifications();
  const { data, loading, deleteItem } = useDashboardData();

  // 2. Estado de UI local
  const [darkMode, setDarkMode] = useState(false);
  const [count, setCount] = useState(0);
  const [tab, setTab] = useState('users');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // 3. Estados derivados (Reemplazan a los useEffect innecesarios)
  const theme = darkMode ? 'dark' : 'light';
  const fullName = search ? `${search} User` : '';

  // Efecto válido: interactuar con una API externa del navegador (el título)
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  // 4. Cálculos Pesados Memoizados con useMemo
  const expensiveUsers = useMemo(() => {
    return data.users.map((u) => {
      let total = 0;
      for (let i = 0; i < 100000; i++) total += i;
      return { ...u, total };
    });
  }, [data.users]);

  const expensiveProducts = useMemo(() => {
    return data.products.map((p) => {
      let total = 0;
      for (let i = 0; i < 100000; i++) total += i;
      return { ...p, total };
    });
  }, [data.products]);

  return (
    <div
      style={{
        background: darkMode ? '#111' : '#fff',
        color: darkMode ? '#fff' : '#000',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <h1>Clean Dashboard</h1>

      {/* Controles de UI */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={() => setDarkMode(!darkMode)}>Toggle Theme</button>
        <button onClick={() => setCount(c => c + 1)}>Count {count}</button>
        <button onClick={() => setShowModal(true)}>Toggle Modal</button>
      </div>

      {/* Información del Sistema */}
      <div style={{ marginBottom: '20px' }}>
        <p>Window Width: {windowWidth}</p>
        <p>Online: {online ? 'Yes' : 'No'}</p>
        <p>Theme: {theme}</p>
        {fullName && <p>Searching for: {fullName}</p>}
      </div>

      {/* Búsqueda y Filtros */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Navegación por Tabs */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        {['users', 'products', 'orders'].map((t) => (
          <button key={t} onClick={() => { setTab(t); setSelectedItem(null); }}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {loading && <p>Loading data...</p>}

      {/* --------------------- */}
      {/* TABS CONTENT          */}
      {/* --------------------- */}

      {!loading && tab === 'users' && (
        <div>
          <h2>Users</h2>
          {expensiveUsers
            .filter((u) => u.name.toLowerCase().includes(search.toLowerCase()))
            .map((user) => (
              <div key={user.id} style={{ border: '1px solid gray', padding: '10px', marginBottom: '10px' }}>
                <h3>{user.name} - {user.role}</h3>
                <button onClick={() => { setSelectedItem(user); addNotification('User selected'); }}>Select</button>
                <button onClick={() => { deleteItem('users', user.id); addNotification('User deleted'); }}>Delete</button>
              </div>
            ))}
        </div>
      )}

      {!loading && tab === 'products' && (
        <div>
          <h2>Products</h2>
          {expensiveProducts
            .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
            .map((product) => (
              <div key={product.id} style={{ border: '1px solid green', padding: '10px', marginBottom: '10px' }}>
                <h3>{product.name} - ${product.price}</h3>
                <button onClick={() => { setSelectedItem(product); addNotification('Product selected'); }}>Select</button>
                <button onClick={() => { deleteItem('products', product.id); addNotification('Product deleted'); }}>Delete</button>
              </div>
            ))}
        </div>
      )}

      {!loading && tab === 'orders' && (
        <div>
          <h2>Orders</h2>
          {data.orders.map((order) => (
            <div key={order.id} style={{ border: '1px solid orange', padding: '10px', marginBottom: '10px' }}>
              <h3>Order #{order.id} - Total: ${order.total}</h3>
              <button onClick={() => { deleteItem('orders', order.id); addNotification('Order deleted'); }}>Delete</button>
            </div>
          ))}
        </div>
      )}

      {/* Selección Detallada */}
      {selectedItem && (
        <div style={{ border: '2px solid blue', padding: '20px', marginTop: '20px' }}>
          <h3>Selected Item</h3>
          <p>{selectedItem.name || `Order #${selectedItem.id}`}</p>
        </div>
      )}

      {/* --------------------- */}
      {/* COMPONENTES REUTILIZADOS */}
      {/* --------------------- */}

      <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
        <SummaryCard title="Total Users" count={data.users.length} />
        <SummaryCard title="Total Products" count={data.products.length} />
        <SummaryCard title="Total Orders" count={data.orders.length} />
      </div>

      <ActionSection title="Random Section 1" startIndex={1} onAction={addNotification} />
      <ActionSection title="Random Section 2" startIndex={4} onAction={addNotification} />
      <ActionSection title="Random Section 3" startIndex={7} onAction={addNotification} />

      {/* --------------------- */}
      {/* NOTIFICACIONES Y MODAL */}
      {/* --------------------- */}

      <div style={{ marginTop: '40px' }}>
        <h2>Notifications</h2>
        {notifications.map((n) => (
          <div key={n.id} style={{ background: '#222', color: '#fff', padding: '10px', marginBottom: '10px' }}>
            {n.text}
          </div>
        ))}
      </div>

      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onSave={(msg) => {
            if(msg) addNotification(msg);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}