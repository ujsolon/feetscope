'use client';

import { ChangeEvent } from 'react';

interface WearTimeInputProps {
  onWearTimeChange: (wearTime: string) => void;
}

export default function WearTimeInput({ onWearTimeChange }: WearTimeInputProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onWearTimeChange(e.target.value);
  };

  return (
    <div className="inner">
      <header className="major">
        <h2>Expected Wear Time</h2>
      </header>
      <p>How long do you expect to wear heels in a typical day?</p>
      <div style={{ marginTop: '2em' }}>
        <select
          onChange={handleChange}
          style={{
            display: 'block',
            padding: '1em',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '100%',
            fontSize: '1em'
          }}
        >
          <option value="">Select expected wear time</option>
          <option value="under-2">Under 2 hours</option>
          <option value="2-4">2-4 hours</option>
          <option value="4-6">4-6 hours</option>
          <option value="over-6">Over 6 hours</option>
        </select>
      </div>
    </div>
  );
}
