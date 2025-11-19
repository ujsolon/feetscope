'use client';

import { ChangeEvent, useState } from 'react';

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
  const [inputValue, setInputValue] = useState(age);
  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 100;
  const birthYear = age ? parseInt(age) : currentYear;
  const calculatedAge = currentYear - birthYear;

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onAgeChange(value);
    setInputValue(value);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleInputBlur = () => {
    const value = parseInt(inputValue);
    if (!isNaN(value) && value >= minYear && value <= currentYear) {
      onAgeChange(inputValue);
    } else {
      setInputValue(age);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = parseInt(inputValue);
      if (!isNaN(value) && value >= minYear && value <= currentYear) {
        onAgeChange(inputValue);
      } else {
        setInputValue(age);
      }
    }
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
        <h2 style={{ color: '#242943', marginBottom: '0.5em' }}>Birth Year</h2>
        <p style={{ color: '#555', marginBottom: '1.5em' }}>What year were you born?</p>
        
        <div style={{ marginBottom: '1.5em' }}>
          <label style={{ color: '#242943', fontWeight: '600', display: 'block', marginBottom: '0.5em' }}>
            Birth Year:
          </label>
          <div style={{ display: 'flex', gap: '1em', alignItems: 'center' }}>
            <input
              type="range"
              min={minYear}
              max={currentYear}
              value={age || currentYear}
              onChange={handleSliderChange}
              style={{
                flex: 1,
                height: '8px',
                borderRadius: '4px',
                background: '#9bf1ff',
                outline: 'none',
                WebkitAppearance: 'none',
                appearance: 'none'
              }}
            />
            <input
              type="number"
              value={inputValue || currentYear}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeyDown}
              min={minYear}
              max={currentYear}
              style={{
                width: '80px',
                padding: '0.5em',
                borderRadius: '4px',
                border: '2px solid #9bf1ff',
                fontSize: '1em',
                color: '#242943',
                fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
                boxSizing: 'border-box',
                textAlign: 'center'
              }}
            />
          </div>
          <style>{`
            input[type='range']::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 20px;
              height: 20px;
              borderRadius: 50%;
              background: #242943;
              cursor: pointer;
              boxShadow: inset 0 0 0 2px #9bf1ff;
            }
            input[type='range']::-moz-range-thumb {
              width: 20px;
              height: 20px;
              borderRadius: 50%;
              background: #242943;
              cursor: pointer;
              border: 2px solid #9bf1ff;
            }
          `}</style>
        </div>
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
