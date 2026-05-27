import React, { useState } from 'react';

export const Modal = ({ onClose, onSave }) => {
  const [message, setMessage] = useState('');
  const [price, setPrice] = useState(0);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          background: '#fff',
          padding: '30px',
          width: '400px',
          color: '#000'
        }}
      >
        <h2>Modal</h2>

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
        />

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />

        <div style={{ marginTop: '20px' }}>
          <button onClick={() => onSave(message)}>
            Save
          </button>
          <button onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};