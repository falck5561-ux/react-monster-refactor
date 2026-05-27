import React from 'react';

export const ActionSection = ({ title, startIndex, onAction }) => (
  <div style={{ marginTop: '40px' }}>
    <h2>{title}</h2>
    <div style={{ display: 'flex', gap: '10px' }}>
      {[0, 1, 2].map((i) => (
        <button key={i} onClick={() => onAction(`Clicked ${startIndex + i}`)}>
          Action {startIndex + i}
        </button>
      ))}
    </div>
  </div>
);