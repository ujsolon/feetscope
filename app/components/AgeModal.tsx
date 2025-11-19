'use client';

import { ChangeEvent } from 'react';

interface AgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAgeChange: (age: string) => void;
  age: string;
}

export default function AgeModal({
  isOpen,
  onClose,
  onAgeChange,
  age
}: AgeModalProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onAgeChange(e.target.value);
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#f0e8f8',
          padding: '3em',
          borderRadius: '4px',
          minWidth: '450px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ color: '#242943', marginBottom: '0.5em' }}>Age</h2>
        <p style={{ color: '#555', marginBottom: '1.5em' }}>Enter your age to calculate personalized heel height recommendations</p>
        <input
          type="number"
          value={age}
          onChange={handleChange}
          placeholder="Enter your age"
          min="13"
          max="100"
          style={{
            marginBottom: '1.5em',
            padding: '0.75em 1em',
            width: '100%',
            borderRadius: '4px',
            border: '2px solid #9bf1ff',
            fontSize: '1em',
            color: '#242943',
            fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
            boxSizing: 'border-box'
          }}
        />
        <button
          onClick={onClose}
          className="button primary"
          style={{
            backgroundColor: '#242943',
            color: '#ffffff',
            border: '0',
            borderRadius: '0',
            boxShadow: 'inset 0 0 0 2px #242943',
            cursor: 'pointer',
            fontSize: '0.8em',
            fontWeight: '600',
            height: '3.5em',
            letterSpacing: '0.25em',
            lineHeight: '3.5em',
            padding: '0 1.75em',
            textAlign: 'center',
            textDecoration: 'none',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            display: 'inline-block',
            fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
            transition: 'background-color 0.2s ease-in-out'
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = '#9bf1ff';
            (e.target as HTMLButtonElement).style.boxShadow = 'inset 0 0 0 2px #9bf1ff';
            (e.target as HTMLButtonElement).style.color = '#242943';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = '#242943';
            (e.target as HTMLButtonElement).style.boxShadow = 'inset 0 0 0 2px #242943';
            (e.target as HTMLButtonElement).style.color = '#ffffff';
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
}
