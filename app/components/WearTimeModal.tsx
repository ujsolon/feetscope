'use client';

import { ChangeEvent, useState } from 'react';

interface WearTimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWearTimeChange: (wearTime: string) => void;
  wearTime: string;
}

export default function WearTimeModal({
  isOpen,
  onClose,
  onWearTimeChange,
  wearTime
}: WearTimeModalProps) {
  const [inputValue, setInputValue] = useState(wearTime);
  const minHours = 1;
  const maxHours = 12;

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onWearTimeChange(value);
    setInputValue(value);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleInputBlur = () => {
    const value = parseInt(inputValue);
    if (!isNaN(value) && value >= minHours && value <= maxHours) {
      onWearTimeChange(inputValue);
    } else {
      setInputValue(wearTime);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = parseInt(inputValue);
      if (!isNaN(value) && value >= minHours && value <= maxHours) {
        onWearTimeChange(inputValue);
      } else {
        setInputValue(wearTime);
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
          backgroundColor: '#f8f0e8',
          padding: '3em',
          borderRadius: '4px',
          minWidth: '450px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ color: '#242943', marginBottom: '0.5em' }}>Expected Wear Time</h2>
        <p style={{ color: '#555', marginBottom: '1.5em' }}>How many hours per day do you expect to wear heels?</p>
        
        <div style={{ marginBottom: '1.5em' }}>
          <label style={{ color: '#242943', fontWeight: '600', display: 'block', marginBottom: '0.5em' }}>
            Hours per Day:
          </label>
          <div style={{ display: 'flex', gap: '1em', alignItems: 'center' }}>
            <input
              type="range"
              min={minHours}
              max={maxHours}
              value={wearTime || minHours}
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
              value={inputValue || minHours}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeyDown}
              min={minHours}
              max={maxHours}
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
