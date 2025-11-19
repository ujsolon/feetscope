'use client';

import { ChangeEvent } from 'react';

interface HeelExperienceTileProps {
  onExperienceChange: (experience: string) => void;
  experience: string;
}

export default function HeelExperienceTile({ onExperienceChange, experience }: HeelExperienceTileProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onExperienceChange(e.target.value);
  };

  const experienceLabels: { [key: string]: string } = {
    'beginner': 'Beginner (0-6 months)',
    'intermediate': 'Intermediate (6 months - 2 years)',
    'experienced': 'Experienced (2+ years)',
    'none': 'None'
  };

  return (
    <article>
      <span className="image">
        <img src="/html5up-forty/images/pic02.jpg" alt="" />
      </span>
      <header className="major">
        {!experience ? (
          <>
            <h3>Tempus</h3>
            <p>Heel wearing experience</p>
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
              <option value="">Select experience level</option>
              <option value="beginner">Beginner (0-6 months)</option>
              <option value="intermediate">Intermediate (6 months - 2 years)</option>
              <option value="experienced">Experienced (2+ years)</option>
              <option value="none">None</option>
            </select>
          </>
        ) : (
          <>
            <h3>✓ Experience Selected</h3>
            <p>{experienceLabels[experience]}</p>
            <select
              value={experience}
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
              <option value="">Select experience level</option>
              <option value="beginner">Beginner (0-6 months)</option>
              <option value="intermediate">Intermediate (6 months - 2 years)</option>
              <option value="experienced">Experienced (2+ years)</option>
              <option value="none">None</option>
            </select>
          </>
        )}
      </header>
    </article>
  );
}
