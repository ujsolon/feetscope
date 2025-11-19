'use client';

import { ChangeEvent } from 'react';

interface AgeInputProps {
  onAgeChange: (age: string) => void;
}

export default function AgeInput({ onAgeChange }: AgeInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onAgeChange(e.target.value);
  };

  return (
    <div className="inner">
      <header className="major">
        <h2>Age</h2>
      </header>
      <p>Enter your age to calculate personalized heel height recommendations</p>
      <div style={{ marginTop: '2em' }}>
        <input
          type="number"
          onChange={handleChange}
          placeholder="Enter your age"
          min="13"
          max="100"
          style={{
            display: 'block',
            padding: '1em',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '100%',
            fontSize: '1em',
            boxSizing: 'border-box'
          }}
        />
      </div>
    </div>
  );
}
