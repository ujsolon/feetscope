'use client';

import { ChangeEvent } from 'react';

interface WearTimeTileProps {
  onWearTimeChange: (wearTime: string) => void;
  wearTime: string;
}

export default function WearTimeTile({ onWearTimeChange, wearTime }: WearTimeTileProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onWearTimeChange(e.target.value);
  };

  const wearTimeLabels: { [key: string]: string } = {
    'under-2': 'Under 2 hours',
    '2-4': '2-4 hours',
    '4-6': '4-6 hours',
    'over-6': 'Over 6 hours'
  };

  return (
    <article>
      <span className="image">
        <img src="/html5up-forty/images/pic04.jpg" alt="" />
      </span>
      <header className="major">
        {!wearTime ? (
          <>
            <h3>Ipsum</h3>
            <p>Expected wear time</p>
            <select
              onChange={handleChange}
              style={{
                marginTop: '1em',
                padding: '0.75em',
                width: '100%',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '1em'
              }}
            >
              <option value="">Select wear time</option>
              <option value="under-2">Under 2 hours</option>
              <option value="2-4">2-4 hours</option>
              <option value="4-6">4-6 hours</option>
              <option value="over-6">Over 6 hours</option>
            </select>
          </>
        ) : (
          <>
            <h3>✓ Wear Time Selected</h3>
            <p>{wearTimeLabels[wearTime]}</p>
            <select
              value={wearTime}
              onChange={handleChange}
              style={{
                marginTop: '1em',
                padding: '0.75em',
                width: '100%',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '1em'
              }}
            >
              <option value="">Select wear time</option>
              <option value="under-2">Under 2 hours</option>
              <option value="2-4">2-4 hours</option>
              <option value="4-6">4-6 hours</option>
              <option value="over-6">Over 6 hours</option>
            </select>
          </>
        )}
      </header>
    </article>
  );
}
