'use client';

import { ChangeEvent } from 'react';

interface AgeTileProps {
  onAgeChange: (age: string) => void;
  age: string;
}

export default function AgeTile({ onAgeChange, age }: AgeTileProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onAgeChange(e.target.value);
  };

  return (
    <article>
      <span className="image">
        <img src="/html5up-forty/images/pic03.jpg" alt="" />
      </span>
      <header className="major">
        {!age ? (
          <>
            <h3>Magna</h3>
            <p>Enter your age</p>
            <input
              type="number"
              onChange={handleChange}
              placeholder="Enter your age"
              min="13"
              max="100"
              style={{
                marginTop: '1em',
                padding: '0.75em',
                width: '100%',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '1em',
                boxSizing: 'border-box'
              }}
            />
          </>
        ) : (
          <>
            <h3>✓ Age Entered</h3>
            <p>Age: {age} years old</p>
            <input
              type="number"
              value={age}
              onChange={handleChange}
              placeholder="Enter your age"
              min="13"
              max="100"
              style={{
                marginTop: '1em',
                padding: '0.75em',
                width: '100%',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '1em',
                boxSizing: 'border-box'
              }}
            />
          </>
        )}
      </header>
    </article>
  );
}
