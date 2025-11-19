'use client';

import { ChangeEvent } from 'react';

interface HeelExperienceInputProps {
  onExperienceChange: (experience: string) => void;
}

export default function HeelExperienceInput({ onExperienceChange }: HeelExperienceInputProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onExperienceChange(e.target.value);
  };

  return (
    <div className="inner">
      <header className="major">
        <h2>Heel Wearing Experience</h2>
      </header>
      <p>Select your experience level with wearing heels</p>
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
          <option value="">Select your experience level</option>
          <option value="beginner">Beginner (0-6 months)</option>
          <option value="intermediate">Intermediate (6 months - 2 years)</option>
          <option value="experienced">Experienced (2+ years)</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>
  );
}
